"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";

import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Modal } from "../../../shared/ui/Modal";

import { resetPasswordSchema, type ResetPasswordFormValues } from "./schema";

export const ResetPassword = () => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = useWatch({ control, name: "password" }) || "";

    const rules = [
        { label: "Mínimo 8 caracteres.", test: (v: string) => v.length >= 8 },
        { label: "Al menos una letra mayúscula ([A-Z]).", test: (v: string) => /[A-Z]/.test(v) },
        { label: "Al menos una letra minúscula ([a-z]).", test: (v: string) => /[a-z]/.test(v) },
        { label: "Al menos un dígito ([0-9]).", test: (v: string) => /[0-9]/.test(v) },
        { label: "Al menos un símbolo (ej. [!@#$%^&*]).", test: (v: string) => /[!@#$%^&*]/.test(v) },
    ];

    const onSubmit = (data: ResetPasswordFormValues) => {
        // Por ahora simulamos una llamada a la API
        console.log("Form data:", data);
        setIsSuccessModalOpen(true);
    };

    return (
        <>
            {/* Header Content */}
            <div className="mb-xl w-[80%]">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold leading-tight">
                    Cambiar Contraseña
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Ingresa tu nueva contraseña para actualizar tu seguridad.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg w-[80%]">
                <Input
                    id="password"
                    type="password"
                    label="NUEVA CONTRASEÑA"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <Input
                    id="confirmPassword"
                    type="password"
                    label="CONFIRMAR NUEVA CONTRASEÑA"
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />

                {/* Validation List */}
                <div className="bg-card-surface/70 p-md rounded-xl space-y-sm">
                    <p className="font-label-md text-label-md text-on-surface-variant font-bold mb-xs">REQUERIMIENTOS:</p>
                    <ul className="space-y-xs">
                        {rules.map((rule, idx) => {
                            const isMet = rule.test(passwordValue);
                            return (
                                <li key={idx} className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                                    <span className={`material-symbols-outlined text-[16px] ${isMet ? 'text-secondary' : 'text-outline-variant'}`}>
                                        {isMet ? 'check_circle' : 'radio_button_unchecked'}
                                    </span>
                                    {rule.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="pt-md">
                    <Button type="submit" variant="primary" fullWidth disabled={!isValid} isLoading={isSubmitting}>
                        ACTUALIZAR CONTRASEÑA
                    </Button>
                </div>
                
                <div className="text-center pt-md">
                    <Link className="font-label-md text-label-md hover:underline transition-all text-primary-container" href="/">
                        CANCELAR Y VOLVER
                    </Link>
                </div>
            </form>

            <Modal 
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Contraseña actualizada"
                description="Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña."
                icon="check_circle"
                primaryAction={{
                    label: "Ir al inicio de sesión",
                    href: "/"
                }}
            />
        </>
    );
};
