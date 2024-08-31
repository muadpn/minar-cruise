// import { TTimeCycle } from "@/components/admin/dashboard/Schedule/ExclusiveScheduleTime";
import { TMeridianCycle, TSplitedFormatedDate, TTimeCycle } from "@/Types/type";
import { $Enums } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { formatISO, isValid, isSameMonth, endOfMonth, differenceInHours } from "date-fns";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { object } from "zod";
import { isDinner } from "./validators/Package";

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

export function convertLocalDateToUTC(date: Date | string) {
  if (!date) {
    return date;
  }
  let formatedDate;
  let ParsedInputDate;
  ParsedInputDate = new Date(date);
  formatedDate = new Date(
    Date.UTC(
      ParsedInputDate.getFullYear(),
      ParsedInputDate.getMonth(),
      ParsedInputDate.getDate(),
    ),
  );
  return formatISO(formatedDate);
}
/** Convert Date Object to YYYY-MM-DD format */
export function RemoveTimeStampFromDate(date: Date): string {
  return formatISO(date).split("T")[0];
}

export function ParseStringToNumber(x: string) {
  return isNaN(parseInt(x)) ? null : parseInt(x);
}

export function parseDateFormatYYYMMDDToNumber(
  date: string,
): TSplitedFormatedDate | null {
  const splitValue = date.split("-");
  if (!splitValue || splitValue.length !== 3) return null;
  let validatedDate = {
    year: ParseStringToNumber(splitValue[0]),
    month: ParseStringToNumber(splitValue[1]),
    day: ParseStringToNumber(splitValue[2]),
  };

  if (
    validatedDate.year === null ||
    validatedDate.month === null ||
    validatedDate.day === null
  ) {
    return null;
  }

  return {
    year: validatedDate.year,
    day: validatedDate.day,
    month: validatedDate.month,
  };
}

export function isDateValid(date: TSplitedFormatedDate) {
  return moment([date.year, date.month - 1, date.day]).isValid();
}

export const sleep = (ms: number) => {
  if (isProd) return;
  return new Promise((r) => setTimeout(r, ms));
};

export const getUTCDate = (dateStr: string): number => {
  const date = new Date(dateStr);
  return Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
    date.getUTCMilliseconds(),
  );
};

export function isTimeCycleMeridianValid(cycle: string): TMeridianCycle | null {
  if (cycle !== "AM" && cycle !== "PM") return null;
  return cycle;
}

export function splitTimeColon(value: string): TTimeCycle | null {
  if (!value) return null;
  const splited = value.split(":");
  if (splited.length !== 3) return null;
  let hours = splited[0];
  let min = splited[1];
  let Cycle = isTimeCycleMeridianValid(splited[2]);
  if (!Cycle || !hours || !min) return null;
  return {
    Cycle,
    hours,
    min,
  };
}
export function isTimeCycleValid(value: TTimeCycle): boolean {
  if (!value.Cycle || !value.hours.length || !value.min.length) return false;

  if (!isTimeCycleMeridianValid(value.Cycle)) return false;

  return true;
}
export function mergeTimeCycle(value: TTimeCycle): string | null {
  const { hours, min, Cycle } = value;
  return `${hours}:${min}:${Cycle}`;
}

export const isValidMergeTimeCycle = (timeString: string) => {
  return moment(timeString, "hh:mm:A", true).isValid();
};
export const mergedTime = (timeString: string) => {
  return moment(timeString, "hh:mm:A", true);
};
/**
 *
 * @param clientDate send in YYYYMMDD format
 */
export const isCurrentMonthSameAsRequestedMonth = (clientDate: string) => {
  return isSameMonth(clientDate, new Date(Date.now()));
};

export function CapitalizeFirstLetterOfWord(value: string) {
  if (value.length < 1) return value;

  return `${value.charAt(0).toLocaleUpperCase()}${value.slice(1)}`;
}

export function combineDateWithSplitedTime(date: Date, time: TTimeCycle) {
  let meridian = time.Cycle;
  let hours = parseInt(time.hours);
  let minutes = parseInt(time.min);
  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }
  const newDate = new Date(date);
  newDate.setMinutes(minutes);
  newDate.setHours(hours);
  newDate.setSeconds(0);
  return newDate;
}

export function filterDateFromCalender({
  dateArray,
  date,
}: {
  date: Date;
  dateArray:
    | {
        day: Date;
      }[]
    | undefined;
}) {
  let currDate = getPrevTimeStamp(Date.now());
  // let someOtherDate = new Date("2024-10-15");
  // let a = [
  //   { day: new Date(Date.now()) },
  //   { day: new Date(someOtherDate) },
  // ];
  // const disabledDays = data?.blockedScheduleDateArray.map((item)=>({ day: new Date(item.day) }))
  if (!dateArray) {
    return false;
  }
  let fi = dateArray.findIndex(
    (fv) => RemoveTimeStampFromDate(fv.day) === RemoveTimeStampFromDate(date),
  );

  // console.log(fi)
  if (fi !== -1) {
    return true;
  }
  if (date < new Date(currDate)) {
    return true;
  }
  return false;
}

export function checkBookingTimeConstraint({
  packageTime,
  selectedDate
}: {
  packageTime: $Enums.SCHEDULED_TIME;
  selectedDate: string
}) {
  const currentServerTime = new Date(Date.now());
  const selectedPackageTime = new Date(selectedDate)
  const timeGap = differenceInHours(currentServerTime, selectedPackageTime)

  if (packageTime === "BREAKFAST") {
    if(timeGap < 16){
      return false
    }
    return true
  }
  if (packageTime === "LUNCH") {
    if(timeGap < 2){
      return false
    }
    return true
  }
  if (packageTime === "SUNSET") {
    if(timeGap < 1){
      return false
    }
    return true
  }
  if (packageTime === "DINNER") {
    if(timeGap < 2){
      return false
    }
    return true
  }
  // exclude exclusive ,custom
  // if (packageTime === "CUSTOM") {
  //   if(timeGap < 2){
  //     return false
  //   }
  //   return true
  // }
   return false
}
