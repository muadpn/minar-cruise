"use client";

import { cn, RemoveTimeStampFromDate } from "@/lib/utils";
import { InputLabel } from "../cnWrapper/InputLabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  onlineBookingFormValidator,
  TOnlineBookingFormValidator,
} from "@/lib/validators/onlineBookingValidator";
import { TGetPackageById } from "@/db/data/dto/package";
import { Button } from "../ui/button";
import BookingFormDatePicker from "../calender/BookingFormDatePicker";
import { $Enums } from "@prisma/client";
import { z } from "zod";
import { trpc } from "@/app/_trpc/client";
import { ErrorLogger } from "@/lib/helpers/PrismaErrorHandler";
import Script from "next/script";
import toast from "react-hot-toast";
import { Orders } from "razorpay/dist/types/orders";
import { $RazorPay } from "@/lib/helpers/RazorPay";
import Razorpay from "razorpay";
import { phoneNumberParser } from "@/lib/helpers/CommonBuisnessHelpers";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@radix-ui/react-label";
import CustomCheckboxLabel from "../custom/CustomCheckboxLabel";
import { ArrowLeft } from "lucide-react";

interface IBookingFormCard {
  className?: string;
  formData?: TGetPackageById;
  selectedSchedule?: {
    scheduleId?: string | null;
    scheduleStatus?: $Enums.SCHEDULE_STATUS | null;
  };
  selectedDate: Date;
  packageId: string;
  packagePrice: {
    child: number;
    adult: number;
  };
}

const BookingFormCard = ({
  className,
  formData,
  selectedSchedule,
  packageId,
  selectedDate,
  packagePrice,
}: IBookingFormCard) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    watch,
    getValues,
  } = useForm<TOnlineBookingFormValidator>({
    resolver: zodResolver(onlineBookingFormValidator),
    defaultValues: {
      numOfAdults: 0,
      numOfChildren: 0,
      numOfBaby: 0,
      packageId: packageId,
      scheduleId: selectedSchedule?.scheduleId ?? "",
      selectedScheduleDate: RemoveTimeStampFromDate(selectedDate),
    },
  });
  const adultCount = watch("numOfAdults");
  const childCount = watch("numOfChildren");
  const { mutate: CreateRazorPayIntent } =
    trpc.user.createRazorPayIntent.useMutation({
      onMutate() {
        toast.loading("creating razorpay intend");
      },
      // @HOTFIX check callback url before deployment
      async onSuccess(res) {
        const notes = res?.order.notes;
        toast.dismiss();
        const options = {
          key: process.env.RAZORPAY_KEYID,
          name: "Developer Testing",
          currency: "INR",
          amount: res?.order.amount,
          order_id: res?.order.id,
          callback_url: "http://localhost:3000/success",
          prefill: {
            name: "test",
            phone: phoneNumberParser(getValues("phone")),
          },
        };

        const paymentModal = new window.Razorpay(options);
        paymentModal.open();

        paymentModal.on("success", function (data: any) {
          console.log(data);
          alert("Payment failed. Please try again.");
          toast.error("payment failed");
        });

        toast.success("intend created successfully");
      },
      onError() {
        toast.error("something went wrong");
      },
    });

  async function onSubmit(data: TOnlineBookingFormValidator) {
    try {
      CreateRazorPayIntent(data);
    } catch (error) {
      if (error instanceof zodResolver) {
        console.log("Zod validation error");
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          `bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),
      0px_0px_0px_1px_rgba(25,28,33,0.08)] h-full rounded-lg min-w-[400px] py-5 px-5`,
          className,
        )}
      >
        {/* {formData?.adultPrice}
      {formData?.childPrice} */}
        <div className="text-2xl font-bold flex items-center relative">
          {/* <Link>
          </Link> */}
          <ArrowLeft className="my-auto absolute" />
          <h3 className="text-center w-full">Book Now</h3>
        </div>
        <hr className="bg-gray-200  border-0 w-full h-px my-2 font-"></hr>
        {/* <BookingFormDatePicker /> */}
        <InputLabel
          InputProps={{
            placeholder: "Name",
            ...register("name"),
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
          }}
          errorMessage={errors.name ? `${errors.name.message}` : null}
        />
        <InputLabel
          InputProps={{
            placeholder: "Email",
            ...register("email"),
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
          }}
          errorMessage={errors.email ? `${errors.email.message}` : null}
        />
        <InputLabel
          InputProps={{
            placeholder: "Phone",
            ...register("phone"),
            type: "number",
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
          }}
          errorMessage={errors.phone ? `${errors.phone.message}` : null}
        />
        <InputLabel
          InputProps={{
            min: 0,
            placeholder: "Adult (10+ years)",
            ...register("numOfAdults", { valueAsNumber: true }),
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
            type: "number",
          }}
          errorMessage={
            errors.numOfAdults ? `${errors.numOfAdults.message}` : null
          }
        />
        <InputLabel
          InputProps={{
            min: 0,
            placeholder: "Children (3-10 years)",
            ...register("numOfChildren", { valueAsNumber: true }),
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
            type: "number",
          }}
          errorMessage={
            errors.numOfChildren ? `${errors.numOfChildren.message}` : null
          }
        />
        <InputLabel
          InputProps={{
            min: 0,
            placeholder: "Below (3 years)",
            ...register("numOfBaby", { valueAsNumber: true }),
            className:
              "border-0 placeholder:font-semibold placeholder:text-gray-500",
            type: "number",
          }}
          errorMessage={errors.numOfBaby ? `${errors.numOfBaby.message}` : null}
        />
        <CustomCheckboxLabel
          className="pt-3"
          label="Yes, I agree with the privacy policy and terms and conditions."
          labelClassName="leading-5"
        />
        <CustomCheckboxLabel
          className="pt-3"
          label="Accept terms and conditions"
          description="Only backwater travelling will be entertained in the month of June,
          July and August due to Monsoon Restrictions."
        />
        <p className="font-bold ml-2 text-gray-500 my-5 text-right">
          Total Price:{" "}
          <span className="text-black">
            {adultCount * (packagePrice.adult / 100) +
              childCount * (packagePrice.child / 100)}
          </span>
        </p>
        <div className="space-y-5">
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <Button className="w-full">back</Button>
        </div>
      </form>
    </>
  );
};

export default BookingFormCard;
