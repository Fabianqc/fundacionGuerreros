"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800" />

                    {/* Animated Circles */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-400 opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />

                    <div className="relative z-10 px-8 py-16 md:p-20 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
                        >
                            ¿Te unes a nuestra causa?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Tu ayuda puede cambiar una vida. Ya sea como voluntario o donante, eres parte fundamental de esta lucha guerrera. Cada aporte cuenta.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link href="#donate">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
                                    }}
                                    transition={{
                                        boxShadow: { duration: 2, repeat: Infinity }
                                    }}
                                    className="w-full sm:w-auto bg-white text-purple-700 text-lg font-bold py-4 px-10 rounded-full hover:bg-purple-50 transition-colors shadow-lg flex items-center justify-center"
                                >
                                    Quiero Donar
                                </motion.button>
                            </Link>
                            <Link href="mailto:contacto@fundacion.org">
                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full sm:w-auto bg-transparent border-2 border-white text-white text-lg font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center gap-2 group"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contactar Equipo
                                    <ArrowRight className="w-5 h-5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
