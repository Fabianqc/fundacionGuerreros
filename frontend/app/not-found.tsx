"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Ghost, Map, Sparkles, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-purple-900 overflow-hidden relative text-white">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero_background.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-20 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/90 to-black/80" />
            </div>

            {/* Floating Decorative Blobs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-20 left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"
            />

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative inline-block"
                >
                    {/* Glowing 404 Text */}
                    <h1 className="text-[150px] md:text-[200px] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-purple-900/50 drop-shadow-2xl select-none">
                        404
                    </h1>

                    {/* Floating Ghost Icon */}
                    <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                        <Ghost className="w-24 h-24 text-purple-300 opacity-80" />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="mb-8">
                        <Image
                            src="/logo-guerreros-de-amor.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="mx-auto object-contain drop-shadow-lg opacity-80"
                        />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">
                        ¡Ups! Página no encontrada
                    </h2>

                    <p className="text-xl md:text-2xl text-purple-200 font-medium mb-10 leading-relaxed max-w-lg mx-auto">
                        "¡Ups! Parece que te has salido del mapa... <Map className="inline w-6 h-6 text-purple-400 mb-1" /> <br />
                        ¿Andas curioseando por donde no debes? <Search className="inline w-6 h-6 text-pink-400 mb-1" /> <Sparkles className="inline w-5 h-5 text-yellow-400 mb-1" />"
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 font-bold rounded-full hover:bg-purple-50 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-purple-500/20"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Regresar a Casa
                    </Link>
                </motion.div>
            </div>

            {/* Footer Copyright */}
            <div className="absolute bottom-8 text-center w-full text-xs text-purple-300/40">
                &copy; {new Date().getFullYear()} Fundación Guerreros de Amor
            </div>
        </div>
    );
}
