"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";

export function FeaturedSection() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
