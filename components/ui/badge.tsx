import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-primary text-white shadow-xs",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-white shadow-xs",
        outline:
          "border border-border text-foreground",
        budget:
          "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-medium px-2.5 py-1 rounded-full border border-sky-200/50",
        status:
          "bg-white border border-gray-200 text-text-body text-xs rounded-full px-2.5 py-0.5 shadow-2xs",
        ribbonSoon:
          "bg-gray-700/90 text-white text-[10px] uppercase tracking-wider rotate-45 font-bold shadow-md",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs rounded-full",
        sm: "px-2 py-0.5 text-[11px] rounded-full",
        lg: "px-3 py-1 text-sm rounded-full",
        ribbon: "px-6 py-1 text-[10px]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
