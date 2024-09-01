import { db } from "@/db";
import { ErrorLogger } from "@/lib/helpers/PrismaErrorHandler";
import { TRPCError } from "@trpc/server";

export async function getAllBookingDataFromToday() {
  try {
    const data = await db.schedule.findMany({
      where: {
        day: {
          gte: new Date(Date.now()),
        },
      },
      select: {
        Booking: {
          select: {
            description: true,
            numOfAdults: true,
            numOfBaby: true,
            numOfChildren: true,
            user: {
              select: {
                email: true,
                contact: true,
              },
            },
            payment: {
              select: {
                advancePaid: true,
                discount: true,
                modeOfPayment: true,
                totalAmount: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    ErrorLogger(error);
    return null;
  }
}

export type TGetBookedDetails = Awaited<ReturnType<typeof getBookedDetails>>;

export async function getBookedDetails(bookingId: string) {
  try {
    const data = await db.booking.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        id: true,
        scheduleId: true,
        numOfAdults: true,
        numOfChildren: true,
        numOfBaby: true,
        description: true,
        user: {
          select: {
            name: true,
            email: true,
            contact: true,
          },
        },
        payment: {
          select: {
            advancePaid: true,
            discount: true,
            modeOfPayment: true,
            totalAmount: true,
          },
        },
      },
    });

    if (!data) return null;
    return data;
  } catch (error) {
    ErrorLogger(error);
    return null;
  }
}

export const totalBookedSeats = async (scheduleId: string) => {
  try {
    const unformattedCount = await db.booking.findMany({
      where: {
        scheduleId,
      },
      select: {
        numOfAdults: true,
        numOfBaby: true,
        numOfChildren: true,
        totalBooking: true,
      },
    });
    
    if (!unformattedCount.length) {
      return 0;
    }
    let formattedCount = unformattedCount.reduce(
      (total, booking) => total + booking.totalBooking,
      0,
    );

    return formattedCount;
  } catch (error) {
    ErrorLogger(error);
    return -1
  }
};
