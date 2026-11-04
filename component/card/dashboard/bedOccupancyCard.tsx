"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { BedOccupancyCardProps } from "@/type/component";
import { formatPersianNumber } from "@/lib/number";
import { EvilRadialChart } from "@/component/evilcharts/charts/recharts-radial-chart";
import { ChartConfig } from "@/component/evilcharts/ui/recharts-chart";

const chartConfig = {
  occupancy: {
    label: "ضریب اشغال",
    colors: {
      light: ["#2563eb"],
      dark: ["#3b82f6"],
    },
  },
} satisfies ChartConfig;

export default function BedOccupancyCard({
  data,
  className,
}: BedOccupancyCardProps) {
  const occupancyData = [
    {
      name: "occupancy",
      value: data.occupiedBeds,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="truncate mb-1">وضعیت اشغال تخت‌ها</CardTitle>
        <CardDescription className="truncate">
          از مجموع {formatPersianNumber(data.totalBeds)} تخت بیمارستان
        </CardDescription>
      </CardHeader>
      <div className="px-5.5 h-70 overflow-hidden">
        <EvilRadialChart
          data={occupancyData}
          nameKey="name"
          config={chartConfig}
          max={data.totalBeds}
          variant="full"
          innerRadius="75%"
          outerRadius="92%"
          className="h-full w-full"
        >
          <EvilRadialChart.RadialBar
            dataKey="value"
            showBackground
            cornerRadius={0}
          />
        </EvilRadialChart>
      </div>
      <CardFooter className="grid lg:grid-cols-2 gap-3">
        <div className="bg-background border border-input p-4 lg:aspect-square rounded-lg flex items-center justify-center">
          <div>
            <span className="text-sm font-bold text-center truncate block">
              {formatPersianNumber(data.totalBeds)}
            </span>
            <span className="text-xs font-light text-center truncate block">
              تخت اشغال
            </span>
          </div>
        </div>
        <div className="bg-background p-4 lg:aspect-square rounded-lg flex items-center justify-center border border-input">
          <div>
            <span className="text-sm font-bold text-center truncate block">
              {formatPersianNumber(data.totalBeds - data.occupiedBeds)}
            </span>
            <span className="text-xs font-light text-center truncate block">
              تخت خالی
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
