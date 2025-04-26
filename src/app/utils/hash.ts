export const base58Chars =
  "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ".split("");

export function base58Encode(num: number): string {
  let encoded = "";
  while (num > 0) {
    encoded = base58Chars[num % 58] + encoded;
    num = Math.floor(num / 58);
  }
  return encoded;
}

export function base58Decode(encoded: string): number {
  let num = 0;
  for (let i = 0; i < encoded.length; i++) {
    num = num * 58 + base58Chars.indexOf(encoded[i]);
  }
  return num;
}
