import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", ...props }, ref) => {
    
    // Base classes
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-light)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    
    // Size variants
    const sizeStyles = {
      default: "h-10 px-6 py-2.5 rounded-[8px] text-[14px]",
      sm: "h-8 px-3 rounded-[6px] text-[12px]",
      lg: "h-12 px-8 rounded-[10px] text-[16px]",
    }

    // Color variants
    const variantStyles = {
      primary: "bg-[var(--color-accent-orange)] text-white hover:bg-[#E65100]",
      secondary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]",
      outline: "border-[1.5px] border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-bg-page)]",
      ghost: "text-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:underline decoration-[var(--color-primary-pale)]",
      danger: "bg-[var(--color-status-error)] text-white hover:bg-[#B71C1C]",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
