"use client";

import { ShoppingBag, X, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function FloatingCart() {
  const { items, totalItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem } = useCart();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";
    
    const itemsList = items
      .map(
        (item) =>
          `• ${item.product.code} ${item.product.name} ${item.variant} (x${item.quantity} unidades)`
      )
      .join("%0A");
    
    return `https://wa.me/5491100000000?text=Hola! Quiero hacer un pedido:%0A${itemsList}`;
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 active:scale-95",
          isCartOpen && "hidden"
        )}
        aria-label="Abrir carrito"
      >
        <ShoppingBag className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-white">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Panel Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsCartOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Cart Panel */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-out",
          "rounded-t-2xl md:bottom-6 md:right-6 md:rounded-2xl md:max-h-[80vh]",
          isCartOpen ? "translate-y-0" : "translate-y-full md:translate-y-[calc(100%+100px)]"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <h2 className="font-serif text-xl tracking-wide">Tu Pedido</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-2 hover:bg-muted transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[50vh] overflow-y-auto p-4 md:max-h-[60vh]">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">Tu pedido está vacío</p>
              <Link
                href="/catalogo"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 inline-block text-primary font-medium hover:underline"
              >
                Explorá el catálogo
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.variant}`}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.product.code}
                    </p>
                    <p className="font-medium truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">{item.variant}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.variant, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-muted transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.variant, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border hover:bg-muted transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.variant)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4">
            <a
              href={generateWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#128C7E]"
            >
              <MessageCircle className="h-5 w-5" />
              Enviar pedido por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  );
}
