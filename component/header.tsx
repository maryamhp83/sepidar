"use client";

import { currentFormattedDate } from "@/lib/date";
import { ClassOnlyProps } from "@/type/component";
import { cn } from "cn";
import ThemeToggler from "./themeToggler";
import ProfileDropdown from "./profileDropdDown";

export default function Header({ className }: ClassOnlyProps) {
  return (
    <header
      className={cn(
        "p-4 border-b border-input bg-background h-18.75 flex items-center justify-between gap-4",
        className,
      )}
    >
      <div className="flex-1 overflow-hidden">
        <span className="font-bold block truncate text-base">داشبورد</span>
        <span className="font-normal block truncate text-xs text-muted-foreground">
          {currentFormattedDate}
        </span>
      </div>
      <div className="flex items-center justify-end gap-3 shrink-0">
        <ThemeToggler />
        <ProfileDropdown />
      </div>
    </header>
  );
}
