import { it, expect, describe, beforeEach, vi } from "vitest";
import delay from "delay";
import {
  createCustomer,
  CustomerNotFoundError,
  CustomerStatus,
  CustomerType,
  getCustomerById,
  getCustomers,
  InvalidCustomerError,
  mockDatabase,
} from "../../src/utils/customerApi";

vi.mock("delay");

const initialCustomers = [
  {
    id: "cust_1",
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "active" as CustomerStatus,
    type: "individual" as CustomerType,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "cust_2",
    name: "Bob's Hardware",
    email: "bob@hardware.com",
    status: "active" as CustomerStatus,
    type: "business" as CustomerType,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "cust_3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "inactive" as CustomerStatus,
    type: "individual" as CustomerType,
    createdAt: new Date("2024-03-10"),
  },
];

describe("getCustomers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDatabase.length = 0;
    mockDatabase.push(...initialCustomers);
  });

  it("should return all customers when no filters are provided", async () => {
    const result = await getCustomers();

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "cust_1" }),
        expect.objectContaining({ id: "cust_2" }),
        expect.objectContaining({ id: "cust_3" }),
      ])
    );
  });

  it("should return only active customers when status filter is active", async () => {
    const result = await getCustomers({ status: "active" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ status: "active" });
    });

    expect(result.every((c) => c.status === "active")).toBe(true);
  });

  it("should return only inactive customers when status filter is inactive", async () => {
    const result = await getCustomers({ status: "inactive" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ status: "inactive" });
    });

    expect(result[0]).toMatchObject({ id: "cust_3", status: "inactive" });
  });

  it("should return only individual customers when type filter is individual", async () => {
    const result = await getCustomers({ type: "individual" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ type: "individual" });
    });

    expect(result.every((c) => c.type === "individual")).toBe(true);
  });

  it("should return only business customers when type filter is business", async () => {
    const result = await getCustomers({ type: "business" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ type: "business" });
    });

    expect(result[0]).toMatchObject({ id: "cust_2", type: "business" });
  });

  it("should filter customers by search term in name", async () => {
    const result = await getCustomers({ search: "alice" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ name: /alice/i });
    });

    expect(result[0]).toMatchObject({ name: "Alice Johnson" });
  });

  it("should filter customers by search term in email", async () => {
    const result = await getCustomers({ search: "hardware" });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ email: /hardware/i });
    });

    expect(result[0]).toMatchObject({ email: "bob@hardware.com" });
  });

  it("should combine multiple filters", async () => {
    const result = await getCustomers({
      status: "active",
      type: "individual",
    });

    result.forEach((customer) => {
      expect(customer).toMatchObject({ status: "active", type: "individual" });
    });

    expect(result[0]).toMatchObject({
      id: "cust_1",
      status: "active",
      type: "individual",
    });
  });

  it("should return empty array when no customers match filters", async () => {
    const result = await getCustomers({
      status: "active",
      type: "individual",
      search: "bob",
    });
    result.forEach((customer) => {
      expect(customer).not.toMatchObject({
        status: "active",
        type: "individual",
        name: /bob/i,
      });
    });

    expect(result).toHaveLength(0);
  });

  it("should call delay with 50ms", async () => {
    await getCustomers();

    expect(delay).toHaveBeenCalledWith(50);
  });

  it("should return copies of customers, not original references", async () => {
    const result = await getCustomers();
    result[0].name = "Modified";

    expect(mockDatabase[0].name).toBe("Alice Johnson");
  });
});

describe("getCustomerById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDatabase.length = 0;
    mockDatabase.push(...initialCustomers);
  });

  it("should return customer when valid id is provided", async () => {
    const result = await getCustomerById("cust_1");

    expect(result).toMatchObject({
      id: "cust_1",
      name: "Alice Johnson",
      email: "alice@example.com",
    });
  });

  it("should throw CustomerNotFoundError when customer id is not found", async () => {
    await expect(getCustomerById("cust_999")).rejects.toThrow(
      CustomerNotFoundError
    );
    await expect(getCustomerById("cust_999")).rejects.toThrow(/not found/i);
  });

  it("should call delay with 30ms", async () => {
    await getCustomerById("cust_1");

    expect(delay).toHaveBeenCalledWith(30);
  });

  it("should return a copy of customer, not the original reference", async () => {
    const result = await getCustomerById("cust_1");
    result.name = "Modified";

    expect(mockDatabase[0].name).toBe("Alice Johnson");
  });
});

describe("createCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDatabase.length = 0;
    mockDatabase.push(...initialCustomers);
  });

  it("should create a new customer with valid data", async () => {
    const result = await createCustomer({
      name: "David Smith",
      email: "david@example.com",
      type: "individual",
    });

    expect(result).toMatchObject({
      name: "David Smith",
      email: "david@example.com",
      type: "individual",
      status: "active",
    });
    expect(result.id).toMatch(/^cust_/);
    expect(result.createdAt).toBeInstanceOf(Date);
  });

  it("should throw InvalidCustomerError when name is too short", async () => {
    await expect(
      createCustomer({
        name: "A",
        email: "david@example.com",
        type: "individual",
      })
    ).rejects.toThrow(InvalidCustomerError);
  });

  it("should throw InvalidCustomerError when name is empty", async () => {
    await expect(
      createCustomer({
        name: "",
        email: "david@example.com",
        type: "individual",
      })
    ).rejects.toThrow(InvalidCustomerError);
  });

  it("should throw InvalidCustomerError when email is invalid", async () => {
    await expect(
      createCustomer({
        name: "David Smith",
        email: "invalid-email",
        type: "individual",
      })
    ).rejects.toThrow(InvalidCustomerError);
  });

  it("should throw InvalidCustomerError when email already exists", async () => {
    await expect(
      createCustomer({
        name: "Duplicate User",
        email: "alice@example.com",
        type: "individual",
      })
    ).rejects.toThrow(InvalidCustomerError);
  });

  it("should add the new customer to the database", async () => {
    await createCustomer({
      name: "David Smith",
      email: "david@example.com",
      type: "individual",
    });

    const customers = await getCustomers({ search: "David Smith" });

    expect(customers[0]).toMatchObject({
      email: "david@example.com",
      type: "individual",
    });
  });

  it("should call delay with 40ms", async () => {
    await createCustomer({
      name: "David Smith",
      email: "david@example.com",
      type: "individual",
    });

    expect(delay).toHaveBeenCalledWith(40);
  });

  it("should trim the name before saving", async () => {
    const result = await createCustomer({
      name: "  David Smith  ",
      email: "david@example.com",
      type: "individual",
    });

    expect(result.name).toBe("David Smith");
  });

  it("should lowercase the email before saving", async () => {
    const result = await createCustomer({
      name: "David Smith",
      email: "DAVID@EXAMPLE.COM",
      type: "individual",
    });

    expect(result.email).toBe("david@example.com");
  });
});
