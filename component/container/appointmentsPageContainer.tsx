"use client";

import AppointmentsFilterableTable from "../table/appointmentsFilterableTable";
import departments from "@/data/departments";
import statuses from "@/data/statuses";
import { AppointmentType } from "@/type/general";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AppointmentCalendarCard from "../card/appointmentCalendarCard";

const appointments: AppointmentType[] = [
  {
    createdAt: new Date().toISOString(),
    date: new Date("2026-11-12").toISOString(),
    department: departments[2],
    fullName: "محمد کریمی",
    id: "appointment-003",
    nationalCode: "0034567890",
    phoneNumber: "09351234567",
    status: statuses[0],
  },
  {
    createdAt: new Date("2026-11-03").toISOString(),
    date: new Date("2026-11-13").toISOString(),
    department: departments[3],
    fullName: "زهرا محمدی",
    id: "appointment-004",
    nationalCode: "0045678901",
    phoneNumber: "09129876543",
    status: statuses[2],
  },
  {
    createdAt: new Date("2026-11-03").toISOString(),
    date: new Date("2026-11-14").toISOString(),
    department: departments[0],
    fullName: "حسین موسوی",
    id: "appointment-005",
    nationalCode: "0056789012",
    phoneNumber: "09901234567",
    status: statuses[1],
  },
  {
    createdAt: new Date("2026-11-04").toISOString(),
    date: new Date("2026-11-15").toISOString(),
    department: departments[4],
    fullName: "فاطمه حسینی",
    id: "appointment-006",
    nationalCode: "0067890123",
    phoneNumber: "09134567890",
    status: statuses[0],
  },
  {
    createdAt: new Date("2026-11-04").toISOString(),
    date: new Date("2026-11-16").toISOString(),
    department: departments[1],
    fullName: "رضا جعفری",
    id: "appointment-007",
    nationalCode: "0078901234",
    phoneNumber: "09361234567",
    status: statuses[2],
  },
  {
    createdAt: new Date("2026-11-05").toISOString(),
    date: new Date("2026-11-17").toISOString(),
    department: departments[2],
    fullName: "نگار صادقی",
    id: "appointment-008",
    nationalCode: "0089012345",
    phoneNumber: "09127654321",
    status: statuses[1],
  },
  {
    createdAt: new Date("2026-11-05").toISOString(),
    date: new Date("2026-11-18").toISOString(),
    department: departments[3],
    fullName: "امیرحسین عباسی",
    id: "appointment-009",
    nationalCode: "0090123456",
    phoneNumber: "09211234567",
    status: statuses[0],
  },
  {
    createdAt: new Date("2026-11-06").toISOString(),
    date: new Date("2026-11-19").toISOString(),
    department: departments[4],
    fullName: "سارا کاظمی",
    id: "appointment-010",
    nationalCode: "0101234567",
    phoneNumber: "09155678901",
    status: statuses[1],
  },
  {
    createdAt: new Date("2026-11-07").toISOString(),
    date: new Date("2026-11-20").toISOString(),
    department: departments[0],
    fullName: "محمدرضا نوری",
    id: "appointment-011",
    nationalCode: "0112345678",
    phoneNumber: "09381234567",
    status: statuses[2],
  },
  {
    createdAt: new Date("2026-11-08").toISOString(),
    date: new Date("2026-11-21").toISOString(),
    department: departments[1],
    fullName: "الهام مرادی",
    id: "appointment-012",
    nationalCode: "0123456789",
    phoneNumber: "09123456780",
    status: statuses[0],
  },
];

export default function AppointmentsPageContainer() {
  return (
    <Tabs>
      <TabsList className={"mb-5"}>
        <TabsTrigger value={"table"}>جدول</TabsTrigger>
        <TabsTrigger value={"calendar"}>تقویم</TabsTrigger>
      </TabsList>
      <TabsContent value={"table"}>
        <AppointmentsFilterableTable data={appointments} />
      </TabsContent>
      <TabsContent value={"calendar"}>
        <AppointmentCalendarCard data={appointments} />
      </TabsContent>
    </Tabs>
  );
}
