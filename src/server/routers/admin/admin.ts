import { router } from "@/server/trpc";
import { booking } from "./booking";
import { schedule } from "./schedule";

export const admin = router({
  /**
   * @description
   * String that should be passed in Should be in YYYY-MM-DD
   * if not passed in any then it will get the Current Date and fetch it.
   *
   */
  booking,
  schedule,
});
