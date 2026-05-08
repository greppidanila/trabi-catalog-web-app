import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_1_logo-trabi-AY0MftpeCUEAMhnMXcBHhATXUZXEK2.png"
              alt="Trabi"
              width={120}
              height={40}
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Desde 1906, Trabi es sinónimo de calidad e innovación en artículos escolares y de oficina en Argentina.
            </p>
          </div>

          {/* Links */}
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
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg tracking-wide">Contacto</h3>
            <div className="space-y-2">
              <a
                href="mailto:dpto.mkt@trabi-carti.com.ar"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                dpto.mkt@trabi-carti.com.ar
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href="https://instagram.com/trabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://tiktok.com/@trabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-white/50">
            © {new Date().getFullYear()} Trabi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
