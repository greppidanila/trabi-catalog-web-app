"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import { products, categories, subcategories, Category } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "newest" | "oldest";

export function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "Todos">("Todos");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // New filters
  const [showNew, setShowNew] = useState(false);
  const [showEco, setShowEco] = useState(false);
  const [showFeatured, setShowFeatured] = useState(false);
  const [showWashable, setShowWashable] = useState(false);
  const [showRefillable, setShowRefillable] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const categoria = searchParams.get("categoria");
    if (categoria && categories.some((c) => c.name === categoria)) {
      setSelectedCategory(categoria as Category);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.code.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "Todos") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Subcategory filter
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory));
    }

    // New filter
    if (showNew) {
      result = result.filter((p) => p.isNew);
    }

    // Eco filter
    if (showEco) {
      result = result.filter((p) => p.isEco);
    }

    // Featured filter
    if (showFeatured) {
      result = result.filter((p) => p.featured);
    }

    // Washable filter
    if (showWashable) {
      result = result.filter((p) => p.specs?.washable);
    }

    // Refillable filter
    if (showRefillable) {
      result = result.filter((p) => p.specs?.refillable);
    }

    // Sort
    switch (sortBy) {
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case "newest":
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "oldest":
        result.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategories, sortBy]);

  // Get available subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "Todos") {
      return Object.values(subcategories).flat();
    }
    return subcategories[selectedCategory] || [];
  }, [selectedCategory]);

  // Handlers
  const handleCategoryChange = (category: Category | "Todos") => {
    setSelectedCategory(category);
    setSelectedSubcategories([]);
    if (category === "Todos") {
      router.push("/catalogo", { scroll: false });
    } else {
      router.push(`/catalogo?categoria=${encodeURIComponent(category)}`, { scroll: false });
    }
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Todos");
    setSelectedSubcategories([]);
    setSortBy("featured");
    setShowNew(false);
    setShowEco(false);
    setShowFeatured(false);
    setShowWashable(false);
    setShowRefillable(false);
    router.push("/catalogo", { scroll: false });
  };

  const activeFiltersCount =
    (selectedCategory !== "Todos" ? 1 : 0) +
    selectedSubcategories.length +
    (searchQuery ? 1 : 0) +
    (showNew ? 1 : 0) +
    (showEco ? 1 : 0) +
    (showFeatured ? 1 : 0) +
    (showWashable ? 1 : 0) +
    (showRefillable ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Categoría</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "Todos"}
              onChange={() => handleCategoryChange("Todos")}
              className="h-4 w-4 text-primary border-border focus:ring-primary"
            />
            <span className="text-sm">Todos</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.name} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.name}
                onChange={() => handleCategoryChange(cat.name)}
                className="h-4 w-4 text-primary border-border focus:ring-primary"
              />
              <span
                className={cn(
                  "h-3 w-3 rounded-full",
                  cat.color
                )}
              />
              <span className="text-sm">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory !== "Todos" && availableSubcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Subcategoría</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {availableSubcategories.map((sub) => (
              <label key={sub} className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => handleSubcategoryToggle(sub)}
                  className="h-4 w-4 mt-0.5 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm leading-tight">{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Highlights Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Destacados</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showNew}
              onChange={(e) => setShowNew(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#f20036]" />
              Nuevos
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showFeatured}
              onChange={(e) => setShowFeatured(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm">Solo destacados</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEco}
              onChange={(e) => setShowEco(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Ecológicos
            </span>
          </label>
        </div>
      </div>

      {/* Features Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Características</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showWashable}
              onChange={(e) => setShowWashable(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm">Lavables</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showRefillable}
              onChange={(e) => setShowRefillable(e.target.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm">Recargables</span>
          </label>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Ordenar por</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="featured">Destacados</option>
          <option value="newest">Más recientes</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl">
          Catálogo
        </h1>
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o subcategoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border bg-card pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters & Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex lg:hidden items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* View Toggle */}
        <div className="flex items-center gap-1 rounded-full border bg-card p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Vista de grilla"
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Vista de lista"
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        {/* Active Filter Chips */}
        {selectedCategory !== "Todos" && (
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-sm text-primary">
            {selectedCategory}
            <button
              onClick={() => handleCategoryChange("Todos")}
              className="ml-1 hover:text-primary/70"
              aria-label="Quitar filtro de categoría"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        )}
        {selectedSubcategories.map((sub) => (
          <span
            key={sub}
            className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm"
          >
            <span className="truncate max-w-[150px]">{sub}</span>
            <button
              onClick={() => handleSubcategoryToggle(sub)}
              className="ml-1 text-muted-foreground hover:text-foreground"
              aria-label={`Quitar filtro ${sub}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}

        {/* Results Count */}
        <span className="ml-auto text-sm text-muted-foreground">
          Mostrando {filteredProducts.length} productos
        </span>
      </div>

      {/* Main Content */}
      <div className="mt-8 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 rounded-xl border bg-card p-5">
            <FilterSidebar />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">No se encontraron productos</h3>
              <p className="mt-2 text-muted-foreground">
                Probá ajustando los filtros o buscando otra cosa
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} view="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} view="list" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-card p-6 shadow-xl lg:hidden overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl">Filtros</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Cerrar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-6 w-full rounded-full bg-primary px-4 py-3 font-semibold text-white"
            >
              Ver {filteredProducts.length} productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}
