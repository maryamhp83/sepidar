"use client";

import { MainLayoutProps } from "@/type/component";
import { cn } from "cn";
import AuthGuard from "@/component/guard/authGuard";
import Navbar from "../navbar";
import Header from "../header";
import { useState } from "react";

export default function MainLayout({ children, className }: MainLayoutProps) {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  return (
    <AuthGuard mode="auth-only">
      <div className={cn("flex h-dvh overflow-hidden", className)}>
        <Navbar
          className="shrink-0"
          open={navbarCollapsed}
          onOpenChange={setNavbarCollapsed}
        />
        <div className="col-span-4 flex-1">
          <Header open={navbarCollapsed} onOpenChange={setNavbarCollapsed} />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
