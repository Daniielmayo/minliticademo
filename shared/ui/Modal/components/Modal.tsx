import React from 'react';
import Link from 'next/link';
import { Button } from '../../Button';
import { ModalProps } from '../types';

export const Modal = ({
    isOpen,
    onClose,
    icon,
    title,
    description,
    children,
    primaryAction,
    secondaryAction
}: ModalProps) => {
    if (!isOpen) return null;

    let iconWrapperClass = "bg-primary-container/10";
    let iconClass = "text-primary-container";

    if (icon === "error" || icon === "warning") {
        iconWrapperClass = "bg-error/10";
        iconClass = "text-error";
    } else if (icon === "check_circle" || icon === "success" || icon === "done" || icon === "mark_email_read") {
        iconWrapperClass = "bg-secondary-container/10";
        iconClass = "text-secondary";
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-md">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-primary-container/60 backdrop-blur-sm cursor-pointer"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative bg-card-surface border border-card-border w-[90%] max-w-[600px] rounded-2xl shadow-2xl p-xl flex flex-col items-center text-center space-y-lg animate-in fade-in zoom-in-95 duration-200">

                {/* Icon */}
                {icon && (
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-xs ${iconWrapperClass}`}>
                        <span className={`material-symbols-outlined text-[32px] ${iconClass}`}>
                            {icon}
                        </span>
                    </div>
                )}

                {/* Text Content */}
                <div className="space-y-sm">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {title}
                    </h2>
                    {description && (
                        <div className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                            {description}
                        </div>
                    )}
                </div>

                {children}

                {/* Actions */}
                {(primaryAction || secondaryAction) && (
                    <div className="w-full space-y-md pt-md flex flex-col items-center">
                        {primaryAction && (
                            <Button
                                variant="primary"
                                fullWidth
                                onClick={primaryAction.onClick}
                            >
                                {primaryAction.label}
                            </Button>
                        )}
                        {secondaryAction && (
                            secondaryAction.href ? (
                                <Link
                                    className="block font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors mt-xs"
                                    href={secondaryAction.href}
                                    onClick={secondaryAction.onClick}
                                >
                                    {secondaryAction.label}
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    className="block font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors mt-xs bg-transparent border-none cursor-pointer"
                                    onClick={secondaryAction.onClick}
                                >
                                    {secondaryAction.label}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
