import OfflineBookingForm from "@/components/admin/booking/OfflineBookingForm";
import { getBookedDetails } from "@/db/data/dto/booking";
import { unstable_noStore as noStore } from "next/cache";
interface IUpdateBookingProps {
  params: { bookingId: string };
}

export default async function UpdateBooking({
  params: { bookingId },
}: IUpdateBookingProps) {
  noStore();
  // fetch booking data and related fields of payment that is neeeded in the form.
  const bookedDetails = await getBookedDetails(bookingId);
  if (!bookedDetails) return null;

  return (
    <div>
      <h1 className="text-4xl font-bold text-center py-8">Update Booking</h1>
      {/* Pass in prefill data here  */}
      <OfflineBookingForm
        scheduleId={bookedDetails.scheduleId}
        type="UPDATE"
        prefillData={bookedDetails}
      />
    </div>
  );
}
