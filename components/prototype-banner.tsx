"use client";

import { useState } from "react";
import { X, ExternalLink, MessageCircle } from "lucide-react";
import Link from "next/link";

export function PrototypeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-xs sm:text-sm text-center sm:text-left leading-relaxed">
            <span className="text-amber-400 font-semibold">Prototipo</span>
            <span className="hidden sm:inline"> — </span>
            <span className="block sm:inline">
              Diseño web realizado por{" "}
              <Link
                href="https://daniladigital.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline underline-offset-2 hover:text-amber-400 transition-colors"
              >
                Danila Digital
              </Link>
              . ¿Te gustó? Contactanos para desarrollar tu web.
            </span>
          </p>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="https://daniladigital.com.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">Ver sitio</span>
            </Link>
            <Link
              href="https://wa.me/541132803019"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-medium hover:bg-[#20bd5a] transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              <span className="hidden sm:inline">WhatsApp</span>
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Cerrar banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
