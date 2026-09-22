import React, { InputHTMLAttributes, forwardRef, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, ...props }, ref) => {
    const hookId = useId();
    const generatedId = id || hookId;
    
    return (
      <div className="space-y-xs w-full">
        {label && (
          <label
            className="block font-label-md text-label-md text-primary-container uppercase tracking-wider font-semibold"
            htmlFor={generatedId}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={generatedId}
          className={`w-full px-md py-[12px] border rounded-lg text-on-surface font-body-sm focus:ring-2 transition-all duration-200 bg-card-surface placeholder-outline ${
            error 
              ? "border-error focus:ring-error text-error" 
              : "border-card-border focus:ring-primary-container"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-[12px] text-error font-semibold mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
