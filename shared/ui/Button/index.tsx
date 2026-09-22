import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'destructive-outline' | 'login-cta' | 'action';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', fullWidth = false, isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex justify-center items-center font-bold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-[50px]";
    
    // Forzamos colores grises cuando el botón está deshabilitado
    const disabledStyles = "disabled:!bg-gray-300 disabled:!text-gray-600 disabled:!border-transparent disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-50 hover:disabled:!bg-gray-300 hover:disabled:!text-gray-600";

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: "border border-transparent text-white bg-brand-primary hover:bg-secondary shadow-md font-bold px-8 py-3 rounded-[50px] focus:ring-brand-primary",
      action: "border border-transparent text-white bg-brand-primary hover:bg-secondary shadow-md font-bold px-8 py-3 rounded-[50px] focus:ring-brand-primary",
      'login-cta': "border border-transparent text-white bg-brand-primary hover:bg-secondary shadow-md font-bold text-base py-3.5 px-8 rounded-[50px] focus:ring-secondary",
      secondary: "border border-transparent text-white bg-brand-primary hover:bg-secondary shadow-md font-bold px-8 py-3 rounded-[50px] focus:ring-secondary",
      outline: "border border-border text-foreground hover:bg-secondary hover:text-white shadow-xs px-8 py-3 rounded-[50px] focus:ring-border",
      ghost: "border border-transparent text-foreground hover:bg-secondary/10 hover:text-brand-primary px-4 py-2 rounded-[50px] focus:ring-brand-primary",
      destructive: "border border-transparent bg-red-600 text-white hover:bg-red-700 shadow-sm px-6 py-2 rounded-[50px] focus:ring-red-600",
      'destructive-outline': "border border-red-200 text-red-600 bg-transparent hover:bg-red-50 px-6 py-2 rounded-[50px] focus:ring-red-600",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${widthStyles} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

