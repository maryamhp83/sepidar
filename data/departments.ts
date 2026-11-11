import type { Department } from "@/type/general";

const departments: Department[] = [
  {
    id: "cardiology",
    name: "قلب و عروق",
    description: "تشخیص و درمان بیماری‌های قلب و عروق",
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "internal-medicine",
    name: "داخلی",
    description: "تشخیص و درمان بیماری‌های داخلی بدن",
    management: {
      fullName: "محمد احمدی",
      id: "doc-002",
    },
  },
  {
    id: "orthopedics",
    name: "ارتوپدی",
    description: "تشخیص و درمان مشکلات استخوان و مفاصل",
    management: {
      fullName: "سارا محمدی",
      id: "doc-003",
    },
  },
  {
    id: "pediatrics",
    name: "اطفال",
    description: "مراقبت و درمان بیماری‌های نوزادان و کودکان",
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "neurology",
    name: "مغز و اعصاب",
    description: "تشخیص و درمان بیماری‌های مغز و سیستم عصبی",
    management: {
      fullName: "علی رضایی",
      id: "doc-001",
    },
  },
  {
    id: "emergency",
    name: "اورژانس",
    description: "ارائه خدمات درمانی فوری و مراقبت‌های اضطراری",
    management: {
      fullName: "سارا محمدی",
      id: "doc-003",
    },
  },
];

export default departments;
