import { $Enums } from "@prisma/client";
import { isStatusCustom } from "./Schedules";
type TShouldStatusBeAvaiablePublicWithPackage = {
  packageCategory: $Enums.PACKAGE_CATEGORY;
  scheduleTime: $Enums.SCHEDULED_TIME;
};

export function ShouldStatusBeAvaiablePublicWithPackage({
  packageCategory,
  scheduleTime,
}: TShouldStatusBeAvaiablePublicWithPackage): $Enums.SCHEDULE_STATUS {
  if (isStatusCustom(scheduleTime)) {
    return "EXCLUSIVE";
  }
  if (isPackageStatusExclusive(packageCategory)) {
    return "EXCLUSIVE";
  }
  return "AVAILABLE";
}

export type IsPackageTypeOrExclusiveChecker = {
  packageStatus: string;
  exlcusive?: boolean;
};
export function isPackageStatusExclusive(packageStatus: string) {
  return packageStatus === $Enums.PACKAGE_CATEGORY.EXCLUSIVE;
}
export function isPackageStatusCustom(packageStatus: string) {
  return packageStatus === $Enums.PACKAGE_CATEGORY.CUSTOM;
}
export function isPackageStatusBreakfast({
  packageStatus,
  exlcusive,
}: IsPackageTypeOrExclusiveChecker) {
  return (
    packageStatus === $Enums.PACKAGE_CATEGORY.BREAKFAST ||
    (exlcusive && isPackageStatusExclusive(packageStatus))
  );
}

export function isPackageStatusLunch({
  packageStatus,
  exlcusive,
}: IsPackageTypeOrExclusiveChecker) {
  return (
    packageStatus === $Enums.PACKAGE_CATEGORY.BREAKFAST ||
    (exlcusive && isPackageStatusExclusive(packageStatus))
  );
}
export function isPackageStatusDinner({
  packageStatus,
  exlcusive,
}: IsPackageTypeOrExclusiveChecker) {
  return (
    packageStatus === $Enums.PACKAGE_CATEGORY.DINNER ||
    (exlcusive && isPackageStatusExclusive(packageStatus))
  );
}
export function isPackageStatusSunSet({
  packageStatus,
  exlcusive,
}: IsPackageTypeOrExclusiveChecker) {
  return (
    packageStatus === $Enums.PACKAGE_CATEGORY.SUNSET ||
    (exlcusive && isPackageStatusExclusive(packageStatus))
  );
}
