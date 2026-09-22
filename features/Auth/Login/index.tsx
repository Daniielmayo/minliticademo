"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Modal } from "../../../shared/ui/Modal";

import { loginSchema, type LoginFormValues } from "./schema";

export const Login = () => {
    const router = useRouter();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: LoginFormValues) => {
        console.log("Form data:", data);
        
        // Redirigir siempre al dashboard
        router.push('/dashboard');
    };

    return (
        <>
            {/* Header Content */}
            <div className="mb-xl w-[80%]">
                <h1 className="font-headline-lg text-headline-lg text-text-heading mb-xs font-bold leading-tight">
                    Bienvenido a MINLITICA
                </h1>
                <p className="font-body-md text-body-md text-text-muted">
                    Ingresa tus credenciales para acceder a la plataforma.
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

                <Input
                    id="password"
                    type="password"
                    label="CONTRASEÑA"
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            className="h-4 w-4 text-brand-primary border-border rounded focus:ring-brand-primary transition-colors cursor-pointer"
                            id="remember-me"
                            type="checkbox"
                        />
                        <label
                            className="ml-sm block font-body-sm text-body-sm text-text-body cursor-pointer"
                            htmlFor="remember-me"
                        >
                            Recordarme
                        </label>
                    </div>
                    <Link
                        className="font-label-md text-label-md text-brand-dark hover:text-brand-dark-hover transition-colors"
                        href="/forgetPassword"
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>

                <div className="pt-md">
                    <Button type="submit" variant="login-cta" fullWidth disabled={!isValid} isLoading={isSubmitting}>
                        Iniciar Sesión
                    </Button>
                </div>
            </form>

            {/* Error Credentials Modal */}
            <Modal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                title="No pudimos iniciar sesión"
                description="El correo electrónico o la contraseña que ingresaste no son correctos. Por favor, revísalos e intenta de nuevo."
                icon="error"
                primaryAction={{
                    label: "Intentar otra vez",
                    onClick: (e) => {
                        e?.preventDefault();
                        setIsErrorModalOpen(false);
                    }
                }}
                secondaryAction={{
                    label: "¿Olvidaste tu contraseña?",
                    href: "#"
                }}
            />
        </>
    );
};
