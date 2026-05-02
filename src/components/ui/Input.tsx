import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-[8px] border-[1.5px] bg-[var(--color-bg-card)] px-3 py-2 text-[14px] ring-offset-[var(--color-bg-card)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-secondary)] placeholder:opacity-70 focus-visible:outline-none focus-visible:bg-[#F5FFFE] focus-visible:border-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
          error 
            ? "border-[var(--color-status-error)] focus-visible:border-[var(--color-status-error)]" 
            : "border-[var(--color-border-light)]"
        } ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
