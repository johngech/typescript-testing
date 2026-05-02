import delay from "delay";

export interface CreditCardInfo {
  creditCardNumber: string;
}

export async function charge(
  creditCardInfo: CreditCardInfo,
  amount: number,
): Promise<{ status: string }> {
  console.log(`Charging Credit Card: ${creditCardInfo.creditCardNumber}`);
  console.log(`Amount: ${amount}`);
  await delay(3000);
  return { status: "success" };
}
