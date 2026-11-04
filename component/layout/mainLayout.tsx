import { MainLayoutProps } from "@/type/component";
import { cn } from "cn";
import AuthGuard from "@/component/guard/authGuard";
import Navbar from "../navbar";
import Header from "../header";

export default function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <AuthGuard mode="auth-only">
      <div className={cn("flex h-dvh overflow-hidden", className)}>
        <Navbar className="shrink-0" />
        <div className="col-span-4 flex-1">
          <Header />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
