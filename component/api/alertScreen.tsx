import { AlertScreenProps } from "@/type/component";
import { AlertCircle, Info } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/component/ui/alert";
import { cn } from "cn";

export default function AlertScreen({
  title,
  description,
  variant,
  className,
  button,
}: AlertScreenProps) {
  const Icon = variant === "destructive" ? AlertCircle : Info;

  return (
    <div
      className={cn(
        "flex min-h-dvh items-center justify-center p-4",
        className,
      )}
    >
      <Alert variant={variant} className="w-full max-w-md">
        <Icon className="size-4" aria-hidden="true" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {button && <AlertAction>{button}</AlertAction>}
      </Alert>
    </div>
  );
}
