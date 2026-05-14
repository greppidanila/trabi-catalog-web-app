"use client";

import { useState } from "react";
import { Send, Loader2, Check, User, Mail, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export type ConsultationType = 
  | "producto"
  | "punto-de-venta"
  | "pedido-mayorista"
  | "sugerencia"
  | "otro";

const consultationTypes: { value: ConsultationType; label: string; description: string }[] = [
  { 
    value: "producto", 
    label: "Consulta sobre producto",
    description: "Información técnica, disponibilidad, colores"
  },
  { 
    value: "punto-de-venta", 
    label: "Quiero ser punto de venta",
    description: "Solicitar acceso como librero o distribuidor"
  },
  { 
    value: "pedido-mayorista", 
    label: "Pedido mayorista",
    description: "Consulta sobre pedidos al por mayor"
  },
  { 
    value: "sugerencia", 
    label: "Sugerencia",
    description: "Feedback, ideas o mejoras"
  },
  { 
    value: "otro", 
    label: "Otro",
    description: "Otras consultas"
  },
];

type ConsultationFormProps = {
  defaultType?: ConsultationType;
  productCode?: string;
  productName?: string;
  variant?: "default" | "compact" | "inline";
  className?: string;
  onSuccess?: () => void;
};

export function ConsultationForm({
  defaultType,
  productCode,
  productName,
  variant = "default",
  className,
  onSuccess,
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    whatsapp: "",
    tipo: defaultType || ("" as ConsultationType | ""),
    mensaje: productCode 
      ? `Hola, me interesa el producto ${productCode}${productName ? ` - ${productName}` : ""}. ` 
      : "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.nombre || !formData.apellido) {
      setError("Por favor completá tu nombre y apellido");
      return;
    }
    if (!formData.email && !formData.whatsapp) {
      setError("Por favor ingresá un email o WhatsApp para contactarte");
      return;
    }
    if (!formData.tipo) {
      setError("Por favor seleccioná el tipo de consulta");
      return;
    }
    if (!formData.mensaje.trim()) {
      setError("Por favor escribí tu mensaje");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, this would send to an API endpoint
    console.log("[v0] Form submitted:", formData);

    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess?.();

    // Reset after delay
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        whatsapp: "",
        tipo: defaultType || "",
        mensaje: "",
      });
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className
      )}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="mt-4 font-serif text-xl">¡Mensaje enviado!</h3>
        <p className="mt-2 text-muted-foreground">
          Nos pondremos en contacto a la brevedad.
        </p>
      </div>
    );
  }

  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {/* Name Fields */}
      <div className={cn("grid gap-4", isCompact || isInline ? "grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1.5">
            Nombre *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div>
          <label htmlFor="apellido" className="block text-sm font-medium text-foreground mb-1.5">
            Apellido *
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Tu apellido"
            className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className={cn("grid gap-4", isCompact || isInline ? "grid-cols-2" : "sm:grid-cols-2")}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-1.5">
            WhatsApp
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+54 9 11 1234-5678"
              className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground -mt-2">
        * Completá al menos un método de contacto (email o WhatsApp)
      </p>

      {/* Consultation Type */}
      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-foreground mb-1.5">
          Tipo de consulta *
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className="w-full rounded-lg border bg-background py-2.5 px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          disabled={isSubmitting}
        >
          <option value="">Seleccioná una opción</option>
          {consultationTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-foreground mb-1.5">
          Mensaje *
        </label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribí tu consulta..."
            rows={isCompact ? 3 : 4}
            className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors",
          isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Enviar consulta
          </>
        )}
      </button>
    </form>
  );
}
