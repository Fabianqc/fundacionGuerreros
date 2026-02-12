"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CornerUpLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const router = useRouter();


    useEffect(() => {
        if (status === "authenticated") {
            router.push("/admin");
        }
    }, [status, router]);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Credenciales inválidas. Por favor intenta de nuevo.");
            } else {
                router.push("/dashboard"); // Redirect to dashboard or home
            }
        } catch (error) {
            setError("Ocurrió un error inesperado. Intenta más tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full bg-white overflow-hidden">
            {/* Left Panel - Image & Branding (Hidden on mobile) */}
            <div className="hidden lg:flex relative w-1/2 bg-purple-900 items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero_background.png"
                        alt="Fondo fundación"
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-pink-900/50 mix-blend-multiply" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-lg px-12 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="mb-8 flex justify-center">
                            <Image
                                src="/logo-guerreros-de-amor.png"
                                alt="Logo"
                                width={160}
                                height={160}
                                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
                            Unidos por una <br /> <span className="text-purple-200">misma causa</span>
                        </h2>
                        <p className="text-lg text-purple-100/90 leading-relaxed font-light">
                            "El amor no es solo un sentimiento, es la fuerza inquebrantable que nos impulsa a transformar vidas y sembrar esperanza."
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 xl:px-24 relative bg-slate-50/50">

                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors font-medium text-sm group"
                >
                    <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-purple-200 group-hover:shadow-md transition-all">
                        <CornerUpLeft className="w-4 h-4" />
                    </div>
                    <span>Volver al inicio</span>
                </Link>

                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-center mb-10">
                            <div className="lg:hidden mb-6 flex justify-center">
                                <Image
                                    src="/logo-guerreros-de-amor.png"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="object-contain drop-shadow-lg"
                                />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
                            <p className="text-gray-500">Ingresa a tu cuenta para continuar</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Correo Electrónico</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="ejemplo@correo.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-sm group-hover:border-gray-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-semibold text-gray-700">Contraseña</label>
                                    <a href="#" className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-sm group-hover:border-gray-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? (
                                        "Ingresando..."
                                    ) : (
                                        <>
                                            Ingresar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-sm text-gray-500">
                                ¿No tienes cuenta? <br />
                                <span className="font-semibold text-purple-700">
                                    Contacta al administrador del sistema
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Credit */}
                <div className="absolute bottom-6 text-center w-full text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Fundación Guerreros de Amor
                </div>
            </div>
        </div>
    );
}
