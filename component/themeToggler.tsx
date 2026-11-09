"use client";

import { ClassOnlyProps } from "@/type/component";
import { Button } from "./ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggler({ className }: ClassOnlyProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"secondary"}
      className={className}
      size="icon-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <SunMoon />
    </Button>
  );
}
