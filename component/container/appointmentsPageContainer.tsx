"use client";

import AppointmentsFilterableTable from "../table/appointmentsFilterableTable";
import AddNewAppointmentDialog from "@/component/dialog/appointments/addNewAppointmentDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ApiLoader from "../api/apiLoader";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/lib/api/appointments";
import { Department, StatusType } from "@/type/general";
import AppointmentCalendarCard from "../card/appointmentCalendarCard";

export default function AppointmentsPageContainer() {
  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const appointmentsQuery = query.data;
  const appointments = appointmentsQuery ?? [];

  return (
    <ApiLoader
      isError={query.isError}
      isLoading={query.isLoading}
      refetch={query.refetch}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="font-normal text-sm truncate block flex-1 text-muted-foreground">
          برنامه‌ریزی و پیگیری نوبت‌های بیماران
        </span>
        <AddNewAppointmentDialog refetch={query.refetch} />
      </div>
      <Tabs>
        <TabsList className={"mb-5"}>
          <TabsTrigger value={"table"}>جدول</TabsTrigger>
          <TabsTrigger value={"calendar"}>تقویم</TabsTrigger>
        </TabsList>
        <TabsContent value={"table"}>
          <AppointmentsFilterableTable
            refetch={query.refetch}
            data={appointments.map((item) => {
              const status = JSON.parse(item.status) as StatusType;
              const department = JSON.parse(item.department) as Department;

              return {
                ...item,
                createdAt: item.$createdAt,
                department,
                status,
                id: item.$id,
              };
            })}
          />
        </TabsContent>
        <TabsContent value={"calendar"}>
          <AppointmentCalendarCard
            data={appointments.map((item) => {
              const status = JSON.parse(item.status) as StatusType;
              const department = JSON.parse(item.department) as Department;

              return {
                ...item,
                createdAt: item.$createdAt,
                department,
                status,
                id: item.$id,
              };
            })}
          />
        </TabsContent>
      </Tabs>
    </ApiLoader>
  );
}
