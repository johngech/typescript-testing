import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";

/**
 * 
import { getExchangeRate } from "../src/libs/currency";

vi.mock("../src/libs/currency");

describe("getPriceInCurrency", () => {
    it("should return price in currency", () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);
        
        const price = getPriceInCurrency(10, "ETB");
        
        expect(price).toBe(15);
        expect(getExchangeRate).toHaveBeenCalledWith("USD", "ETB");
    });
});
*/

vi.mock(import("../src/libs/currency"), () => {
  return {
    getExchangeRate: () => 1.5,
  };
});

describe("getPriceInCurrency", () => {
  it("should return price in currency", () => {
    const price = getPriceInCurrency(10, "ETB");

    expect(price).toBe(15);
  });
});

import { getShippingQuote } from "../src/libs/shipping";

vi.mock(import("../src/libs/shipping"), () => {
  return {
    getShippingQuote: vi.fn(),
  };
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable when shipping quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo("Ethiopia");

    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping info if shipping quote can be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo("Ethiopia");

    expect(result).toMatch("$10");
    expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

/**
 * Interaction testing:
 * we use mocks:
 * => To provide values
 * => To test the interactions between units
 */

import { trackPageView } from "../src/libs/analytics";

vi.mock(import("../src/libs/analytics"), () => {
  return {
    trackPageView: vi.fn(),
  };
});

describe("renderPage", () => {
  it("should return the correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

import { charge } from "../src/libs/payment";

vi.mock(import("../src/libs/payment"), () => {
  return {
    charge: vi.fn(),
  };
});

describe("submitOrder", () => {
  const order = { totalAmount: 100 };
  const creditCard = { creditCardNumber: "1234-1234-1234" };

  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return failed when payment is failed", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toHaveProperty("error");
    expect(result).toMatchObject({ success: false, error: /payment_error/i });
  });

  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toMatchObject({ success: true });
  });
});

// Partial mocking

import { sendEmail } from "../src/libs/email";

vi.mock(import("../src/libs/email"), async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe("signUp", () => {
  const email = "example@domain.com";

  beforeEach(() => {
    /**
     vi.mocked(sendEmail).mockClear(); // clear all info about every call
     vi.mocked(sendEmail).mockReset(); // the same as clear, but it also reset the internal implementations as well
     vi.mocked(sendEmail).mockRestore(); // Restore all mock implementation to its original implementation
     * 
     */

    vi.clearAllMocks(); // clear all mocks in this file
  });
  it("should return false when email is not valid", async () => {
    const result = await signUp("a");

    expect(result).toBe(false);
  });

  it("should return true when email is valid", async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it("should send the welcome email if email is valid", async () => {
    await signUp(email);

    const args = vi.mocked(sendEmail).mock.calls[0];

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

/**
 * Spying:
 * => To monitor the behavior of functions during test execution
 * => Spy => means secretly collect an information
 */

import security from "../src/libs/security";

describe("login", () => {
  const email = "example@domain.com";

  it("should email one-time security-code", async () => {
    const spy = vi.spyOn(security, "generateCode");

    await login(email);
    const securityCode = spy.mock.results[0].value.toString();

    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

/**
 * Mocking Dates
 */

describe("isOnline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Get current date components (year, month, day)
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  // Parametrized test cases with edge cases for hours and minutes
  it.each([
    { hour: 7, minute: 59, expected: false, desc: "7:59 before opening" },
    { hour: 8, minute: 0, expected: true, desc: "8:00 at opening" },
    { hour: 14,minute: 30, expected: true, desc: "14:30 during business hours",},
    { hour: 19, minute: 59, expected: true, desc: "19:59 before closing" },
    { hour: 20, minute: 0, expected: false, desc: "20:00 at closing (exclusive)",},
    { hour: 20, minute: 1, expected: false, desc: "20:01 after closing" },
    { hour: 22, minute: 0, expected: false, desc: "22:00 after closing" },
  ])(
    "should return $expected at $hour:$minute ($desc)",
    ({ hour, minute, expected }) => {
      const date = new Date(year, month, day, hour, minute, 0, 0);
      vi.setSystemTime(date);

      const result = isOnline();

      expect(result).toBe(expected);
    },
  );
});

describe("getDiscount", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const now = new Date();

  const year = now.getFullYear();

  it.each([
    { month: 10, day: 12,hour:4, minute:0, expected: 0, description: "any other days" },
    { month: 11, day: 11,hour:5, minute:15, expected: 0, description: "any other days" },
    { month: 11, day: 24,hour:1, minute:59, expected: 0, description: "any other days" },
    { month: 11, day: 25,hour:0, minute:0, expected: 0.2, description: "Christmas day" },
    { month: 11, day: 25,hour:0, minute:1, expected: 0.2, description: "Christmas day" },
    { month: 11, day: 25,hour:23, minute:59, expected: 0.2, description: "Christmas day" },
    { month: 11, day: 25,hour:24, minute:0, expected: 0, description: "Christmas day" },
    { month: 11, day: 26,hour:10, minute:30, expected: 0, description: "any other days" },
    { month: 12, day: 11,hour:10, minute:20, expected: 0, description: "any other days" },
  ])(
    "should return $expected when it is $description ",
    ({ month, day, hour,minute, expected }) => {
      vi.setSystemTime(new Date(year, month, day, hour, minute));

      expect(getDiscount()).toBe(expected);
    },
  );
});
