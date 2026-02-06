"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Activity,
    Settings,
    LogOut,
    Menu,
    X,
    Accessibility
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { name: "Pacientes", icon: Users, href: "/admin/patients" },
        { name: "Consultas", icon: Stethoscope, href: "/admin/consultations" },
        { name: "Patologías", icon: Activity, href: "/admin/pathologies" },
        { name: "Ayudas Técnicas", icon: Accessibility, href: "/admin/equipments" },
        { name: "Configuración", icon: Settings, href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <motion.aside
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-purple-900 text-white flex flex-col shadow-xl lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="p-6 flex items-center justify-between lg:justify-center border-b border-purple-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                            <Image
                                src="/logo-guerreros-de-amor.png"
                                alt="Logo Admin"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-lg tracking-wide">AdminPanel</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-white text-purple-900 shadow-md font-semibold"
                                    : "text-purple-100 hover:bg-purple-800/50"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-purple-300 group-hover:text-white"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-purple-800">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-200 hover:bg-red-900/20 hover:text-red-100 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </Link>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                {/* Top Header (Mobile Only Toggle) */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logo-guerreros-de-amor.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                        <span className="font-bold text-gray-800">Admin</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                    {children}
                </main>
            </div>
        </div>
    );
}
