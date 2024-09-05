"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, RemoveTimeStampFromDate } from "@/lib/utils";
import React from "react";
import { addDays, format } from "date-fns";
import { trpc } from "@/app/_trpc/client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import DownloadScheduleTable from "@/components/excel/DownloadScheduleButton";
// import { DateRange } from "react-day-picker";

interface IScheduleDownloadButton {
  className?: string;
  type: "scheduleWithBookingCount" | "scheduleWithoutBookingCount"
}

export type TDateRange = {
  from: string;
  to: string;
};
export default function ScheduleDownloadButton({
  className,
  type
}: IScheduleDownloadButton) {
  const [date, setDate] = React.useState<TDateRange>({
    from: RemoveTimeStampFromDate(new Date(Date.now())),
    to: RemoveTimeStampFromDate(addDays(new Date(Date.now()), 30)),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Download</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download Schedule</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* <div className="">from:{date?.from}</div>
          <div className="">to:{date?.to}</div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="">
              Select Date
            </Label>
            <div className={cn("grid gap-2", className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date?.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date(date?.from)}
                    selected={{
                      from: new Date(date.from),
                      to: new Date(date.to),
                    }}
                    onSelect={(selectedDate) => {
                      setDate((prev)=> {
                        let to = selectedDate?.to && prev.to === RemoveTimeStampFromDate(selectedDate?.to) ? prev.to : selectedDate?.to  ?  RemoveTimeStampFromDate(selectedDate?.to) : prev.to 

                        let from = selectedDate?.from && prev.from === RemoveTimeStampFromDate(selectedDate?.from) ? prev.from : selectedDate?.from  ?  RemoveTimeStampFromDate(selectedDate?.from) : prev.from

                        return {
                          to,
                          from
                        }
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DownloadScheduleTable state={date} type={type}/>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}