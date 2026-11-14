"use client";

import {
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  BedDouble,
  Wallet,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import StatusCard from "@/component/statusCard";
import { AppointmentsChartCard } from "@/component/card/dashboard/appointmentsChartCard";
import BedOccupancyCard from "@/component/card/dashboard/bedOccupancyCard";
import { getDashboardData } from "@/lib/api/dashboard";
import ApiLoader from "../api/apiLoader";

export default function DashboardPageContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  return (
    <ApiLoader isLoading={isLoading} isError={isError}>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 sm:grid-cols-2 mb-3">
        <StatusCard
          title="بیماران"
          amount={data?.stats.patients ?? 0}
          unit="people"
          icon={{
            element: <Users />,
            color: "text-blue-500",
          }}
        />
        <StatusCard
          title="پزشکان"
          amount={data?.stats.doctors ?? 0}
          unit="people"
          icon={{
            element: <Stethoscope />,
            color: "text-emerald-500",
          }}
        />
        <StatusCard
          title="بخش‌ها"
          amount={data?.stats.departments ?? 0}
          icon={{
            element: <Building2 />,
            color: "text-purple-500",
          }}
        />
        <StatusCard
          title="نوبت‌ها"
          amount={data?.stats.appointments ?? 0}
          icon={{
            element: <CalendarDays />,
            color: "text-amber-500",
          }}
        />
        <StatusCard
          title="تخت‌ها"
          amount={data?.stats.beds ?? 0}
          icon={{
            element: <BedDouble />,
            color: "text-cyan-500",
          }}
        />
        <StatusCard
          title="درآمد کل"
          amount={data?.stats.totalRevenue ?? 0}
          unit="toman"
          icon={{
            element: <Wallet />,
            color: "text-green-500",
          }}
        />
      </div>
      <div className="grid lg:grid-cols-6 gap-4">
        <AppointmentsChartCard
          className="lg:col-span-4"
          data={data?.chart ?? []}
        />

        <BedOccupancyCard
          className="lg:col-span-2"
          data={
            data?.bedOccupancy ?? {
              occupiedBeds: 0,
              totalBeds: 0,
            }
          }
        />
      </div>
    </ApiLoader>
  );
}
