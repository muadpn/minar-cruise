import { trpc } from "@/app/_trpc/client";
import { RemoveTimeStampFromDate } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { DayProps } from "react-day-picker";

interface IClientCalenderScheduleDay {
  props: DayProps;
  AvailableDate?: string[];
  blockedDate?: string[]
}

export default function ClientCalenderScheduleDay({
  AvailableDate,
  props,
  blockedDate
}: IClientCalenderScheduleDay) {
  const { date } = props;

  const isAvailableDateFound = AvailableDate
    ? AvailableDate.findIndex((item) => isSameDay(RemoveTimeStampFromDate(new Date(item)), RemoveTimeStampFromDate(date)))
    : -1;

  return (
    <span className="">
      <div className="absolute w-full -bottom-[3px] left-0 items-center  justify-center flex gap-1">
        {isAvailableDateFound !== -1 && AvailableDate && AvailableDate[isAvailableDateFound] ? (
          <div className="w-1 h-1 bg-green-500  rounded-full" />
        ) : null}
      </div>
      {props.date.getDate()}
    </span>
  );
}
