import { it, expect, describe, vi, beforeEach } from "vitest";
import {
  processOrder,
  cancelOrder,
  getOrderStatus,
  OrderValidationError,
  OrderNotFoundError,
  OrderCancellationError,
  orders,
} from "../../src/utils/orderService";
import * as customerApi from "../../src/utils/customerApi";

vi.mock(import("../../src/utils/customerApi"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getCustomerById: vi.fn(),
  };
});

describe("processOrder", () => {
  const customer: customerApi.Customer = {
    id: "cust_1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    type: "individual",
    createdAt: new Date("2024-01-15"),
  };

  it("should call getCustomerById with provided customerId", async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

    await processOrder({
      customerId: customer.id,
      items: [{ productId: "product_id", quantity: 10, unitPrice: 20 }],
    });

    expect(customerApi.getCustomerById).toHaveBeenCalledWith(customer.id);
  });

  it("should throw OrderValidationError when customer is not found", async () => {
    vi.mocked(customerApi.getCustomerById).mockRejectedValue(
      new customerApi.CustomerNotFoundError("cust_999")
    );

    await expect(
      processOrder({
        customerId: "cust_999",
        items: [{ productId: "product_id", quantity: 10, unitPrice: 20 }],
      })
    ).rejects.toThrow(OrderValidationError);
  });

  it("should throw OrderValidationError when customer is inactive", async () => {
    const inactiveCustomer: customerApi.Customer = {
      ...customer,
      status: "inactive",
    };

    vi.mocked(customerApi.getCustomerById).mockResolvedValue(inactiveCustomer);

    await expect(
      processOrder({
        customerId: customer.id,
        items: [{ productId: "product_id", quantity: 10, unitPrice: 20 }],
      })
    ).rejects.toThrow(OrderValidationError);
  });

  it("should throw OrderValidationError when items are invalid", async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

    await expect(
      processOrder({
        customerId: customer.id,
        items: [],
      })
    ).rejects.toThrow(OrderValidationError);
  });

  it.each([
    {
      description: "productId is empty",
      items: [{ productId: "", quantity: 10, unitPrice: 10 }],
    },
    {
      description: "quantity is negative",
      items: [{ productId: "product_id", quantity: -10, unitPrice: 10 }],
    },
    {
      description: "unitPrice is negative",
      items: [{ productId: "product_id", quantity: 10, unitPrice: -10 }],
    },
  ])(
    "should throw OrderValidationError when $description",
    async ({ items }) => {
      vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

      await expect(
        processOrder({
          customerId: customer.id,
          items,
        })
      ).rejects.toThrow(OrderValidationError);
    }
  );

  it("should return order when valid customer and items are provided", async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

    const result = await processOrder({
      customerId: customer.id,
      items: [{ productId: "product_id", quantity: 10, unitPrice: 20 }],
    });

    expect(result).toMatchObject({
      customerId: customer.id,
      status: "processing",
    });
    expect(result.id).toMatch(/^ord_/);
    expect(result.total).toBe(200);
  });
});

describe("getOrderStatus", () => {
  const customer: customerApi.Customer = {
    id: "cust_1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    type: "individual",
    createdAt: new Date("2024-01-15"),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    orders.length = 0;
  });

  it("should return the correct status for an existing order", async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

    const { id: orderId } = await processOrder({
      customerId: "cust_1",
      items: [{ productId: "prod_1", quantity: 1, unitPrice: 100 }],
    });

    const status = await getOrderStatus(orderId);
    expect(status).toBe("processing");
  });

  it("should return updated status after order is cancelled", async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(customer);

    const { id: orderId } = await processOrder({
      customerId: "cust_1",
      items: [{ productId: "prod_1", quantity: 1, unitPrice: 100 }],
    });

    await cancelOrder(orderId);

    const status = await getOrderStatus(orderId);
    expect(status).toBe("cancelled");
  });

  it("should throw OrderNotFoundError when order does not exist", async () => {
    await expect(getOrderStatus("ord_nonexistent")).rejects.toThrow(
      OrderNotFoundError
    );
  });
});

describe("cancelOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    orders.length = 0;
  });

  const activeCustomer: customerApi.Customer = {
    id: "cust_1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active",
    type: "individual",
    createdAt: new Date("2024-01-15"),
  };

  const createTestOrder = async () => {
    vi.mocked(customerApi.getCustomerById).mockResolvedValue(activeCustomer);
    return processOrder({
      customerId: activeCustomer.id,
      items: [{ productId: "prod_1", quantity: 1, unitPrice: 100 }],
    });
  };

  it("should throw OrderNotFoundError when order does not exist", async () => {
    await expect(cancelOrder("ord_nonexistent")).rejects.toThrow(
      OrderNotFoundError
    );
  });

  it("should change order status to cancelled when order is processing", async () => {
    const { id: orderId } = await createTestOrder();

    await cancelOrder(orderId);

    const status = await getOrderStatus(orderId);
    expect(status).toBe("cancelled");
  });

  it("should change order status to cancelled when order is pending", async () => {
    const { id: orderId } = await createTestOrder();

    const existingOrder = orders.find((o) => o.id === orderId);
    if (existingOrder) existingOrder.status = "pending";

    await cancelOrder(orderId);

    const status = await getOrderStatus(orderId);
    expect(status).toBe("cancelled");
  });

  it.each([
    { status: "shipped" as const, description: "shipped" },
    { status: "delivered" as const, description: "delivered" },
    { status: "cancelled" as const, description: "already cancelled" },
  ])(
    "should throw OrderCancellationError when order is $description",
    async ({ status }) => {
      const { id: orderId } = await createTestOrder();

      const existingOrder = orders.find((order) => order.id === orderId);
      if (existingOrder) existingOrder.status = status;

      await expect(cancelOrder(orderId)).rejects.toThrow(
        OrderCancellationError
      );
    }
  );
});
