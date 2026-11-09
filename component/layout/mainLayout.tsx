"use client";

import { MainLayoutProps } from "@/type/component";
import { cn } from "cn";
import AuthGuard from "@/component/guard/authGuard";
import Navbar from "../navbar";
import Header from "../header";
import { useState } from "react";

export default function MainLayout({
  children,
  className,
  mode = "auth-only",
}: MainLayoutProps) {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);

  return (
    <AuthGuard mode={mode}>
      <section
        className={cn("flex h-dvh bg-background overflow-hidden", className)}
      >
        <Navbar
          className="shrink-0"
          open={navbarCollapsed}
          onOpenChange={setNavbarCollapsed}
        />
        <div className="col-span-4 flex-1 bg-background">
          <Header open={navbarCollapsed} onOpenChange={setNavbarCollapsed} />
          <main className="h-[calc(100dvh-75px)] overflow-auto">
            <div className="max-w-6xl mx-auto p-4">{children}</div>
          </main>
        </div>
      </section>
    </AuthGuard>
  );
}
