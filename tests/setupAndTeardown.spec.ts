import {
  it,
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from "vitest";

describe("SetupAndTeardown", () => {
  beforeAll(() => {
    console.log("beforeAll called");
  });

  beforeEach(() => {
    console.log("beforeEach called");
  });

  afterEach(() => {
    console.log("afterEach called");
  });

  afterAll(() => {
    console.log("afterAll called");
  });
  it("test case 1", () => {
    expect(1).toBeTruthy();
  });
  it("test case 2", () => {
    expect(0).toBeFalsy();
  });
});
