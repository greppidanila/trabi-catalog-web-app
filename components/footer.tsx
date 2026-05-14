"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.07A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  );
}

function FooterContactForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 text-sm">
        <Send className="h-4 w-4" />
        ¡Gracias! Te mantendremos informado.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu email"
        className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/50 focus:bg-white/20 focus:outline-none"
        required
      />
      <button
        type="submit"
        className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
      >
        Suscribir
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_1_logo-trabi-AY0MftpeCUEAMhnMXcBHhATXUZXEK2.png"
              alt="Trabi"
              width={120}
              height={40}
              className="h-10 w-auto md:h-12"
              priority
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Desde 1906, Trabi es sinónimo de calidad e innovación en artículos escolares y de oficina en Argentina.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/trabi.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com/@trabi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide">Navegación</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
                Inicio
              </Link>
              <Link href="/catalogo" className="text-sm text-white/70 hover:text-white transition-colors">
                Catálogo
              </Link>
              <Link href="/tutoriales" className="text-sm text-white/70 hover:text-white transition-colors">
                Tutoriales
              </Link>
              <Link href="/puntos-de-venta" className="text-sm text-white/70 hover:text-white transition-colors">
                Puntos de Venta
              </Link>
              <Link href="/contacto" className="text-sm text-white/70 hover:text-white transition-colors">
                Contacto
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide">Contacto</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/5491164700007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" />
                +54 9 11 6470-0007
              </a>
              <a
                href="mailto:info@trabi.com.ar"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@trabi.com.ar
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide">Newsletter</h3>
            <p className="text-sm text-white/70">
              Recibí novedades, lanzamientos y tutoriales en tu email.
            </p>
            <FooterContactForm />
            <Link
              href="/contacto"
              className="inline-block text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ¿Tenés una consulta? Escribinos →
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Trabi. Todos los derechos reservados.
            </p>
            <p className="text-xs text-white/40">
              Marcá la diferencia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
