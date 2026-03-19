import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, error, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-card border-2 border-border/50 rounded-2xl px-4 py-4 text-foreground placeholder:text-muted-foreground/70",
            "focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/30 transition-all duration-300",
            icon && "pl-12",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-danger text-sm mt-1.5 ml-2">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
