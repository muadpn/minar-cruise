// // import { TselectDate } from "@/components/admin/dashboard/ScheduleSelector";
// import { TgetPackageScheduleDatas } from "@/db/data/dto/package";
// import { TgetUpcommingScheduleDates } from "@/db/data/dto/schedule";
// import { organizeScheduleData } from "@/lib/helpers/organizedData";
// import {
//   TOrganizedScheduleData,
//   TSelectedPackageIdsAndScheduleEnum,
// } from "@/Types/Schedule/ScheduleSelect";
// import { TScheduleDataDayReplaceString } from "@/Types/type";
// import { createStore } from "zustand/vanilla";

// export type ScheduleState = {
//   packages: Exclude<TgetPackageScheduleDatas, null>;
//   UpcommingScheduleDates: TgetUpcommingScheduleDates;
//   organizedSchedule?: TOrganizedScheduleData;
//   selectedSchedulePackageId?: TSelectedPackageIdsAndScheduleEnum;
//   date: string;
// };

// export type ScheduleActions = {
//   setOrganizedData: (param: TScheduleDataDayReplaceString[]) => void;
//   updateUpcommingScheduleDates: (
//     param: keyof TgetUpcommingScheduleDates,
//     data: Date[]
//   ) => void;
//   updateSelectedSchedulePackageId: <
//     S extends keyof TSelectedPackageIdsAndScheduleEnum
//   >(
//     param: keyof TSelectedPackageIdsAndScheduleEnum,
//     selectedPackage: TSelectedPackageIdsAndScheduleEnum[S]
//   ) => void;
//   setDate: (param: string) => void;
// };

// export type ScheduleStore = ScheduleState & ScheduleActions;

// export const createScheduleStore = (initScheduleStore: ScheduleState) => {
//   return createStore<ScheduleStore>()((set) => ({
//     ...initScheduleStore,
//     setDate: (param) =>
//       set({
//         date: param,
//       }),
//     setOrganizedData: (data) => {
//       const OrgData = organizeScheduleData({ data });
//       if (!OrgData) return;
//       set((state) => {
//         return {
//           organizedSchedule: OrgData,
//           selectedSchedulePackageId: {
//             breakfast: {
//               id: OrgData.breakfast?.packageId,
//               scheduleTime: "BREAKFAST",
//             },
//             custom: {
//               id: OrgData.custom?.packageId,
//               scheduleTime: "CUSTOM",
//             },
//             dinner: {
//               id: OrgData.dinner?.packageId,
//               scheduleTime: "DINNER",
//             },
//             lunch: {
//               id: OrgData.lunch?.packageId,
//               scheduleTime: "LUNCH",
//             },
//           },
//         };
//       });
//     },
//     updateUpcommingScheduleDates: (param, data) => {
//       set((state) => {
//         let newData = [...state.UpcommingScheduleDates[param], ...data];
//         let uniqueData = Array.from(new Set(newData));
//         return {
//           UpcommingScheduleDates: {
//             ...state.UpcommingScheduleDates,
//             [param]: uniqueData,
//           },
//         };
//       });
//     },
//     /**
//      *
//      * @param param Params as a key of lunch | breakfast | dinner | custom
//      * @param selectedPackage  as ENUM or the type
//      */
//     updateSelectedSchedulePackageId: (param, selectedPackage) => {
//       set((state) => {
//         return {
//           selectedSchedulePackageId: {
//             ...state.selectedSchedulePackageId,
//             [param]: selectedPackage,
//           },
//         };
//       });
//     },
//   }));
// };
