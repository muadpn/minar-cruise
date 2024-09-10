import { cn } from "@/lib/utils";
import React from "react";

export default function ColorRepresentationInfo({
  className,
  title,
}: {
  className: string;
  title: string;
}) {
  return (
    <div className="flex items-center  gap-2">
      <div className={cn("rounded-full w-4 h-4 bg-green-400", className)} />
      <p>{title}</p>
    </div>
  );
}
