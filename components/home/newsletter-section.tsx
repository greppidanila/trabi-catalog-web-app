"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Ring, Star4Point } from "@/components/decorative/fun-shapes";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call - in production this would connect to your newsletter service
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setStatus("success");
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#f20036] relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute left-10 top-10 opacity-15">
        <Ring className="w-20 h-20" color="white" strokeWidth={4} />
      </div>
      <div className="absolute right-16 bottom-12 opacity-15">
        <Star4Point className="w-16 h-16 rotate-12" color="white" />
      </div>
      <div className="absolute left-1/4 bottom-8 opacity-10">
        <Ring className="w-12 h-12" color="white" strokeWidth={3} />
      </div>
      <div className="absolute right-1/3 top-8 opacity-10">
        <Star4Point className="w-10 h-10 -rotate-12" color="white" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          {/* Text */}
          <h2 className="font-serif text-3xl tracking-wide text-white sm:text-4xl">
            Suscribite al Newsletter
          </h2>
          <p className="mt-4 text-white/90 max-w-xl mx-auto text-lg">
            Recibí novedades, ofertas exclusivas y tutoriales directamente en tu casilla de correo.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="w-full rounded-full bg-white px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-semibold text-white transition-all hover:bg-foreground/90 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span className="hidden sm:inline">Enviando...</span>
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="hidden sm:inline">Suscripto</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span className="hidden sm:inline">Suscribirme</span>
                  </>
                )}
              </button>
            </div>

            {status === "success" && (
              <p className="mt-4 text-white font-medium">
                Gracias por suscribirte. Pronto recibiras nuestras novedades.
              </p>
            )}
          </form>

          {/* Privacy note */}
          <p className="mt-6 text-sm text-white/70">
            Al suscribirte aceptas recibir comunicaciones de Trabi. Podés darte de baja en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  );
}
