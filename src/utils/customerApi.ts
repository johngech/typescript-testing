import delay from "delay";

export const CUSTOMER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const CUSTOMER_TYPE = {
  INDIVIDUAL: "individual",
  BUSINESS: "business",
} as const;

export type CustomerStatus =
  (typeof CUSTOMER_STATUS)[keyof typeof CUSTOMER_STATUS];
export type CustomerType = (typeof CUSTOMER_TYPE)[keyof typeof CUSTOMER_TYPE];

export interface Customer {
  readonly id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  type: CustomerType;
  createdAt: Date;
}

export interface CustomerFilters {
  status?: CustomerStatus;
  type?: CustomerType;
  search?: string;
}

export class CustomerNotFoundError extends Error {
  constructor(public readonly customerId: string) {
    super(`Customer with id "${customerId}" not found`);
    this.name = "CustomerNotFoundError";
  }
}

export class InvalidCustomerError extends Error {
  constructor(
    public readonly field: string,
    public readonly reason: string
  ) {
    super(`Invalid customer ${field}: ${reason}`);
    this.name = "InvalidCustomerError";
  }
}

const mockDatabase: Customer[] = [
  {
    id: "cust_1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: CUSTOMER_STATUS.ACTIVE,
    type: CUSTOMER_TYPE.INDIVIDUAL,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "cust_2",
    name: "Bob's Hardware",
    email: "bob@hardware.com",
    status: CUSTOMER_STATUS.ACTIVE,
    type: CUSTOMER_TYPE.BUSINESS,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "cust_3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: CUSTOMER_STATUS.INACTIVE,
    type: CUSTOMER_TYPE.INDIVIDUAL,
    createdAt: new Date("2024-03-10"),
  },
];

function isValidEmail(email: string): boolean {
  return /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(email);
}

export async function getCustomers(
  filters?: CustomerFilters
): Promise<Customer[]> {
  await delay(50);

  let result = [...mockDatabase];

  if (filters?.status) {
    result = result.filter((c) => c.status === filters.status);
  }

  if (filters?.type) {
    result = result.filter((c) => c.type === filters.type);
  }

  if (filters?.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term)
    );
  }

  return result;
}

export async function getCustomerById(id: string): Promise<Customer> {
  await delay(30);

  const customer = mockDatabase.find((c) => c.id === id);
  if (!customer) {
    throw new CustomerNotFoundError(id);
  }
  return { ...customer };
}

export async function createCustomer(data: {
  name: string;
  email: string;
  type: CustomerType;
}): Promise<Customer> {
  await delay(40);

  if (!data.name || data.name.trim().length < 2) {
    throw new InvalidCustomerError("name", "must be at least 2 characters");
  }

  if (!isValidEmail(data.email)) {
    throw new InvalidCustomerError("email", "must be a valid email address");
  }

  if (mockDatabase.some((c) => c.email === data.email)) {
    throw new InvalidCustomerError("email", "already exists");
  }

  const newCustomer: Customer = {
    id: `cust_${Date.now()}`,
    name: data.name.trim(),
    email: data.email.toLowerCase(),
    status: CUSTOMER_STATUS.ACTIVE,
    type: data.type,
    createdAt: new Date(),
  };

  mockDatabase.push(newCustomer);
  return { ...newCustomer };
}
