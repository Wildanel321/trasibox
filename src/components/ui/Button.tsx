import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-lg active:scale-[0.98]";

    const variantStyles = {
      primary: "bg-[#7C5CFC] hover:bg-[#6A49F5] text-white shadow-lg shadow-[#7C5CFC]/20",
      secondary: "bg-[#18181B] hover:bg-[#222228] text-[#FAFAFA] border border-white/8 hover:border-white/15",
      outline: "bg-transparent hover:bg-white/5 text-[#FAFAFA] border border-white/15 hover:border-white/30",
      ghost: "bg-transparent hover:bg-white/5 text-[#A1A1AA] hover:text-[#FAFAFA]",
      danger: "bg-rose-600 hover:bg-rose-700 text-white",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5 font-semibold",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

