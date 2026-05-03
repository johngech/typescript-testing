import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { Buffer } from "node:buffer";
import {
  AuthenticationError,
  InvalidEmailFormatError,
  InvalidTokenError,
  login,
  refreshToken,
  TokenExpiredError,
  validateToken,
  mockUsers,
} from "../../src/utils/authService";
import delay from "delay";

vi.mock("delay");

const initialUsers = [
  {
    id: "user_1",
    email: "admin@example.com",
    passwordHash: "hashed_password_123",
  },
  {
    id: "user_2",
    email: "user@example.com",
    passwordHash: "hashed_password_456",
  },
];

describe("login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mockUsers to initial state
    mockUsers.length = 0;
    mockUsers.push(...initialUsers);
  });

  it("should throw an error when empty email and password are provided", async () => {
    await expect(login({ email: "", password: "" })).rejects.toThrow(
      /credentials are required/i,
    );
  });

  it("should throw an error when invalid email format is provided", async () => {
    await expect(login({ email: "a", password: "a" })).rejects.toThrow(
      InvalidEmailFormatError,
    );
  });

  it("should throw an error when provided email is not found", async () => {
    await expect(
      login({ email: "abc@domain.com", password: "a" }),
    ).rejects.toThrow(AuthenticationError);
  });

  it("should throw an error when password is wrong", async () => {
    await expect(
      login({ email: "admin@example.com", password: "a" }),
    ).rejects.toThrow(AuthenticationError);
  });

  it("should return tokens when provided credentials are valid", async () => {
    const result = await login({
      email: "admin@example.com",
      password: "a".repeat(8),
    });

    expect(result).toHaveProperty("accessToken");
    expect(result).toMatchObject({
      expiresIn: 3600,
      accessToken: /eyJzdWIiOiJ1/i,
      refreshToken: /eyJzdWIiOiJ1/i,
    });
  });

  it("should call delay with 100ms", async () => {
    await login({
      email: "admin@example.com",
      password: "a".repeat(8),
    });

    expect(delay).toHaveBeenCalledWith(100);
  });
});

describe("refreshToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mockUsers to initial state
    mockUsers.length = 0;
    mockUsers.push(...initialUsers);
  });

  it("should throw an error when empty token is provided", async () => {
    await expect(refreshToken("")).rejects.toThrow(
      /refresh token is required/i,
    );
  });

  it("should throw an error when invalid token is provided", async () => {
    await expect(refreshToken("abce123d$#%")).rejects.toThrow(
      InvalidTokenError,
    );
  });

  it("should throw an error when provided token type is not refresh", async () => {
    const { accessToken } = await login({
      email: "admin@example.com",
      password: "ab12@#".repeat(2),
    });

    await expect(refreshToken(accessToken)).rejects.toThrow(
      /not a refresh token/i,
    );
  });

  it("should throw an error when provided token is expired", async () => {
    vi.useFakeTimers();

    const { refreshToken: refresh } = await login({
      email: "admin@example.com",
      password: "ab2#".repeat(2),
    });

    // Decode token to get actual expiration
    const decoded = JSON.parse(
      Buffer.from(refresh, "base64").toString("utf-8"),
    );

    // Advance time past token expiration
    vi.advanceTimersByTime(decoded.exp - Date.now() + 1000);

    await expect(refreshToken(refresh)).rejects.toThrow(TokenExpiredError);

    vi.useRealTimers();
  });

  it("should throw an error when provided user is not found", async () => {
    const { refreshToken: token } = await login({
      email: "user@example.com",
      password: "ab2#".repeat(2),
    });

    // Clear users to simulate user deletion
    mockUsers.length = 0;

    await expect(refreshToken(token)).rejects.toThrow(/user no longer exists/i);
  });

  it("should issue a new access token", async () => {
    const { refreshToken: refresh } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    const result = await refreshToken(refresh);

    expect(result).toHaveProperty("accessToken");
    expect(result).toMatchObject({ expiresIn: 3600 });
  });

  it("should call delay with 50ms", async () => {
    const { refreshToken: refresh } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    await refreshToken(refresh);

    expect(delay).toHaveBeenCalledWith(50);
  });
});

describe("validateToken", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mockUsers to initial state
    mockUsers.length = 0;
    mockUsers.push(...initialUsers);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should throw an error when empty token is provided", async () => {
    await expect(validateToken("")).rejects.toThrow(/token is required/i);
  });

  it("should throw an error when invalid token is provided", async () => {
    await expect(validateToken("abce123d$#%")).rejects.toThrow(
      InvalidTokenError,
    );
  });

  it("should throw an error when provided token is expired", async () => {
    vi.useFakeTimers();

    const { refreshToken: refresh } = await login({
      email: "admin@example.com",
      password: "ab2#".repeat(2),
    });

    // Decode token to get actual expiration
    const decoded = JSON.parse(
      Buffer.from(refresh, "base64").toString("utf-8"),
    );

    // Advance time past token expiration
    vi.advanceTimersByTime(decoded.exp - Date.now() + 1000);

    await expect(validateToken(refresh)).rejects.toThrow(TokenExpiredError);

    vi.useRealTimers();
  });

  it("should return the payload", async () => {
    const { accessToken: token } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    const result = await validateToken(token);

    expect(result).toHaveProperty("sub");
    expect(result).toHaveProperty("email");
    expect(result).toMatchObject({ email: "user@example.com" });
  });

  it("should call delay with 30ms", async () => {
    const { accessToken: token } = await login({
      email: "user@example.com",
      password: "ab2@".repeat(2),
    });

    await validateToken(token);

    expect(delay).toHaveBeenCalledWith(30);
  });
});
