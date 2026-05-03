import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { answer } from "../src/utils/example";

/**
 * Mock Function
 * Is a function that imitates the behavior of real function.
 */

describe("Mocking", () => {
  it("mock return value", () => {
    const greet = vi.fn();

    greet.mockReturnValue("Hello");

    const result = greet();
    console.log(result);
  });

  it("send text", () => {
    const sendText = vi.fn();

    sendText.mockImplementation((text: string) => ({ message: text }));

    const { message } = sendText("message");

    expect(sendText).toHaveBeenCalled();
    expect(sendText).toHaveBeenCalledWith("message");
    expect(message).toMatch(/message/i);
  });

  it("send text", () => {
    const sendText = vi.fn();

    //Here 'ok' is the return value of the function.
    // While 'message' is the argument passed to the function
    sendText.mockReturnValue("ok");

    const result = sendText("message");

    expect(sendText).toHaveBeenCalled();
    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toMatch(/ok/i);
  });

  it("mock resolved promise", async () => {
    const fetchUsers = vi.fn();
    fetchUsers.mockResolvedValue({ id: 1, name: "john" });
    const result = await fetchUsers();

    expect(result).toHaveProperty("id");
    expect(result).toMatchObject({ name: /john/i });
  });

  it("mock rejected promise", async () => {
    const rejectedPromise = vi.fn();
    rejectedPromise.mockRejectedValue({ reason: "failed to fetch" });

    try {
      await rejectedPromise();
    } catch (error: any) {
      expect(error).toHaveProperty("reason");
      expect(error?.reason).toMatch(/failed/i);
    }
  });

  it("mock implementation", () => {
    const increment = vi.fn();

    increment.mockImplementation((count) => count + 1);

    expect(increment(1)).toBe(2);
  });

  it("mocking classes", () => {
    const SomeClass = vi.fn(
      class HelloWorld {
        greet = () => "Hello";
      },
    );

    const someClass = new SomeClass();

    expect(someClass.greet()).toMatch(/hello/i);

    const IntersectionObserverStub = vi.fn(
      class {
        observe = vi.fn();
        unobserve = vi.fn();
        takeRecords = vi.fn();
        disconnect = vi.fn();
      },
    );

    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
  });
});

vi.mock(import("../src/utils/example"), async (importOriginal) => {
  const originalImport = await importOriginal();
  return {
    answer: vi.fn(originalImport.answer),
  };
});

/**
 *  simulate mock value
vi.mock(import("../src/utils/example"), () => {
  return {
    answer: () => 42,
  };
});
 * 
 */

describe("Mocking modules", () => {
  it("mocking modules", () => {
    expect(answer()).toBe(42);

    expect(answer()).toBe(42);

    expect(answer).toHaveBeenCalled();

    expect(answer).toHaveReturned();
    expect(answer).toHaveReturnedWith(42);
  });
});

/**
 * 
 import * as exampleObject from "../src/utils/example";
 
 describe("Spying modules", () => {
   vi.spyOn(exampleObject, "answer").mockReturnValue(0);
 
   it("should return value", () => {
     expect(exampleObject.answer()).toBe(0);
 
     expect(answer).toHaveBeenCalled();
   });
 });
 * 
 */

describe("Date mocking", () => {
  beforeEach(() => {
    // Tell Vitest to use fake versions of timers and Date
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Restore real time after each test
    vi.useRealTimers();
  });

  it("should return the mocked date", () => {
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);

    expect(new Date()).toEqual(date);
    expect(Date.now()).toBe(date.getTime());
  });
});
