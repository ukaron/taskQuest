import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../lib/utils";

const priorityVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent h-10 px-3",
  {
    variants: {
      value: {
        "1": "bg-green-500 text-white",
        "2": "bg-yellow-500 text-white",
        "3": "bg-red-500 text-white",
      },
    },
    defaultVariants: {
      value: "2",
    },
  }
);

export interface PriorityLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priorityVariants> {
  value: "1" | "2" | "3";
}

const PriorityLabel = React.forwardRef<HTMLDivElement, PriorityLabelProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        className={cn(priorityVariants({ value, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
PriorityLabel.displayName = "PriorityLabel";

export { PriorityLabel, priorityVariants };
