import { z } from "zod";
import { procedure, router } from "../trpc";
import {} from "date-fns";
import { ContactValidators } from "@/lib/validators/ContactFormValidator";
import { ScheduleSchema } from "@/lib/validators/ScheduleValidtor";
import { db } from "@/db";
import { schedule } from "./admin/schedule";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  admin: schedule,
  subscribeNewsletter: procedure
    .input(
      z.object({
        data: ContactValidators,
        type: z.enum(["normal", "whatsapp"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { data, type } = input;
      if (data.isNewsLetter === "false") return;
      //implement saving to mongoose database

      try {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Something went wrong",
        });
      } catch (error) {
        if (error instanceof TRPCError) {
          throw new TRPCError({ code: error.code, message: error.message });
        }
      }
      return input;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
