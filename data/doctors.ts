import { DoctorType } from "@/type/general";
import departments from "@/data/departments";
import statuses from "@/data/statuses";

const doctors: DoctorType[] = [
  {
    id: "doc-001",
    fullName: "علی رضایی",
    nationalCode: "0012345678",
    phoneNumber: "09121234567",
    department: departments[0],
    status: statuses[0],
    createdAt: "2026-10-12T09:30:00.000Z",
  },
  {
    id: "doc-002",
    fullName: "محمد احمدی",
    nationalCode: "0023456789",
    phoneNumber: "09123456789",
    department: departments[1],
    status: statuses[1],
    createdAt: "2026-10-15T11:20:00.000Z",
  },
  {
    id: "doc-003",
    fullName: "سارا محمدی",
    nationalCode: "0034567890",
    phoneNumber: "09351234567",
    department: departments[2],
    status: statuses[2],
    createdAt: "2026-10-18T08:45:00.000Z",
  },
];

export default doctors;
