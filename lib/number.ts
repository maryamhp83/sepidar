import { digitsEnToFa } from "@persian-tools/persian-tools";

export function formatPersianNumber(value: number | string): string {
  const number = String(value).replace(/,/g, "");

  return digitsEnToFa(number.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}
