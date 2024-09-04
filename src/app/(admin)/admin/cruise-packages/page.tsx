import { db } from "@/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderTitleDescription from "@/components/admin/elements/headerTitleDescription";
import Link from "next/link";
export default async function CruisePackage() {
  const data = await db.package.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      duration: true,
      packageCategory: true,
      packageType: true,
    },
    orderBy: {
      packageCategory: "asc",
    },
  });
  return (
    <main>
      <div>
        <HeaderTitleDescription
          title="Package Page"
          description="Manage and add schedules effortlessly. View existing schedules, create or update time slots, and select packages for various events like breakfast, lunch, and more."
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="">
            {/* <TableHead>id</TableHead> */}
            <TableHead className="max-sm:text-[9px]">ID</TableHead>
            <TableHead className="max-sm:text-[9px]">Title</TableHead>
            <TableHead className="max-sm:text-[9px]">
              Package Category
            </TableHead>
            <TableHead className="max-sm:text-[9px] max-sm:hidden">
              Package Type
            </TableHead>
            <TableHead className="max-sm:text-[9px] max-sm:hidden">
              Change Images
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow className="relative" key={`${item.id}-table-row`}>
                <TableCell className="max-w-[100px]  min-w-[100px] max-sm:text-[9px] ">
                  #{item.id.slice(9, -1)}
                </TableCell>
                <TableCell className="max-sm:text-[9px] max-sm:text-pretty">
                  {item.title}
                </TableCell>
                <TableCell className="max-sm:text-[9px] max-sm:text-left">
                  {item.packageType}
                </TableCell>
                <TableCell className="max-sm:text-[9px] max-sm:text-pretty">
                  {item.packageCategory.toLocaleLowerCase()}
                </TableCell>
                <TableCell className="max-sm:text-[9px] max-sm:text-pretty">
                  <Link href={`/admin/cruise-packages/${item.id}`}>
                    Update Image
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
