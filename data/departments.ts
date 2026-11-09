import type { Department } from "@/type/general";

const departments: Department[] = [
  {
    id: "cardiology",
    name: "قلب و عروق",
    description: "تشخیص و درمان بیماری‌های قلب و عروق",
    doctorsCount: 12,
    patientsCount: 350,
    management: {
      id: "doctor-1",
      fullName: "دکتر محمد رضایی",
    },
  },
  {
    id: "internal-medicine",
    name: "داخلی",
    description: "تشخیص و درمان بیماری‌های داخلی بدن",
    doctorsCount: 15,
    patientsCount: 420,
    management: {
      id: "doctor-2",
      fullName: "دکتر علی محمدی",
    },
  },
  {
    id: "orthopedics",
    name: "ارتوپدی",
    description: "تشخیص و درمان مشکلات استخوان و مفاصل",
    doctorsCount: 8,
    patientsCount: 210,
    management: {
      id: "doctor-3",
      fullName: "دکتر امیر حسینی",
    },
  },
  {
    id: "pediatrics",
    name: "اطفال",
    description: "مراقبت و درمان بیماری‌های نوزادان و کودکان",
    doctorsCount: 10,
    patientsCount: 280,
    management: {
      id: "doctor-4",
      fullName: "دکتر سارا احمدی",
    },
  },
  {
    id: "neurology",
    name: "مغز و اعصاب",
    description: "تشخیص و درمان بیماری‌های مغز و سیستم عصبی",
    doctorsCount: 7,
    patientsCount: 190,
    management: {
      id: "doctor-5",
      fullName: "دکتر رضا کریمی",
    },
  },
  {
    id: "emergency",
    name: "اورژانس",
    description: "ارائه خدمات درمانی فوری و مراقبت‌های اضطراری",
    doctorsCount: 14,
    patientsCount: 500,
    management: {
      id: "doctor-6",
      fullName: "دکتر مهدی مرادی",
    },
  },
];

export default departments;
