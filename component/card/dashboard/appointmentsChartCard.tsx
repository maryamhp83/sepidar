"use client";

import { EvilAreaChart } from "@/component/evilcharts/charts/recharts-area-chart";
import type { ChartConfig } from "@/component/evilcharts/ui/recharts-chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { AppointmentsChartCardProps } from "@/type/component";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import { cn } from "cn";

const chartConfig = {
  newPatient: {
    label: "بیمار جدید",
    colors: {
      light: ["#2563eb"],
      dark: ["#60a5fa"],
    },
  },
  appointment: {
    label: "نوبت",
    colors: {
      light: ["#93c5fd"],
      dark: ["#1d4ed8"],
    },
  },
} satisfies ChartConfig;

const periods = ["۳۰ روز اخیر", "۹۰ روز اخیر", "۱۸۰ روز اخیر", "۳۶۰ روز اخیر"];

export function AppointmentsChartCard({
  data,
  className,
}: AppointmentsChartCardProps) {
  const [filter, setFilter] = useState<(typeof periods)[number] | null>(null);

  const filteredData = useMemo(() => {
    if (!filter) return data;

    let months: number;

    switch (filter) {
      case "۳۰ روز اخیر":
        months = 2;
        break;

      case "۹۰ روز اخیر":
        months = 3;
        break;

      case "۱۸۰ روز اخیر":
        months = 6;
        break;

      case "۳۶۰ روز اخیر":
        months = 12;
        break;

      default:
        return data;
    }

    return data.slice(-months);
  }, [data, filter]);

  return (
    <Card
      className={cn("flex flex-col items-center justify-between", className)}
    >
      <CardHeader className="flex items-center justify-between gap-4 w-full">
        <div className="flex-1 overflow-hidden">
          <CardTitle className="truncate mb-1">
            روند نوبت‌ها و پذیرش بیمار
          </CardTitle>
          <CardDescription className="truncate">آمار {filter}</CardDescription>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger dir="rtl" className="w-36 shrink-0">
            <SelectValue placeholder="انتخاب بازه" />
          </SelectTrigger>
          <SelectContent dir="rtl" align="end">
            {periods.map((period, index) => (
              <SelectItem key={`period-selector-${index}`} value={period}>
                {period}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <div className="px-5.5 w-full">
        <EvilAreaChart
          data={filteredData}
          config={chartConfig}
          animationType="center-out"
          curveType="monotone"
          className="h-70 w-full"
        >
          <EvilAreaChart.Grid />
          <EvilAreaChart.XAxis dataKey="month" tickMargin={10} />
          <EvilAreaChart.Tooltip />
          <EvilAreaChart.Legend />
          <EvilAreaChart.Area
            dataKey="newPatient"
            variant="gradient"
            strokeVariant="solid"
            strokeWidth={2}
          />
          <EvilAreaChart.Area
            dataKey="appointment"
            variant="solid"
            strokeVariant="solid"
            strokeWidth={1.5}
          />
        </EvilAreaChart>
      </div>
    </Card>
  );
}
