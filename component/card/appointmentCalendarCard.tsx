"use client";

import { useState } from "react";
import { AppointmentsCalendarCardProps } from "@/type/component";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";
import {
  addMonths,
  addDays,
  format,
  isSameDay,
  getDaysInMonth,
  startOfMonth,
} from "date-fns-jalali";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function AppointmentCalendarCard({
  data,
  className,
}: AppointmentsCalendarCardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Jalali month information
  const monthStart = startOfMonth(selectedDate);
  const daysInMonth = getDaysInMonth(selectedDate);

  // Saturday = 0, Sunday = 1, ..., Friday = 6
  const firstDayOffset = (monthStart.getDay() + 1) % 7;

  const monthInfo = digitsEnToFa(format(selectedDate, "MMMM yyyy"));

  // Calculate the required number of calendar rows
  const totalRows = Math.ceil((firstDayOffset + daysInMonth) / 7);

  // Always render complete rows of 7 days
  const totalCells = totalRows * 7;

  return (
    <Card className={cn("p-0 overflow-hidden gap-0", className)}>
      <CardHeader className="flex items-center justify-between gap-3 p-5.5 border-b border-input">
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          onClick={() => setSelectedDate((prev) => addMonths(prev, -1))}
        >
          <ChevronRight />
        </Button>

        <CardTitle className="text-center block truncate">
          {monthInfo}
        </CardTitle>

        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          onClick={() => setSelectedDate((prev) => addMonths(prev, 1))}
        >
          <ChevronLeft />
        </Button>
      </CardHeader>

      {/* Weekdays */}
      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => (
          <div
            key={`calendar-weekday-${index}`}
            className="flex items-center justify-center p-4 bg-background"
          >
            <span className="text-sm font-semibold text-center">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {Array.from({ length: totalCells }, (_, index) => {
          const dayNumber = index - firstDayOffset + 1;

          const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;

          // Border logic
          const isLastColumn = index % 7 === 6;
          const isLastRow = Math.floor(index / 7) === totalRows - 1;

          const cellBorderClass = cn(
            "border-l border-b border-input",
            isLastColumn && "border-l-0",
            isLastRow && "border-b-0",
          );

          // Empty cells before and after the month
          if (!isValidDay) {
            return (
              <div
                key={`empty-day-${index}`}
                className={cn("p-4", cellBorderClass)}
              />
            );
          }

          // Generate the actual Jalali date
          const dateOfItem = addDays(monthStart, dayNumber - 1);

          const dateAppointments = data.filter((appointment) =>
            isSameDay(new Date(appointment.date), dateOfItem),
          );

          return (
            <div
              key={`calendar-day-${dayNumber}`}
              className={cn("p-4 min-h-24", cellBorderClass)}
            >
              <span className="text-sm font-semibold block truncate text-center">
                {digitsEnToFa(dayNumber)}
              </span>

              {dateAppointments.length > 0 && (
                <div className="mt-2 space-y-3">
                  {dateAppointments.map((appointment, appointmentIndex) => (
                    <Tooltip
                      key={`${format(dateOfItem, "yyyy-MM-dd")}-appointment-${appointmentIndex}`}
                    >
                      <TooltipTrigger
                        render={
                          <div className="text-primary bg-primary/10 p-2 rounded-md flex items-center justify-start gap-2">
                            <Calendar className="size-4 shrink-0" />

                            <p className="text-sm font-normal truncate">
                              {appointment.fullName}
                            </p>
                          </div>
                        }
                      />

                      <TooltipContent>
                        {appointment.fullName} - {appointment.status.name} -{" "}
                        {appointment.department.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
