import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CatalogContent } from "@/components/catalog/catalog-content";

export const metadata = {
  title: "Catálogo | Trabi",
  description: "Explorá nuestro catálogo completo de marcadores, lápices, artículos escolares y de oficina. Armá tu pedido y envialo por WhatsApp.",
};

export default function CatalogoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 sm:pt-32">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-10 w-48 bg-muted rounded-lg" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-lg bg-card">
              <div className="aspect-square bg-muted rounded-t-lg" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
