"use client";

import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { Starburst, DotGrid, Ring, Sparkle } from "@/components/decorative/fun-shapes";

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["Buenos Aires, Argentina"],
  },
  {
    icon: Phone,
    title: "WhatsApp",
    lines: ["+54 9 11 6470-0007"],
    link: "https://wa.me/5491164700007",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@trabi.com.ar"],
    link: "mailto:info@trabi.com.ar",
  },
  {
    icon: Clock,
    title: "Horario de atención",
    lines: ["Lunes a Viernes", "9:00 - 18:00"],
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/trabi.ar/",
    color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/trabi.ar",
    color: "hover:bg-blue-600",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@Trabi_ar",
    color: "hover:bg-red-600",
  },
];

export function ContactContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute -left-10 top-20 opacity-10">
        <DotGrid className="w-24 h-24" color="#f20036" cols={4} rows={4} />
      </div>
      <div className="absolute right-10 top-40 opacity-10">
        <Starburst className="w-20 h-20" color="#f20036" />
      </div>
      <div className="absolute left-1/4 bottom-40 opacity-10">
        <Ring className="w-16 h-16" color="#f20036" strokeWidth={4} />
      </div>
      <div className="absolute right-1/3 bottom-20 opacity-10">
        <Sparkle className="w-14 h-14" color="#f20036" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl tracking-wide text-foreground sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tenés una consulta, querés ser punto de venta o necesitás información sobre nuestros productos? Escribinos y te respondemos a la brevedad.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border bg-card p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.lines.map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </a>
                    ) : (
                      item.lines.map((line, i) => (
                        <p key={i} className="text-muted-foreground">
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Seguinos en redes</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-12 w-12 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:text-white hover:border-transparent ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA for Libreros */}
            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="font-semibold text-foreground mb-2">
                ¿Querés ser punto de venta?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Unite a nuestra red de libreros y distribuidores en todo el país. Completá el formulario seleccionando &quot;Quiero ser punto de venta&quot; y te contactamos.
              </p>
              <a
                href="https://wa.me/5491164700007?text=Hola!%20Me%20interesa%20ser%20punto%20de%20venta%20Trabi."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                Consultá por WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border bg-card p-6 sm:p-8">
              <h2 className="font-serif text-2xl tracking-wide text-foreground mb-2">
                Envianos tu consulta
              </h2>
              <p className="text-muted-foreground mb-6">
                Completá el formulario y te respondemos a la brevedad.
              </p>
              <ConsultationForm variant="default" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
