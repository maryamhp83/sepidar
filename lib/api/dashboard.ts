import { Query, Models } from "appwrite";
import {
  tablesDB,
  databaseId,
  patientsTableId,
  doctorsTableId,
  departmentsTableId,
  appointmentsTableId,
  bedsTableId,
  invoicesTableId,
} from "./client";

import {
  GETPatient,
  GETDoctor,
  GETDepartment,
  GETAppointment,
  GETBeds,
  GETInvoices,
  GETDashboard,
} from "@/type/api";
import { StatusType } from "@/type/general";

const PAGE_SIZE = 5000;

async function getAllRows<T extends Models.Row>(tableId: string): Promise<T[]> {
  const rows: T[] = [];
  let offset = 0;

  while (true) {
    const response = await tablesDB.listRows({
      databaseId,
      tableId,
      queries: [Query.limit(PAGE_SIZE), Query.offset(offset)],
    });

    rows.push(...(response.rows as unknown as T[]));

    if (rows.length >= response.total || response.rows.length === 0) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return rows;
}

function getMonthlyStats(
  patients: GETPatient[],
  appointments: GETAppointment[],
) {
  const now = new Date();

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (11 - index), 1);

    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        month: "long",
      }).format(date),
      newPatient: 0,
      appointment: 0,
    };
  });

  const monthMap = new Map(months.map((item) => [item.key, item]));

  patients.forEach((patient) => {
    const date = new Date(patient.$createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = monthMap.get(key);

    if (month) month.newPatient++;
  });

  appointments.forEach((appointment) => {
    const date = new Date(appointment.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = monthMap.get(key);

    if (month) month.appointment++;
  });

  return months;
}

export async function getDashboardData(): Promise<GETDashboard> {
  const [patients, doctors, departments, appointments, beds, invoices] =
    await Promise.all([
      getAllRows<GETPatient>(patientsTableId),
      getAllRows<GETDoctor>(doctorsTableId),
      getAllRows<GETDepartment>(departmentsTableId),
      getAllRows<GETAppointment>(appointmentsTableId),
      getAllRows<GETBeds>(bedsTableId),
      getAllRows<GETInvoices>(invoicesTableId),
    ]);

  const occupiedBeds = beds.filter((bed) =>
    ["hospitolized", "ready-to-discharge"].includes(bed.status.toLowerCase()),
  ).length;

  const totalRevenue = invoices.reduce(
    (total, invoice) => total + invoice.payed,
    0,
  );

  return {
    stats: {
      patients: patients.length,
      doctors: doctors.length,
      departments: departments.length,
      appointments: appointments.length,
      beds: beds.length,
      totalRevenue,
    },

    chart: getMonthlyStats(patients, appointments),

    bedOccupancy: {
      occupiedBeds,
      totalBeds: beds.length,
    },
  };
}
