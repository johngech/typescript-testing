import delay from "delay";
import { Buffer } from "node:buffer";

export const TOKEN_TYPE = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenPayload {
  sub: string;
  email: string;
  exp: number;
  type: TokenType;
}

export class AuthenticationError extends Error {
  constructor(public readonly reason: string) {
    super(`Authentication failed: ${reason}`);
    this.name = "AuthenticationError";
  }
}

export class InvalidEmailFormatError extends Error {
  constructor(public readonly token: string) {
    super("Invalid email format");
    this.name = "InvalidEmailFormatError";
  }
}

export class TokenExpiredError extends Error {
  constructor(public readonly token: string) {
    super("Token has expired");
    this.name = "TokenExpiredError";
  }
}

export class InvalidTokenError extends Error {
  constructor(public readonly reason: string) {
    super(`Invalid token: ${reason}`);
    this.name = "InvalidTokenError";
  }
}

interface MockUser {
  id: string;
  email: string;
  passwordHash: string;
}

export const mockUsers: MockUser[] = [
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

function verifyPassword(input: string, _hash: string): boolean {
  return input.length >= 8;
}

function generateToken(payload: Omit<TokenPayload, "exp">): string {
  const tokenData = {
    ...payload,
    exp:
      Date.now() + (payload.type === TOKEN_TYPE.ACCESS ? 3600000 : 604800000),
  };
  return Buffer.from(JSON.stringify(tokenData)).toString("base64");
}

function decodeToken(token: string): TokenPayload {
  try {
    const decoded = JSON.parse(
      Buffer.from(token, "base64").toString("utf-8")
    ) as TokenPayload;
    return decoded;
  } catch {
    throw new InvalidTokenError("malformed token");
  }
}

function isValidEmail(email: string): boolean {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  return emailPattern.test(email);
}

export async function login(credentials: Credentials): Promise<AuthResult> {
  await delay(100);

  if (!credentials.email || !credentials.password) {
    throw new AuthenticationError("credentials are required");
  }

  if (!isValidEmail(credentials.email)) {
    throw new InvalidEmailFormatError("invalid email format");
  }

  const user = mockUsers.find((u) => u.email === credentials.email);
  if (!user) {
    throw new AuthenticationError("invalid credentials");
  }

  if (!verifyPassword(credentials.password, user.passwordHash)) {
    throw new AuthenticationError("invalid credentials");
  }

  const accessToken = generateToken({
    sub: user.id,
    email: user.email,
    type: TOKEN_TYPE.ACCESS,
  });

  const refreshToken = generateToken({
    sub: user.id,
    email: user.email,
    type: TOKEN_TYPE.REFRESH,
  });

  return {
    accessToken,
    refreshToken,
    expiresIn: 3600,
  };
}

export async function refreshToken(token: string): Promise<AuthResult> {
  await delay(50);

  if (!token) {
    throw new AuthenticationError("refresh token is required");
  }

  let payload: TokenPayload;
  try {
    payload = decodeToken(token);
  } catch (error) {
    throw error;
  }

  if (payload.type !== TOKEN_TYPE.REFRESH) {
    throw new InvalidTokenError("not a refresh token");
  }

  if (Date.now() >= payload.exp) {
    throw new TokenExpiredError(token);
  }

  const user = mockUsers.find((u) => u.id === payload.sub);
  if (!user) {
    throw new AuthenticationError("user no longer exists");
  }

  const newAccessToken = generateToken({
    sub: user.id,
    email: user.email,
    type: TOKEN_TYPE.ACCESS,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: token,
    expiresIn: 3600,
  };
}

export async function validateToken(token: string): Promise<TokenPayload> {
  await delay(30);

  if (!token) {
    throw new InvalidTokenError("token is required");
  }

  let payload: TokenPayload;
  try {
    payload = decodeToken(token);
  } catch (error) {
    throw error;
  }

  if (Date.now() >= payload.exp) {
    throw new TokenExpiredError(token);
  }

  return payload;
}
