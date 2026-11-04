"use client";

import { ClassOnlyProps } from "@/type/component";
import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import LogoImage from "@/image/logo.png";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  BedDouble,
  FileHeart,
  ReceiptText,
  TrendingUp,
  Settings,
  PanelRightOpen,
  PanelLeftClose,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const navbarData: {
  title: string;
  icon: ReactNode;
  href: `/${string}`;
}[] = [
  {
    title: "داشبورد",
    icon: <LayoutDashboard />,
    href: "/",
  },
  {
    title: "بیماران",
    icon: <Users />,
    href: "/patients",
  },
  {
    title: "پزشکان",
    icon: <Stethoscope />,
    href: "/doctors",
  },
  {
    title: "بخش‌ها",
    icon: <Building2 />,
    href: "/departments",
  },
  {
    title: "نوبت‌ها",
    icon: <CalendarDays />,
    href: "/appointments",
  },
  {
    title: "بسترهای",
    icon: <BedDouble />,
    href: "/beds",
  },
  {
    title: "اتاق‌ها و تخت‌ها",
    icon: <BedDouble />,
    href: "/rooms",
  },
  {
    title: "پرونده پزشکی",
    icon: <FileHeart />,
    href: "/medical-records",
  },
  {
    title: "صورت‌حساب‌ها",
    icon: <ReceiptText />,
    href: "/invoices",
  },
  {
    title: "گزارشات",
    icon: <TrendingUp />,
    href: "/reports",
  },
  {
    title: "تنظیمات",
    icon: <Settings />,
    href: "/settings",
  },
];

export default function Navbar({ className }: ClassOnlyProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      data-collapsed={collapsed}
      className={cn(
        "border-l border-input bg-background h-dvh overflow-auto flex flex-col",
        className,
      )}
    >
      <Link
        className="border-b border-input p-4 flex gap-3 shrink-0 h-18.75"
        href="/"
      >
        <Image
          alt="لوگوی سپیدار"
          src={LogoImage.src}
          width={100}
          height={100}
          className="shrink-0 size-10"
        />
        {!collapsed && (
          <div className="flex-1 lg:block hidden overflow-hidden">
            <span className="font-bold block truncate text-base">سپیدار</span>
            <span className="font-normal block truncate text-xs text-muted-foreground">
              سامانه مدیریت بیمارستان
            </span>
          </div>
        )}
      </Link>
      <div className="space-y-1 p-4 flex flex-col flex-1 h-full overflow-auto">
        {navbarData.map((item, index) => (
          <Button
            key={`navbar-item-${index}`}
            variant={pathname === item.href ? "default" : "ghost"}
            className={!collapsed ? "w-full justify-start" : ""}
            size={collapsed ? "icon-lg" : "lg"}
            render={
              <Link href={item.href}>
                {item.icon}
                {!collapsed && item.title}
              </Link>
            }
          />
        ))}
      </div>
      <div className="p-4 border-t border-input h-18.75">
        <Button
          onClick={() => setCollapsed((prev) => !prev)}
          className={!collapsed ? "w-full justify-start" : ""}
          size={collapsed ? "icon-lg" : "lg"}
          variant="outline"
        >
          {!collapsed ? (
            <>
              <PanelRightOpen />
              جمع کردن منو
            </>
          ) : (
            <PanelLeftClose />
          )}
        </Button>
      </div>
    </nav>
  );
}
