import type { Department } from "@/type/general";

const departments: Department[] = [
  {
    id: "cardiology",
    name: "قلب و عروق",
    description: "تشخیص و درمان بیماری‌های قلب و عروق",
    doctorsCount: 12,
    patientsCount: 350,
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "internal-medicine",
    name: "داخلی",
    description: "تشخیص و درمان بیماری‌های داخلی بدن",
    doctorsCount: 15,
    patientsCount: 420,
    management: {
      fullName: "محمد احمدی",
      id: "doc-002",
    },
  },
  {
    id: "orthopedics",
    name: "ارتوپدی",
    description: "تشخیص و درمان مشکلات استخوان و مفاصل",
    doctorsCount: 8,
    patientsCount: 210,
    management: {
      fullName: "سارا محمدی",
      id: "doc-003",
    },
  },
  {
    id: "pediatrics",
    name: "اطفال",
    description: "مراقبت و درمان بیماری‌های نوزادان و کودکان",
    doctorsCount: 10,
    patientsCount: 280,
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "neurology",
    name: "مغز و اعصاب",
    description: "تشخیص و درمان بیماری‌های مغز و سیستم عصبی",
    doctorsCount: 7,
    patientsCount: 190,
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "emergency",
    name: "اورژانس",
    description: "ارائه خدمات درمانی فوری و مراقبت‌های اضطراری",
    doctorsCount: 14,
    patientsCount: 500,
    management: {
      fullName: "سارا محمدی",
      id: "doc-003",
    },
  },
];

export default departments;
