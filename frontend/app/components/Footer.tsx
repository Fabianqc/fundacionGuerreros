"use client";

import { Facebook, Instagram, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-16 border-t border-purple-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
                    {/* Brand */}
                    <div className="text-center md:text-left max-w-sm">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                            <div className="relative">
                                <img
                                    src="/logo-guerreros-de-amor.png"
                                    alt="Logo"
                                    className="h-16 w-auto object-contain drop-shadow-lg"
                                />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">Fundación Guerreros</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Llevando esperanza, salud y amor a cada rincón de nuestro pueblo. Juntos somos invencibles.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 text-center md:text-left">
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Enlaces</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-purple-400 transition-colors">Inicio</Link></li>
                                <li><Link href="#about" className="hover:text-purple-400 transition-colors">Nosotros</Link></li>
                                <li><Link href="#programs" className="hover:text-purple-400 transition-colors">Programas</Link></li>
                                <li><Link href="#donate" className="hover:text-purple-400 transition-colors">Donar</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-6">
                        <a href="#" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg border border-gray-800 hover:border-purple-500">
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg border border-gray-800 hover:border-pink-500">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg border border-gray-800 hover:border-green-500">
                            <Phone className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-900 mt-16 pt-8 text-center">
                    <p className="text-gray-600 text-xs">
                        &copy; {new Date().getFullYear()} Fundación Guerreros de Amor. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
