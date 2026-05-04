import delay from "delay";
import { getCustomerById, type Customer } from "./customerApi";

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export interface OrderItem {
  readonly productId: string;
  quantity: number;
  unitPrice: number;
}

export interface ProcessOrderInput {
  customerId: string;
  items: OrderItem[];
}

export interface Order {
  readonly id: string;
  customerId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

export class OrderValidationError extends Error {
  constructor(
    public readonly reason: string,
    public readonly items?: OrderItem[]
  ) {
    super(`Order validation failed: ${reason}`);
    this.name = "OrderValidationError";
  }
}

export class OrderNotFoundError extends Error {
  constructor(public readonly orderId: string) {
    super(`Order with id "${orderId}" not found`);
    this.name = "OrderNotFoundError";
  }
}

export class OrderCancellationError extends Error {
  constructor(
    public readonly orderId: string,
    public readonly currentStatus: OrderStatus
  ) {
    super(`Cannot cancel order "${orderId}" with status "${currentStatus}"`);
    this.name = "OrderCancellationError";
  }
}

export const orders: Order[] = [];

function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

function validateItems(items: OrderItem[]): void {
  if (!items || items.length === 0) {
    throw new OrderValidationError("order must have at least one item");
  }

  for (const item of items) {
    if (!item.productId || item.productId.trim() === "") {
      throw new OrderValidationError("productId is required for all items");
    }
    if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
      throw new OrderValidationError(
        `invalid quantity for product "${item.productId}"`
      );
    }
    if (item.unitPrice < 0) {
      throw new OrderValidationError(
        `invalid unitPrice for product "${item.productId}"`
      );
    }
  }
}

export async function processOrder({
  customerId,
  items,
}: ProcessOrderInput): Promise<Order> {
  await delay(60);

  let customer: Customer;
  try {
    customer = await getCustomerById(customerId);
  } catch {
    throw new OrderValidationError(`customer "${customerId}" not found`);
  }

  if (customer.status !== "active") {
    throw new OrderValidationError(`customer "${customer.id}" is not active`);
  }

  validateItems(items);

  const order: Order = {
    id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    customerId: customerId,
    items: items.map((item) => ({ ...item })),
    status: ORDER_STATUS.PROCESSING,
    total: calculateTotal(items),
    createdAt: new Date(),
  };

  orders.push(order);
  return { ...order };
}

export async function getOrderStatus(orderId: string): Promise<OrderStatus> {
  await delay(20);

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    throw new OrderNotFoundError(orderId);
  }
  return order.status;
}

export async function cancelOrder(orderId: string): Promise<void> {
  await delay(30);

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    throw new OrderNotFoundError(orderId);
  }

  const cancellableStatuses: OrderStatus[] = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.PROCESSING,
  ];

  if (!cancellableStatuses.includes(order.status)) {
    throw new OrderCancellationError(orderId, order.status);
  }

  order.status = ORDER_STATUS.CANCELLED;
}
