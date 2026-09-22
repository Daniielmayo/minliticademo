"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Modal } from "../../../shared/ui/Modal";

import { forgotPasswordSchema, type ForgotPasswordFormValues } from "./schema";

export const ForgotPassword = () => {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: ForgotPasswordFormValues) => {
        // Por ahora solo imprimimos los datos. Luego conectaremos con la API de autenticación.
        console.log("Form data:", data);
        setIsSuccessModalOpen(true);
    };

    return (
        <>
            {/* Header Content */}
            <div className="mb-xl w-[80%]">
                <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs font-bold leading-tight">
                    Recuperar Contraseña
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg w-[80%]">
                <Input
                    id="email"
                    type="email"
                    label="CORREO ELECTRÓNICO"
                    placeholder="nombre@empresa.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <div className="pt-md">
                    <Button type="submit" variant="primary" fullWidth disabled={!isValid} isLoading={isSubmitting}>
                        ENVIAR INSTRUCCIONES
                    </Button>
                </div>
                
                <div className="text-center pt-md">
                    <Link className="inline-flex items-center justify-center gap-xs font-label-md text-label-md text-secondary hover:text-on-secondary-container transition-colors group" href="/login">
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                        Volver al inicio de sesión
                    </Link>
                </div>
            </form>

            {/* Success Modal */}
            <Modal 
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Correo de recuperación enviado"
                description="Si el correo electrónico que ingresaste está registrado en nuestra plataforma, recibirás un enlace en los próximos minutos para restablecer tu contraseña. No olvides revisar tu carpeta de correo no deseado o spam si no lo ves en tu bandeja de entrada."
                icon="mark_email_read"
                primaryAction={{
                    label: "Entendido",
                    onClick: (e) => {
                        e?.preventDefault();
                        setIsSuccessModalOpen(false);
                        router.push('/resetPassword');
                    }
                }}
            />
        </>
    );
};
