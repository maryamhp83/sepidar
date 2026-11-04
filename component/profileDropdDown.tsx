"use client";

import { ClassOnlyProps } from "@/type/component";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "cn";
import { Avatar, AvatarBadge, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/util";
import { useAuthFetch } from "@/context/authFetchContext";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LogoutDialog from "./dialog/logoutDialog";

export default function ProfileDropdown({ className }: ClassOnlyProps) {
  const userData = useAuthFetch();
  const [logoutDialogOpened, setLogoutDialogOpened] = useState(false);

  if (!userData.data) return false;
  else {
    return (
      <>
        <LogoutDialog
          open={logoutDialogOpened}
          onOpenChange={setLogoutDialogOpened}
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className={cn("justify-between gap-5", className)}
                variant={"ghost"}
                size={"lg"}
              >
                <div className="flex items-center justify-start gap-2">
                  <Avatar className={"shrink-0"}>
                    <AvatarFallback>
                      {getInitials(userData.data.name)}
                    </AvatarFallback>
                    <AvatarBadge className="bg-green-500" />
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <span className="font-normal block truncate text-xs text-right">
                      {userData.data.name}
                    </span>
                    <span className="font-light block truncate text-xs text-muted-foreground text-right">
                      {userData.data.email}
                    </span>
                  </div>
                </div>
                <ChevronDown className="shrink-0" />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuItem
              render={
                <Link href={"/settings"}>
                  <Settings />
                  تنظیمات
                </Link>
              }
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setLogoutDialogOpened(true)}
            >
              <LogOut />
              خروج از حساب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
