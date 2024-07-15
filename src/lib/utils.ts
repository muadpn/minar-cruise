import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isProd = process.env.NODE_ENV !== "development";

/**
 * @description sajdhasjdfjk hjsdb hjavdjhv asjhdv asfnhasvfhgv asfvshag v
 * @example absoluteUrl('/api/get')
 *
 * @param path String thats Rest needed to combine with the Domain URL
 * @returns LocalHost:3002 || ProductionDomain+/path
 * @param @type
 *
 */
export function absoluteUrl(path: string): string {
  if (typeof window !== "undefined") return path;
  if (process.env.NODE_ENV === "production") {
    return `${process.env.DOMAIN as string}${path}`;
  } else {
    return `http://localhost:${process.env.PORT ?? 3002}${path}`;
  }
}

// const timestamp = 1721005820582;
export function getPrevTimeStamp(timestamp: number) {
  const date = new Date(timestamp);
  const oneDayBefore = new Date(date.getTime() - 24 * 60 * 60 * 1000);
  const newTimestamp = oneDayBefore.getTime();
  return newTimestamp;
}

export function isSameDay(date: Date, fromDate: Date) {
  return (
    date.getDate() === fromDate.getDate() &&
    date.getMonth() === fromDate.getMonth() &&
    date.getFullYear() === fromDate.getFullYear()
  );
}
export function convertUTCToLocalDate(date: Date) {
  if (!date) {
    return date;
  }
  date = new Date(date);
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return date;
}
