import React, { useRef } from "react";
import { PopOverDatePicker } from "../PopOverScheduleDate";
import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks/adminStore/reducer";
import { CustomDayContentWithScheduleIndicator } from "../_Schedule/CustomScheduleDateContent";
import {
  setDate,
  setPopOverDateToggle,
} from "@/lib/features/schedule/ScheduleSlice";
import { getPrevTimeStamp, RemoveTimeStampFromDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function ScheduleDatePicker() {
  const { date } = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();
  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    // Runs on server
    store.dispatch(setInitialOrganizedScheduleDates(upCommingSchedules));
    initialized.current = true;
  }

  return (
    <PopOverDatePicker
      date={date}
      calenderProps={{
        components: {
          DayContent: (props) => CustomDayContentWithScheduleIndicator(props),
        },
        sizeMode: "lg",
        mode: "single",
        selected: new Date(date),
        onSelect: async (selectedDate) => {
          if (!selectedDate) {
            return;
          }
          dispatch(setPopOverDateToggle(false));

          let DateStringFormated = RemoveTimeStampFromDate(selectedDate);

          try {
            if (selectedDate) {
              dispatch(setDate(DateStringFormated));
            }
          } catch (error) {
            console.log(error);
            toast.error("Something went wrong while loading..");
          } finally {
            // Remove Loading..
          }
        },
        disabled: (date) => {
          let currDate = getPrevTimeStamp(Date.now());
          return date < new Date(currDate);
        },
      }}
    />
  );
}
