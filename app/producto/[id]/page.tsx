"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check, 
  Droplets, 
  Recycle, 
  Sparkles,
  ChevronRight 
} from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";

import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  const { isLibrero } = useAuth();
  
  const product = products.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-20 sm:pt-32">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h1 className="font-serif text-3xl">Producto no encontrado</h1>
            <p className="mt-4 text-muted-foreground">
              El producto que buscas no existe o fue eliminado.
            </p>
            <Link
              href="/catalogo"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const categoryInfo = categories.find((c) => c.name === product.category);

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedVariant);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/catalogo" className="hover:text-foreground">
              Catálogo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
              className="hover:text-foreground"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
          </nav>

          {/* Product Detail - Desktop: Two columns with sticky image */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            {/* Image - Sticky on desktop */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
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
                    <span className="font-serif text-8xl text-white/80">T</span>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-sm font-medium text-white",
                      categoryInfo?.color || "bg-muted"
                    )}
                  >
                    {product.category}
                  </span>
                  {product.isNew && (
                    <span className="rounded-full bg-[#f20036] px-3 py-1 text-sm font-medium text-white">
                      Nuevo
                    </span>
                  )}
                  {product.isEco && (
                    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white flex items-center gap-1">
                      <Recycle className="h-3 w-3" />
                      Eco
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info - Scrollable content on right */}
            <div className="mt-8 lg:mt-0 flex flex-col">
              <p className="font-mono text-sm text-muted-foreground">{product.code}</p>
              <h1 className="mt-2 font-serif text-3xl tracking-wide text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Colores disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="h-8 w-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color }}
                        title={`Color ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Variants */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Presentación
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                        selectedVariant === variant
                          ? "border-primary bg-primary text-white"
                          : "border-border bg-card hover:border-primary hover:text-primary"
                      )}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart - Only for Libreros */}
              {isLibrero && (
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Cantidad:</span>
                    <div className="flex items-center rounded-full border bg-card">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-l-full text-muted-foreground hover:text-foreground"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-10 w-10 items-center justify-center rounded-r-full text-muted-foreground hover:text-foreground"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white transition-all",
                      addedToCart 
                        ? "bg-emerald-600" 
                        : "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="h-5 w-5" />
                        Agregado al pedido
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5" />
                        Agregar al pedido
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Technical Specs */}
              {product.specs && (
                <div className="mt-10 rounded-xl border bg-card p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Ficha Técnica
                  </h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {product.specs.tipType && (
                      <div className="flex justify-between sm:block">
                        <dt className="text-sm text-muted-foreground">Tipo de punta</dt>
                        <dd className="text-sm font-medium">{product.specs.tipType}</dd>
                      </div>
                    )}
                    {product.specs.tipSize && (
                      <div className="flex justify-between sm:block">
                        <dt className="text-sm text-muted-foreground">Tamaño de punta</dt>
                        <dd className="text-sm font-medium">{product.specs.tipSize}</dd>
                      </div>
                    )}
                    {product.specs.inkType && (
                      <div className="flex justify-between sm:block">
                        <dt className="text-sm text-muted-foreground">Tipo de tinta</dt>
                        <dd className="text-sm font-medium">{product.specs.inkType}</dd>
                      </div>
                    )}
                    {product.specs.material && (
                      <div className="flex justify-between sm:block">
                        <dt className="text-sm text-muted-foreground">Material</dt>
                        <dd className="text-sm font-medium">{product.specs.material}</dd>
                      </div>
                    )}
                    {product.specs.surface && (
                      <div className="flex justify-between sm:block sm:col-span-2">
                        <dt className="text-sm text-muted-foreground">Superficie recomendada</dt>
                        <dd className="text-sm font-medium">{product.specs.surface}</dd>
                      </div>
                    )}
                  </dl>
                  
                  {/* Features */}
                  <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t">
                    {product.specs.washable && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        <Droplets className="h-3 w-3" />
                        Lavable
                      </span>
                    )}
                    {product.specs.refillable && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        <Recycle className="h-3 w-3" />
                        Recargable
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Institutional Info Section */}
              <div className="mt-10 rounded-xl border bg-gradient-to-br from-primary/5 to-transparent p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Sobre Trabi
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todos nuestros productos están desarrollados con los más altos estándares de calidad, 
                  pensados especialmente para el uso escolar, artístico y profesional. 
                  Fabricados en Argentina con materiales seguros y no tóxicos.
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    No tóxico
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Fabricación argentina
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Calidad certificada
                  </span>
                </div>
              </div>

                          </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl tracking-wide text-foreground sm:text-3xl">
                  Productos Relacionados
                </h2>
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Ver más
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
