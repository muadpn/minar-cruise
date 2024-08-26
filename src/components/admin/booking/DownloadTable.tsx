"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import ExcelJS from "exceljs";
import { TGetBookingsByScheduleId } from "@/db/data/dto/schedule";

interface IDownloadTable {
  tableData?: TGetBookingsByScheduleId;
}

export default function DownloadTable({ tableData }: IDownloadTable) {
  /**
   * @TODO
   * this download button should be hidden if table data is empty
   * pass the schedule date to this page so that we can display it on top of the excel sheet
   * */

  function exportExcelFile() {
    const workbook = new ExcelJS.Workbook();

    // workbook.creator='ASLAM'
    // workbook.created= new Date(Date.now())

    const sheet = workbook.addWorksheet("Bookings", {
      pageSetup: { paperSize: 9, orientation: "landscape" , },
    });
    
    // sheet.properties.defaultColWidth = 10

    sheet.getRow(1).font = {
      name: "header",
      family: 1,
      size: 12,
      bold: true
    }
    sheet.columns = [
      {
        header: "Num",
        key: "num",
        width: 10,
        style: {
          alignment: {
            vertical: "middle"
          }
        }
 
      },
      {
        header: "Name",
        key: "name",
        width: 15,
        style: {
          alignment: {
            vertical: "middle"
          }
        }
      },
      {
        header: "Date Of Booking",
        key: "bookingDate",
        width: 20,
      },
      {
        header: "Package",
        key: "package",
        width: 15,
      },
      {
        header: "Advance Paid",
        key: "advance",
        width: 20,
      },
      {
        header: "Total Bill",
        key: "totalAmount",
        width: 10,
      },
      {
        header: "Phone",
        key: "phone",
        width: 15,
      },
      {
        header: "Adult",
        key: "adult",
        width: 10,
      },
      {
        header: "Child",
        key: "child",
        width: 10,
      },
      {
        header: "Kids",
        key: "kids",
        width: 10,
      },
      {
        header: "Description",
        key: "description",
        width: 15,
      },
    ];
    // Do something here when table data in empty
    tableData?.map((item, i) => {
      const {
        createdAt,
        description,
        id,
        numOfAdults,
        numOfBaby,
        numOfChildren,
        payment,
        schedule,
        user,
      } = item;
      sheet.addRow({
        num: i + 1,
        name: user.name,
        bookingDate: createdAt,
        package: schedule.schedulePackage,
        advance: payment.advancePaid,
        totalAmount: payment.totalAmount,
        phone: user.contact,
        adult: numOfAdults,
        child: numOfChildren,
        kids: numOfBaby,
        description: description,
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "download.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }
  return (
    <Button variant={"secondary"} onClick={exportExcelFile}>
      Download
    </Button>
  );
}

// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="outline">Open</Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent className="w-36">
//     <DropdownMenuItem>
//       <LogOut className="mr-2 h-4 w-4" />
//       <span>Log out</span>
//       <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>