"use client";

/**
 * Calendar – react-day-picker wrapped with Tailwind and button variants for nav/month/day cells.
 * mode="single" for one date; selected/onSelect controlled by parent (e.g. ReservationForm).
 */
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/** Tailwind class names for DayPicker layout and states (selected, today, outside, disabled) */
const defaultClassNames = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: "",
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell: "text-cream/70 w-9 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gold/10 [&:has([aria-selected])]:bg-gold/15 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: "",
  day_range_end: "day-range-end",
  day_selected:
    "bg-gold text-charcoal hover:bg-gold/90 hover:text-charcoal focus:bg-gold focus:text-charcoal",
  day_today: "bg-gold/10 text-gold",
  day_outside:
    "day-outside text-cream/40 opacity-50 aria-selected:bg-gold/10 aria-selected:text-cream/40 aria-selected:opacity-30",
  day_disabled: "text-cream/40 opacity-50",
  day_range_middle: "aria-selected:bg-gold/15 aria-selected:text-cream",
  day_hidden: "invisible",
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        ...defaultClassNames,
        nav_button: cn(
          buttonVariants({ variant: "gold" }),
          "h-7 w-7 bg-gold text-charcoal p-0 hover:opacity-90"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
