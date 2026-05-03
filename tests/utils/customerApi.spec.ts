import { it, expect, describe } from "vitest";
import { getCustomers } from "../../src/utils/customerApi";

describe("getCustomers", () => {
  it("should return all active customers when active status is provided", async () => {
    const result = await getCustomers({
      status: "active",
    });

    expect(result).toMatchObject([{ status: "active" }, { id: "cust_2" }]);
  });

  it("should return all inactive customers when inactive status is provided", async () => {
    const result = await getCustomers({ status: "inactive" });

    expect(result).toMatchObject([{ status: "inactive" }]);
  });

  
});
