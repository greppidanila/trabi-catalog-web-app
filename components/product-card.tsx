"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Product, categories } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  view?: "grid" | "list";
};

export function ProductCard({ product, view = "grid" }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const { addItem } = useCart();
  const categoryInfo = categories.find((c) => c.name === product.category);

  const handleAddToCart = () => {
    addItem(product, selectedVariant);
  };

  if (view === "list") {
    return (
      <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{
                backgroundColor: product.colors?.[0] || "#e5e5e5",
              }}
            >
              <span className="text-2xl text-white/80">T</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium text-white",
                categoryInfo?.color || "bg-muted"
              )}
            >
              {product.category}
            </span>
          </div>
          <p className="mt-1 font-mono text-sm text-muted-foreground">{product.code}</p>
          <h3 className="font-semibold truncate">{product.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
            aria-label="Seleccionar variante"
          >
            {product.variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToCart}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary/90"
            aria-label="Agregar al pedido"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background: product.colors
                ? `linear-gradient(135deg, ${product.colors[0]} 0%, ${product.colors[1] || product.colors[0]} 100%)`
                : "#e5e5e5",
            }}
          >
            <span className="font-serif text-4xl text-white/80">T</span>
          </div>
        )}
        {/* Category Badge */}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white",
            categoryInfo?.color || "bg-muted"
          )}
        >
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-mono text-xs text-muted-foreground">{product.code}</p>
        <h3 className="mt-1 font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.colors.slice(0, 6).map((color, index) => (
              <span
                key={index}
                className="h-4 w-4 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
                aria-label={`Color ${index + 1}`}
              />
            ))}
            {product.colors.length > 6 && (
              <span className="flex h-4 items-center text-xs text-muted-foreground">
                +{product.colors.length - 6}
              </span>
            )}
          </div>
        )}

        {/* Variants */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                selectedVariant === variant
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-background hover:border-primary hover:text-primary"
              )}
            >
              {variant}
            </button>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Agregar al pedido
        </button>
      </div>
    </div>
  );
}
