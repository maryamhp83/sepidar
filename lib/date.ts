import { isFuture, isValid, parseISO } from "date-fns";

export function isExpirationValid(expire: string | undefined): boolean {
  if (expire) {
    const expirationDate = parseISO(expire);
    return isValid(expirationDate) && isFuture(expirationDate);
  } else return false;
}

export const currentFormattedDate = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());

export const persianDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "short",
  timeStyle: "short",
});

export const persianNoTimeDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "medium",
});
