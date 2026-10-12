"use client";

/**
 * Button – Reusable button with CVA variants (default/gold, outline, input, ghost) and sizes (default, sm).
 * Brand style mirrors the reference site's .btn-gold: gold surface, charcoal text, lighter on hover.
 * asChild: when true, renders as Radix Slot so the single child receives the button styles (e.g. for ScrollLink).
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** CVA: base classes + variant/size options; used by Button and by Calendar for nav/day styles.
 *  Pill shape + uppercase tracking = the modern-bistro CTA style. Widths are content-driven
 *  (min-w, not fixed w) so longer labels never overflow. Hover lifts via transform only. */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold uppercase tracking-[0.08em] rounded-full transition-[background-color,color,box-shadow,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-charcoal bg-gold hover:bg-gold-hover hover:shadow-primary",
        gold: "text-charcoal bg-gold hover:bg-gold-hover hover:shadow-primary",
        outline: "text-gold border border-gold hover:bg-gold/15",
        input:
          "bg-white/5 border border-white/10 text-white hover:bg-white/10 focus-visible:ring-gold focus-visible:ring-offset-transparent",
        ghost: "hover:bg-white/10",
      },
      size: {
        default: "min-w-[170px] h-[56px] px-8",
        sm: "min-w-[140px] h-[46px] px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
