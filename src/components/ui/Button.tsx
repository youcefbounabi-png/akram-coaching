import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-brand-red text-white hover:bg-brand-red/90 red-glow",
      secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
      outline: "bg-transparent border border-brand-red text-brand-red hover:bg-brand-red/10",
      ghost: "bg-transparent hover:bg-white/10 text-white",
      glass: "glass-panel glass-panel-hover text-white",
    }

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2",
    }

    // Filter out motion props if necessary, though Framer Motion's motion.button should accept them.
    // The error usually happens because we're mixing HTMLButtonElement props with motion props incorrectly in the interface.
    // For now, casting to any or ignoring the type error on motion.button is a quick fix, 
    // but the better fix is to let framer-motion handle the button props natively if we aren't passing motion props down.

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-95 hover:scale-105",
          variants[variant as keyof typeof variants],
          sizes[size as keyof typeof sizes],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
