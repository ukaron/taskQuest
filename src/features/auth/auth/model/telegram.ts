import * as CryptoJS from "crypto-js";

export async function verifyTelegramData(
  telegramData: Record<string, string>,
  botToken: string
): Promise<boolean> {
  const { hash, ...dataToCheck } = telegramData;

  const dataString = Object.keys(dataToCheck)
    .sort()
    .map((key) => `${key}=${dataToCheck[key]}`)
    .join("\n");

  const secretKey = CryptoJS.SHA256(botToken).toString(CryptoJS.enc.Hex);

  const hmac = CryptoJS.HmacSHA256(dataString, secretKey).toString(
    CryptoJS.enc.Hex
  );

  return hmac === hash;
}
