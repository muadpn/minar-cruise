import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/adminStore/reducer";
import { setUpdatableScheduleDate } from "@/lib/features/schedule/ScheduleSlice";
import { DefaultMergedSchedule, scheduleIdAndPackageTitleSelector } from "@/lib/features/schedule/selector";
import { cn } from "@/lib/utils";
import { TScheduleSelector } from "@/Types/type";
export default function ScheduleSelect({ type }: TScheduleSelector) {
  const { OrganizedPackage } = useAppSelector((state) => state.packages);
  const { currentDateSchedule } = useAppSelector((state) => state.schedule);
  

  const defaultSelect = useAppSelector((state) =>
    DefaultMergedSchedule(state, type),
  );
  
  
  
  const dispatch = useAppDispatch();
  return (
    <Select
      defaultValue={currentDateSchedule[type]?.packageId ?? "false"}
      value={defaultSelect.packageId ?? "false"}
      onValueChange={(value) => {
        if(value === "false") return 
        dispatch(setUpdatableScheduleDate({ packageId: value, type }));
      }}
    >
      <SelectTrigger value={"false"} className="w-full">
        <SelectValue placeholder={"Select a Package"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"false"} key={`select-item-empty`}>
          <div className="flex items-center gap-1">Select a Package</div>
        </SelectItem>
        {OrganizedPackage[type].map((item) => {
          return (
            <SelectItem
              disabled={
                currentDateSchedule &&
                currentDateSchedule[type]?.packageId === item.id
              }
              value={item.id}
              key={`select-item-${item.id}`}
            >
              <div className="flex items-center gap-2">
                {item.title}
                <div
                  className={cn(
                    "w-1 h-1 bg-green-500 animate-pulse rounded-full hidden",
                    {
                      block:
                        currentDateSchedule &&
                        currentDateSchedule[type]?.packageId === item.id,
                    },
                  )}
                />
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
