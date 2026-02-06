"use client";

import { motion } from "framer-motion";
import { Heart, Sun, Users } from "lucide-react";

export default function EssenceSection() {
    const pillars = [
        {
            icon: <Heart className="w-12 h-12 text-pink-500" />,
            title: "Amor Incondicional",
            description:
                "Brindamos apoyo emocional y afectivo a quienes más lo necesitan, creando lazos que sanan el alma.",
            color: "from-pink-500/20 to-purple-500/5",
            border: "hover:border-pink-500/50",
        },
        {
            icon: <Sun className="w-12 h-12 text-amber-500" />,
            title: "Esperanza Activa",
            description:
                "No solo soñamos con un futuro mejor, trabajamos día a día para construirlo junto a nuestra comunidad.",
            color: "from-amber-500/20 to-orange-500/5",
            border: "hover:border-amber-500/50",
        },
        {
            icon: <Users className="w-12 h-12 text-blue-500" />,
            title: "Solidaridad Unida",
            description:
                "Creemos en la fuerza de la comunidad. Juntos somos un escudo indestructible contra la adversidad.",
            color: "from-blue-500/20 to-cyan-500/5",
            border: "hover:border-blue-500/50",
        },
    ];

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute top-40 -left-20 w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-base font-bold text-purple-600 tracking-wide uppercase mb-3"
                    >
                        Nuestra Esencia
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
                    >
                        Más que una fundación, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            una familia de guerreros
                        </span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-gray-500 leading-relaxed"
                    >
                        Nuestra misión nace del corazón y se fortalece con cada acción. Nos mueve la convicción de que el amor es la medicina más poderosa.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -10, rotate: 1 }}
                            className={`group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100/50 transition-all duration-300 ${pillar.border}`}
                        >
                            {/* Card Gradient Background (Hidden by default, visible on hover) */}
                            <div
                                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                            />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="mb-6 p-4 rounded-2xl bg-gray-50 group-hover:bg-white/80 group-hover:shadow-sm transition-all duration-300">
                                    {pillar.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                                    {pillar.title}
                                </h4>
                                <p className="text-gray-500 group-hover:text-gray-700 transition-colors">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
