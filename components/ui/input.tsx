"use client";

/**
 * Input – Styled text input for forms (e.g. first/last name). forwardRef allows parent to attach ref.
 * Styles: dark-theme look (border-white/10, bg-white/5) with focus ring; accepts all native input props.
 */
import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-[62px] w-full border-white/10 bg-white/5 px-6 py-2 text-white placeholder:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
