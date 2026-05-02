import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline"
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors border"
  
  const variantStyles = {
    default: "border-transparent bg-[var(--color-bg-page)] text-[var(--color-primary-dark)]",
    success: "border-transparent bg-[#E8F5E9] text-[var(--color-status-success)]",
    warning: "border-transparent bg-[#FFF3E0] text-[#E65100]", // Orange-ish warning
    error: "border-transparent bg-[#FFEBEE] text-[var(--color-status-error)]",
    info: "border-transparent bg-[#E1F5FE] text-[var(--color-status-info)]",
    outline: "border-[var(--color-primary-pale)] text-[var(--color-primary)] bg-transparent",
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props} />
  )
}
