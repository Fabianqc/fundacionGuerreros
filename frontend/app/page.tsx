import Navbar from "./components/Navbar";
import Image from "next/image";
import EssenceSection from "./components/EssenceSection";
import ProgramsSection from "./components/ProgramsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_background.png"
            alt="Comunidad unida"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-purple-900/70 mix-blend-multiply" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl mb-8 drop-shadow-lg">
              <span className="block mb-2">Luchamos juntos por</span>
              <span className="block text-purple-200">la vida y la esperanza</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-purple-50 sm:text-2xl md:mt-8 font-medium drop-shadow-md">
              Fundación Guerreros de Amor. Una mano amiga para quienes enfrentan batallas difíciles de salud. Amor, apoyo y cuidado para nuestro pueblo.
            </p>
            <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12 gap-4">
              <div className="rounded-full shadow-lg">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-purple-700 bg-white hover:bg-purple-50 md:py-4 md:text-xl md:px-10 transition-all transform hover:scale-105"
                >
                  Unirme a la lucha
                </a>
              </div>
              <div className="mt-3 sm:mt-0 rounded-full shadow-lg">
                <a
                  href="#about"
                  className="w-full flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full text-white bg-transparent hover:bg-white/10 md:py-4 md:text-xl md:px-10 transition-all transform hover:scale-105"
                >
                  Conocer más
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <EssenceSection />

      {/* Programs Section */}
      <ProgramsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
