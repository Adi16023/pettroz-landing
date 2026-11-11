import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function LaptopMockup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("macbook", className)}>
      <div className="macbook-screen">
        <div className="macbook-viewport">{children}</div>
      </div>
      <div className="macbook-base" />
      <div className="macbook-notch" />
    </div>
  );
}
