"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Starburst, DotGrid, Ring, Sparkle, SemiCircle } from "@/components/decorative/fun-shapes";

export function FeaturedSection() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-card relative overflow-hidden">
      {/* Fun decorative shapes */}
      <div className="absolute -left-6 top-20 opacity-10">
        <DotGrid className="w-24 h-24" color="#f20036" cols={4} rows={4} />
      </div>
      <div className="absolute right-10 top-10 opacity-15">
        <Starburst className="w-20 h-20" color="#f20036" />
      </div>
      <div className="absolute left-1/4 bottom-10 opacity-10">
        <Ring className="w-16 h-16" color="#f20036" strokeWidth={4} />
      </div>
      <div className="absolute right-1/4 bottom-20 opacity-10">
        <Sparkle className="w-12 h-12" color="#f20036" />
      </div>
      <div className="absolute -right-8 top-1/2 opacity-10">
        <SemiCircle className="w-32 h-16 -rotate-90" color="#f20036" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl md:text-5xl">
              Productos Destacados
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Los favoritos de nuestros clientes
            </p>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Ver todos los productos
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
