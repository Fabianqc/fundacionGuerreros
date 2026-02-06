"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#" },
    { name: "Sobre Nosotros", href: "#about" },
    { name: "Programas", href: "#programs" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${isScrolled
        ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center relative z-50">
            <Link href="/" className="flex-shrink-0 flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
              <div className="relative transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-2">
                <img
                  src="/logo-guerreros-de-amor.png"
                  alt="Logo Fundación Guerreros de Amor"
                  className={`object-contain transition-all duration-500 drop-shadow-lg ${isScrolled || isOpen ? "h-16 w-auto" : "h-20 w-auto"
                    }`}
                />
              </div>
              <span
                className={`font-bold transition-all duration-500 ${isOpen ? "text-2xl text-white" : isScrolled ? "text-xl text-gray-900" : "text-2xl text-white drop-shadow-md"
                  }`}
              >
                Fundación Guerreros de Amor
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 ${isScrolled ? "text-gray-700 hover:text-purple-600" : "text-white/90 hover:text-white drop-shadow-sm"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="ml-8">
              <Link
                href="#donate"
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1 ${isScrolled
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-white text-purple-600 hover:bg-purple-50"
                  }`}
              >
                Donar
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-110 ${isOpen ? "text-white rotate-90" : isScrolled ? "text-purple-600" : "text-white"
                }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-8 w-8 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Premium Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-gradient-to-br from-purple-900/95 via-purple-950/98 to-black/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden flex flex-col items-center justify-center ${isOpen ? "opacity-100 translate-y-0 clip-path-circle-open" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center space-y-8 pb-10">
          {navLinks.map((link, index) => (
            <div
              key={link.name}
              className={`transition-all duration-700 ease-out transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                }`}
              style={{ transitionDelay: `${100 + (index * 100)}ms` }}
            >
              <Link
                href={link.href}
                className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 hover:to-white transition-all duration-300 hover:scale-110 cursor-pointer block tracking-tight"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </div>
          ))}

          <div
            className={`transition-all duration-700 ease-out transform pt-8 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
            style={{ transitionDelay: '500ms' }}
          >
            <Link
              href="#donate"
              className="group relative px-10 py-5 rounded-full text-2xl font-bold text-purple-900 bg-white shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] overflow-hidden"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">Donar Ahora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>

        {/* Decorative background visual */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-600/20 to-transparent pointer-events-none" />
      </div>
    </nav >
  );
}
