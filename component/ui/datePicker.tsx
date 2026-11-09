"use client";

import { useState } from "react";
import { format } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { CalendarDays } from "lucide-react";
import type { Matcher } from "react-day-picker";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "cn";
import { DatePickerProps } from "@/type/component";

export default function DatePicker({
  value,
  onChange,
  placeholder = "انتخاب تاریخ",
  disabled = false,
  disabledDates,
  minDate,
  maxDate,
  className,
  invalid = false,
  hasReset = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>();

  const selectedDate = value !== undefined ? value : internalDate;

  const handleSelect = (date: Date | undefined) => {
    if (value === undefined) {
      setInternalDate(date);
    }

    onChange?.(date);
  };

  const formattedDate = selectedDate
    ? format(selectedDate, "d MMMM yyyy", { locale: faIR })
    : undefined;

  const disabledDays: Matcher[] = [
    ...(disabledDates
      ? Array.isArray(disabledDates)
        ? disabledDates
        : [disabledDates]
      : []),
    ...(minDate ? [{ before: minDate }] : []),
    ...(maxDate ? [{ after: maxDate }] : []),
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant={"outline"}
            disabled={disabled}
            aria-invalid={invalid}
            dir="rtl"
            className={cn(
              "w-full justify-between border border-input!",
              className,
            )}
          />
        }
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarDays className="size-4 shrink-0" />
          <span className="truncate">{formattedDate || placeholder}</span>
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="w-auto overflow-hidden rounded-xl p-0"
        dir="rtl"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={disabledDays}
          locale={faIR}
          dir="rtl"
          className="p-3"
        />
        <div
          className={cn(
            "border-t p-3",
            hasReset && "grid lg:grid-cols-2 gap-3",
          )}
        >
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className={"w-full"}
            onClick={() => handleSelect(new Date())}
          >
            امروز
          </Button>
          {hasReset && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className={"w-full"}
              onClick={() => {
                handleSelect(undefined);
                setInternalDate(undefined);
              }}
            >
              ریست
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
