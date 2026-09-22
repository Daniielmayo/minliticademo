import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[50px] border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-brand-primary hover:bg-secondary text-white font-bold shadow-md",
        primary: "bg-brand-primary hover:bg-secondary text-white font-bold shadow-md",
        loginCta: "bg-brand-primary hover:bg-secondary text-white font-bold rounded-[50px] shadow-md",
        outline:
          "border border-border bg-background text-foreground shadow-xs hover:bg-secondary hover:text-white rounded-[50px] aria-expanded:bg-secondary aria-expanded:text-white dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-brand-primary hover:bg-secondary text-white font-bold shadow-md",
        ghost:
          "hover:bg-secondary/10 hover:text-brand-primary text-foreground rounded-[50px] aria-expanded:bg-secondary/10",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:border-red-600 focus-visible:ring-red-600/20 rounded-[50px]",
        destructiveOutline:
          "border border-red-200 text-red-600 bg-transparent hover:bg-red-50 focus-visible:border-red-600 focus-visible:ring-red-600/20 rounded-[50px]",
        link: "text-brand-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 px-6 py-2 rounded-[50px] gap-1.5 in-data-[slot=button-group]:rounded-[50px] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        action:
          "px-8 py-3 rounded-[50px] font-bold text-base gap-2",
        xs: "h-6 gap-1 rounded-[50px] px-2.5 text-xs in-data-[slot=button-group]:rounded-[50px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[50px] px-3.5 in-data-[slot=button-group]:rounded-[50px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-11 px-8 py-3 rounded-[50px] text-base gap-2 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-9 rounded-[50px]",
        "icon-xs":
          "size-6 rounded-[50px] in-data-[slot=button-group]:rounded-[50px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[50px] in-data-[slot=button-group]:rounded-[50px]",
        "icon-lg": "size-10 rounded-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }


