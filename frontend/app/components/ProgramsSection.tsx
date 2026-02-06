"use client";

import { motion } from "framer-motion";
import { Stethoscope, Baby, HeartHandshake, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProgramsSection() {
    const programs = [
        {
            id: "medical",
            icon: <Stethoscope className="w-16 h-16 text-white" />,
            title: "Apoyo Médico",
            description:
                "Facilitamos consultas especializadas, exámenes y medicamentos para quienes no tienen recursos. Tu salud es nuestra prioridad.",
            gradient: "from-purple-500 to-indigo-600",
            shadow: "shadow-purple-500/30",
            delay: 0,
        },
        {
            id: "kids",
            icon: <Baby className="w-16 h-16 text-white" />,
            title: "Guerreros Pequeños",
            description:
                "Programa especial dedicado a niños con enfermedades crónicas, brindando alegría, juguetes y soporte integral para sus familias.",
            gradient: "from-pink-500 to-rose-500",
            shadow: "shadow-pink-500/30",
            delay: 0.2,
        },
        {
            id: "emotional",
            icon: <HeartHandshake className="w-16 h-16 text-white" />,
            title: "Soporte Emocional",
            description:
                "Grupos de apoyo y terapia para pacientes y cuidadores. Cuidamos la mente tanto como el cuerpo, sanando desde adentro.",
            gradient: "from-cyan-500 to-blue-600",
            shadow: "shadow-cyan-500/30",
            delay: 0.4,
        },
    ];

    return (
        <section id="programs" className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-20 left-0 w-96 h-96 bg-purple-200 rounded-full blur-[100px] opacity-30 pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base font-bold text-purple-600 tracking-wide uppercase mb-3"
                    >
                        Lo que hacemos
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Nuestras Batallas
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {programs.map((program) => (
                        <motion.div
                            key={program.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: program.delay }}
                            whileHover={{ y: -10 }}
                            className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl ${program.shadow} hover:shadow-2xl transition-all duration-300 flex flex-col`}
                        >
                            <div className={`h-48 bg-gradient-to-br ${program.gradient} flex items-center justify-center relative overflow-hidden`}>
                                {/* Icon Background Effect */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150 transform rotate-12 group-hover:scale-125 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                                    {program.icon}
                                </div>

                                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                    {program.icon}
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-gray-500 mb-8 flex-1 leading-relaxed">
                                    {program.description}
                                </p>
                                <div className="mt-auto">
                                    <Link href="#" className="inline-flex items-center text-base font-semibold text-purple-600 hover:text-purple-800 transition-colors group/link">
                                        Leer más
                                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
