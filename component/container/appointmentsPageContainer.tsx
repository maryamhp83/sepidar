"use client";

import { useState } from "react";
import AppointmentsFilterableTable from "../table/appointmentsFilterableTable";
import departments from "@/data/departments";
import statuses from "@/data/statuses";

export default function AppointmentsPageContainer() {
  const [mode, setMode] = useState<"table" | "calendar">("table");

  return (
    <>
      <AppointmentsFilterableTable
        data={[
          {
            createdAt: new Date().toISOString(),
            date: new Date().toISOString(),
            department: departments[0],
            fullName: "XX",
            id: "XX",
            nationalCode: "XXXX",
            phoneNumber: "XXXX",
            status: statuses[0],
          },
        ]}
      />
    </>
  );
}
