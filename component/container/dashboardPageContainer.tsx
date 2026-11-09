"use client";

import {
  UsersRound,
  CalendarDays,
  BedDouble,
  Stethoscope,
  CreditCard,
  CircleDollarSign,
} from "lucide-react";
import StatusCard from "@/component/statusCard";
import { AppointmentsChartCard } from "@/component/card/dashboard/appointmentsChartCard";
import BedOccupancyCard from "@/component/card/dashboard/bedOccupancyCard";
import RecentAppotinmetsTable from "../table/dashboard/recentAppointmentsTable";
import RecentHospitolizedTable from "../table/dashboard/recentHospitolizedTable";

export default function DashboardPageContainer() {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 mb-3">
        <StatusCard
          title="تعداد کل کاربران"
          amount={2846}
          unit="people"
          icon={{
            element: <UsersRound />,
            color: "text-blue-500",
          }}
        />
        <StatusCard
          title="نوبت‌های امروز"
          amount={48}
          icon={{
            element: <CalendarDays />,
            color: "text-purple-500",
          }}
        />
        <StatusCard
          title="پزشکان فعال"
          amount={36}
          unit="people"
          icon={{
            element: <Stethoscope />,
            color: "text-emerald-500",
          }}
        />
        <StatusCard
          title="بیماران بستری"
          amount={87}
          unit="people"
          icon={{
            element: <BedDouble />,
            color: "text-cyan-500",
          }}
        />
        <StatusCard
          title="تخت‌های اشغال‌شده"
          amount={112}
          icon={{
            element: <BedDouble />,
            color: "text-red-500",
          }}
        />
        <StatusCard
          title="تخت‌های خالی"
          amount={44}
          icon={{
            element: <BedDouble />,
            color: "text-emerald-500",
          }}
        />
        <StatusCard
          title="درآمد امروز"
          amount={248}
          unit="toman"
          icon={{
            element: <CircleDollarSign />,
            color: "text-blue-500",
          }}
        />
        <StatusCard
          title="پرداخت‌های معوق"
          amount={36}
          unit="toman"
          icon={{
            element: <CreditCard />,
            color: "text-orange-500",
          }}
        />
      </div>
      <div className="grid lg:grid-cols-6 gap-4">
        <AppointmentsChartCard
          className="lg:col-span-4"
          data={[
            { month: "فروردین", newPatient: 120, appointment: 180 },
            { month: "اردیبهشت", newPatient: 145, appointment: 210 },
            { month: "خرداد", newPatient: 135, appointment: 195 },
            { month: "تیر", newPatient: 160, appointment: 230 },
            { month: "مرداد", newPatient: 175, appointment: 250 },
            { month: "شهریور", newPatient: 155, appointment: 225 },
            { month: "مهر", newPatient: 190, appointment: 280 },
            { month: "آبان", newPatient: 210, appointment: 310 },
            { month: "آذر", newPatient: 185, appointment: 270 },
            { month: "دی", newPatient: 220, appointment: 320 },
            { month: "بهمن", newPatient: 200, appointment: 295 },
            { month: "اسفند", newPatient: 240, appointment: 350 },
          ]}
        />
        <BedOccupancyCard
          className="lg:col-span-2"
          data={{
            occupiedBeds: 200,
            totalBeds: 400,
          }}
        />
        <RecentAppotinmetsTable
          className="lg:col-span-3"
          data={[
            {
              name: "علی رضایی",
              doctor: "دکتر محمد احمدی",
              dateAndTime: "2026-11-07T09:00:00.000Z",
              status: "done",
            },
            {
              name: "امیر حسینی",
              doctor: "دکتر رضا موسوی",
              dateAndTime: "2026-11-07T11:00:00.000Z",
              status: "scheduled",
            },
            {
              name: "مریم احمدی",
              doctor: "دکتر فاطمه کریمی",
              dateAndTime: "2026-11-06T16:00:00.000Z",
              status: "cancled",
            },
          ]}
        />
        <RecentHospitolizedTable
          className="lg:col-span-3"
          data={[
            {
              name: "علی رضایی",
              doctor: "دکتر محمد احمدی",
              room: {
                roomNumber: 101,
                bedNumber: 1,
              },
              status: "hospitolized",
            },
            {
              name: "امیر حسینی",
              doctor: "دکتر رضا موسوی",
              room: {
                roomNumber: 103,
                bedNumber: 1,
              },
              status: "ready-to-discharge",
            },
            {
              name: "پارسا کریمی",
              doctor: "دکتر سارا جعفری",
              room: {
                roomNumber: 105,
                bedNumber: 1,
              },
              status: "discharged",
            },
          ]}
        />
      </div>
    </>
  );
}
