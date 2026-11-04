import { StatusCardProps } from "@/type/component";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { cn } from "cn";
import { formatPersianNumber } from "@/lib/number";

export default function StatusCard({
  amount,
  icon,
  title,
  className,
  unit,
}: StatusCardProps) {
  return (
    <Card className={cn("py-2 px-2.5 rounded-lg", className)}>
      <CardHeader className="flex items-start gap-3 p-0">
        <div
          className={cn(
            icon.color,
            "size-9 flex items-center justify-center rounded-md shrink-0 [&>svg]:size-4 bg-current/20",
          )}
        >
          {icon.element}
        </div>
        <div className="flex-1 overflow-hidden">
          <CardTitle className="text-muted-foreground text-xs mb-1 font-normal block truncate">
            {title}
          </CardTitle>
          <CardDescription className="text-foreground text-base font-bold block truncate">
            {formatPersianNumber(amount)}{" "}
            {unit === "toman" ? "تومان" : unit === "people" ? "نفر" : false}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
