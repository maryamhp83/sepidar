import type { Metadata, Viewport } from "next";
import { ChildrenOnlyProps } from "@/type/component";
import { JetBrains_Mono, Vazirmatn } from "next/font/google";
import "@/app/globals.css";
import { DirectionProvider } from "@/component/ui/direction";
import { cn } from "cn";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/component/ui/sonner";
import QueryClientProvider from "@/component/provider/queryClientProvider";

const appName = "سپیدار";
const title = "سپیدار | سامانه مدیریت بیمارستان";
const description =
  "با سپیدار، فرایندهای مدیریتی بیمارستان را یکپارچه کنید؛ اطلاعات بیماران و پزشکان را مدیریت کنید، نوبت‌ها را ثبت کنید، بستری بیماران را سامان دهید و گزارش‌های دقیق مدیریتی و مالی را در یک پنل مشاهده کنید.";

export const metadata: Metadata = {
  applicationName: appName,
  title: {
    default: title,
    template: `%s | ${appName}`,
  },
  description,
  keywords: [
    "سپیدار",
    "Sepidar",
    "مدیریت بیمارستان",
    "سامانه مدیریت بیمارستان",
    "نرم‌افزار بیمارستانی",
    "مدیریت بیماران",
    "مدیریت پزشکان",
    "نوبت‌دهی بیمارستان",
    "مدیریت بستری بیماران",
    "مدیریت اتاق و تخت",
    "پرونده پزشکی",
    "مدیریت صورتحساب",
    "گزارش‌های بیمارستانی",
  ],
  authors: [{ name: "Mahdi Tasha" }],
  creator: "Mahdi Tasha",
  publisher: appName,
  category: "health",
  alternates: {
    canonical: "/",
    languages: {
      "fa-IR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: appName,
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "سپیدار — سامانه مدیریت بیمارستان",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
  colorScheme: "light",
};

const vazirMatnFont = Vazirmatn({
  display: "swap",
  style: "normal",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
});

const jetbrainsMonoFont = JetBrains_Mono({
  display: "swap",
  style: "normal",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function Layout({ children }: ChildrenOnlyProps) {
  return (
    <html
      suppressHydrationWarning
      lang="fa"
      dir="rtl"
      className={cn(vazirMatnFont.className, jetbrainsMonoFont.variable)}
    >
      <body>
        <QueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <DirectionProvider direction="rtl">
              <Toaster richColors />
              {children}
            </DirectionProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
