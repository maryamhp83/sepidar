"use client";

import { useState } from "react";
import {
  format,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { CalendarDays } from "lucide-react";
import type { DateRange, Matcher } from "react-day-picker";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "cn";
import { DatePickerProps } from "@/type/component";
import { DayPicker } from "react-day-picker";
import * as jalali from "date-fns-jalali";

const FORMAT = "d MMMM yyyy";

function isDayDisabled(day: Date, matchers: Matcher[]): boolean {
  const d = startOfDay(day);

  return matchers.some((m) => {
    if (typeof m === "boolean") return m;
    if (m instanceof Date) return isSameDay(m, d);
    if (Array.isArray(m)) return m.some((x) => isSameDay(x, d));
    if (typeof m === "function") return m(d);
    if ("dayOfWeek" in m) {
      const days = Array.isArray(m.dayOfWeek) ? m.dayOfWeek : [m.dayOfWeek];
      return days.includes(d.getDay());
    }
    if ("from" in m || "to" in m) {
      const { from, to } = m as DateRange;
      if (from && to) {
        return !isBefore(d, startOfDay(from)) && !isAfter(d, startOfDay(to));
      }
      return from ? isSameDay(from, d) : to ? isSameDay(to, d) : false;
    }
    if ("before" in m && "after" in m) {
      return (
        isAfter(d, startOfDay(m.after)) && isBefore(d, startOfDay(m.before))
      );
    }
    if ("before" in m) return isBefore(d, startOfDay(m.before));
    if ("after" in m) return isAfter(d, startOfDay(m.after));
    return false;
  });
}

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
  range = false,
  rangeValue,
  onRangeChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    rangeValue,
  );

  const [prevValue, setPrevValue] = useState(value);
  const [prevRangeValue, setPrevRangeValue] = useState(rangeValue);

  // Sync from props during render (no effect needed)
  if (value !== prevValue) {
    setPrevValue(value);
    setSelectedDate(value);
  }

  if (rangeValue !== prevRangeValue) {
    setPrevRangeValue(rangeValue);
    setSelectedRange(rangeValue);
  }

  const updateDate = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  const updateRange = (dates: DateRange | undefined) => {
    setSelectedRange(dates);
    onRangeChange?.(dates);
  };

  const handleSelect = (date: Date | undefined) => {
    updateDate(date);
    if (date) setOpen(false);
  };

  const handleRangeSelect = (
    next: DateRange | undefined,
    triggerDate?: Date,
  ) => {
    // If a complete range already exists, start a new range instead of extending it
    const isComplete = !!(selectedRange?.from && selectedRange?.to);
    const nextRange =
      isComplete && triggerDate ? { from: triggerDate, to: undefined } : next;

    updateRange(nextRange);

    if (nextRange?.from && nextRange?.to) {
      setOpen(false);
    }
  };

  const formattedDate = selectedDate
    ? format(selectedDate, FORMAT, { locale: faIR })
    : undefined;

  const formattedRange = selectedRange?.from
    ? `${format(selectedRange.from, FORMAT, { locale: faIR })} تا ${
        selectedRange.to
          ? format(selectedRange.to, FORMAT, { locale: faIR })
          : "..."
      }`
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

  const today = startOfDay(new Date());
  const todayDisabled = isDayDisabled(today, disabledDays);

  const handleReset = () => {
    if (range) updateRange(undefined);
    else updateDate(undefined);
  };

  const handleToday = () => {
    if (todayDisabled) return;

    if (range) {
      updateRange({ from: today, to: today });
    } else {
      updateDate(today);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
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
          <span className="truncate">
            {(range ? formattedRange : formattedDate) || placeholder}
          </span>
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="w-auto overflow-hidden rounded-xl p-0"
        dir="rtl"
      >
        {range ? (
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            defaultMonth={selectedRange?.from}
            disabled={disabledDays}
            locale={faIR}
            dateLib={jalali}
            weekStartsOn={6}
            dir="rtl"
            className="p-3"
          />
        ) : (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            defaultMonth={selectedDate}
            disabled={disabledDays}
            locale={faIR}
            dateLib={jalali}
            weekStartsOn={6}
            dir="rtl"
            className="p-3"
          />
        )}

        <div
          className={cn(
            "border-t p-3",
            hasReset && "grid gap-3 lg:grid-cols-2",
          )}
        >
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full"
            disabled={todayDisabled}
            onClick={handleToday}
          >
            امروز
          </Button>

          {hasReset && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="w-full"
              onClick={handleReset}
            >
              ریست
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
