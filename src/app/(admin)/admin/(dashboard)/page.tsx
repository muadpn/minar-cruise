import ViewSelectedDate from "@/components/admin/dashboard/home/ViewSelectedDate";
import ScheduleSelector from "@/components/admin/dashboard/Schedule/ScheduleSelector";
import ScheduleSelectors from "@/components/admin/dashboard/Schedule/ScheduleSelectors";
import { Button } from "@/components/ui/button";
import { getManySchedulesAndTotalBookingCount } from "@/db/data/dto/schedule";
import Link from "next/link";

export default async function Admin() {
  return (
    <section className="">
      <h1 className="py-5 text-center font-bold">Welcome to Admin dashboard</h1>
      <article className="flex justify-center gap-4">
        <Link href={"/admin/schedule"}>
          <Button>Schedule</Button>
        </Link>
        <Link href={"/admin/booking"}>
          <Button>Booking</Button>
        </Link>
      </article>
      <div className="schedule-page p-4 py-8 m-2 bg-secondary rounded-2xl group my-12">
        <div className="text-xl  font-medium">
          <div className="flex gap-1 my-2">
            Selected Date:
            <ViewSelectedDate />
          </div>
        </div>
        <ScheduleSelectors />
      </div>
    </section>
  );
}
