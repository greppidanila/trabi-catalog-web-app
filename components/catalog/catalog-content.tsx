"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  Grid3X3, 
  List, 
  TrendingUp,
  Filter
} from "lucide-react";
import { products, categories, subcategories, Category } from "@/data/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "newest" | "oldest" | "name-asc" | "name-desc";

// Popular search suggestions
const popularSearches = [
  "marcadores brush",
  "acrylic",
  "pastel",
  "pizarra",
  "escolar",
];

export function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "Todos">("Todos");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  // Feature filters
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
    const buscar = searchParams.get("buscar");
    if (buscar) {
      setSearchQuery(buscar);
    }
  }, [searchParams]);

  // Search suggestions based on current query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    
    // Find matching products
    const matchingProducts = products
      .filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.subcategory.toLowerCase().includes(query)
      )
      .slice(0, 5);
    
    return matchingProducts;
  }, [searchQuery]);

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
          p.description.toLowerCase().includes(query) ||
          p.tags?.some(tag => tag.toLowerCase().includes(query))
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

    // Feature filters
    if (showNew) result = result.filter((p) => p.isNew);
    if (showEco) result = result.filter((p) => p.isEco);
    if (showFeatured) result = result.filter((p) => p.featured);
    if (showWashable) result = result.filter((p) => p.specs?.washable);
    if (showRefillable) result = result.filter((p) => p.specs?.refillable);

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
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSubcategories, sortBy, showNew, showEco, showFeatured, showWashable, showRefillable]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    searchInputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchFocused(false);
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
    (showNew ? 1 : 0) +
    (showEco ? 1 : 0) +
    (showFeatured ? 1 : 0) +
    (showWashable ? 1 : 0) +
    (showRefillable ? 1 : 0);

  const FilterSidebar = () => (
    <div className="space-y-4">
      {/* Subcategory Filter - Only when category selected */}
      {selectedCategory !== "Todos" && availableSubcategories.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Subcategoria</h3>
          <div className="space-y-0.5 max-h-40 overflow-y-auto">
            {availableSubcategories.map((sub) => (
              <label key={sub} className="flex items-start gap-2 cursor-pointer px-2 py-1.5 rounded hover:bg-muted transition-colors">
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => handleSubcategoryToggle(sub)}
                  className="h-3.5 w-3.5 mt-0.5 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-xs leading-tight">{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Filtros</h3>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setShowNew(!showNew)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              showNew
                ? "bg-[#f20036] text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Nuevos
          </button>
          <button
            onClick={() => setShowFeatured(!showFeatured)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              showFeatured
                ? "bg-amber-500 text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Destacados
          </button>
          <button
            onClick={() => setShowEco(!showEco)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              showEco
                ? "bg-emerald-600 text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Eco
          </button>
          <button
            onClick={() => setShowWashable(!showWashable)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              showWashable
                ? "bg-sky-500 text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Lavables
          </button>
          <button
            onClick={() => setShowRefillable(!showRefillable)}
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium transition-colors",
              showRefillable
                ? "bg-violet-600 text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Recargables
          </button>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Ordenar</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-lg border bg-background px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="featured">Destacados</option>
          <option value="newest">Recientes</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border border-dashed px-3 py-2 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          Limpiar filtros ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      {/* Compact Header with Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <h1 className="font-serif text-2xl tracking-wide text-foreground sm:text-3xl">
          Catalogo
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <div className={cn(
            "relative rounded-full border bg-card transition-all",
            isSearchFocused ? "border-primary ring-2 ring-primary/20" : "border-border"
          )}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full rounded-full bg-transparent pl-9 pr-9 py-2 text-sm focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Limpiar busqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border bg-card shadow-lg z-50 overflow-hidden">
              {searchQuery.length >= 2 && searchSuggestions.length > 0 ? (
                <div className="py-1">
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(product.name);
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Search className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm truncate">{product.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-1">
                  <p className="px-3 py-1 text-xs text-muted-foreground">Busquedas populares</p>
                  {popularSearches.slice(0, 3).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSuggestionClick(term)}
                      className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted transition-colors text-left"
                    >
                      <TrendingUp className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{term}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Category Pills + Results Count - Same Line */}
      <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
          <button
            onClick={() => handleCategoryChange("Todos")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
              selectedCategory === "Todos"
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                selectedCategory === cat.name
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Controls Bar - Compact */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className={cn(
              "flex lg:hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeFiltersCount > 0 ? "border-primary text-primary bg-primary/5" : "bg-card"
            )}
          >
            <Filter className="h-4 w-4" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Active Filter Chips */}
          <div className="hidden sm:flex flex-wrap items-center gap-2">
            {selectedSubcategories.map((sub) => (
              <span
                key={sub}
                className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium"
              >
                <span className="truncate max-w-[120px]">{sub}</span>
                <button
                  onClick={() => handleSubcategoryToggle(sub)}
                  className="ml-0.5 text-muted-foreground hover:text-foreground"
                  aria-label={`Quitar filtro ${sub}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {(showNew || showEco || showFeatured || showWashable || showRefillable) && (
              <>
                {showNew && (
                  <span className="flex items-center gap-1 rounded-full bg-[#f20036]/10 text-[#f20036] px-3 py-1 text-xs font-medium">
                    Nuevos
                    <button onClick={() => setShowNew(false)} className="ml-0.5"><X className="h-3 w-3" /></button>
                  </span>
                )}
                {showFeatured && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 text-amber-600 px-3 py-1 text-xs font-medium">
                    Destacados
                    <button onClick={() => setShowFeatured(false)} className="ml-0.5"><X className="h-3 w-3" /></button>
                  </span>
                )}
                {showEco && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-3 py-1 text-xs font-medium">
                    Eco
                    <button onClick={() => setShowEco(false)} className="ml-0.5"><X className="h-3 w-3" /></button>
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown - Desktop */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="hidden sm:block rounded-lg border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="featured">Destacados</option>
            <option value="newest">Mas recientes</option>
            <option value="name-asc">Nombre A-Z</option>
          </select>

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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24 rounded-xl border bg-card p-4">
            <FilterSidebar />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-xl mb-2">No encontramos productos</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                No hay productos que coincidan con tu busqueda. 
                Proba con otros terminos o limpia los filtros.
              </p>
              <button
                onClick={clearFilters}
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

          {/* Results summary at bottom */}
          {filteredProducts.length > 0 && (
            <div className="mt-8 text-center text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} de {products.length} productos
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
          <div className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-card shadow-xl lg:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-serif text-xl">Filtros</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Cerrar filtros"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterSidebar />
            </div>
            <div className="p-4 border-t bg-card">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full rounded-full bg-primary px-4 py-3 font-semibold text-white"
              >
                Ver {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
