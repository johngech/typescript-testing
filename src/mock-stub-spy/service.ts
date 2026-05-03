import { getUserFromDB } from "./db";

export function greetUser(id: string) {
  const user = getUserFromDB(id);
  return `Hello, ${user.name}`;
}
