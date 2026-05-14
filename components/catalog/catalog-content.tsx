"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Sparkles,
  TrendingUp,
  Clock,
  Tag,
  ChevronRight,
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
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Tag className="h-4 w-4" />
          Categoria
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange("Todos")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
              selectedCategory === "Todos"
                ? "bg-primary text-white font-medium"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-amber-500" />
            Todos los productos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                selectedCategory === cat.name
                  ? "bg-primary text-white font-medium"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <span className={cn("h-2.5 w-2.5 rounded-full", cat.color)} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Filter */}
      {selectedCategory !== "Todos" && availableSubcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-foreground mb-3">Subcategoria</h3>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
            {availableSubcategories.map((sub) => (
              <label key={sub} className="flex items-start gap-2 cursor-pointer px-1 py-1.5 rounded hover:bg-muted transition-colors">
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

      {/* Quick Filters */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Filtros rapidos
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowNew(!showNew)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              showNew
                ? "bg-[#f20036] text-white border-[#f20036]"
                : "border-border hover:border-[#f20036] hover:text-[#f20036]"
            )}
          >
            Nuevos
          </button>
          <button
            onClick={() => setShowFeatured(!showFeatured)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              showFeatured
                ? "bg-amber-500 text-white border-amber-500"
                : "border-border hover:border-amber-500 hover:text-amber-600"
            )}
          >
            Destacados
          </button>
          <button
            onClick={() => setShowEco(!showEco)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              showEco
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-border hover:border-emerald-600 hover:text-emerald-600"
            )}
          >
            Eco
          </button>
          <button
            onClick={() => setShowWashable(!showWashable)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              showWashable
                ? "bg-sky-500 text-white border-sky-500"
                : "border-border hover:border-sky-500 hover:text-sky-600"
            )}
          >
            Lavables
          </button>
          <button
            onClick={() => setShowRefillable(!showRefillable)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
              showRefillable
                ? "bg-violet-600 text-white border-violet-600"
                : "border-border hover:border-violet-600 hover:text-violet-600"
            )}
          >
            Recargables
          </button>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Ordenar por
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="featured">Destacados primero</option>
          <option value="newest">Mas recientes</option>
          <option value="oldest">Mas antiguos</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
        </select>
      </div>

      {/* Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full rounded-lg border-2 border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          Limpiar {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Hero Search Section */}
      <div className="relative mb-8">
        <div className="text-center mb-6">
          <h1 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl lg:text-5xl">
            Catalogo de Productos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Encuentra el producto ideal para tu creatividad
          </p>
        </div>

        {/* Search Bar - Prominent */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
          <div className={cn(
            "relative rounded-2xl border-2 bg-card shadow-sm transition-all",
            isSearchFocused ? "border-primary shadow-lg shadow-primary/10" : "border-transparent"
          )}>
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar marcadores, lapices, acrylic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full rounded-2xl bg-transparent pl-12 pr-12 py-4 text-base focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
                aria-label="Limpiar busqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border bg-card shadow-xl z-50 overflow-hidden">
              {searchQuery.length >= 2 && searchSuggestions.length > 0 ? (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Productos sugeridos
                  </p>
                  {searchSuggestions.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setSearchQuery(product.name);
                        setIsSearchFocused(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{product.subcategory}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="h-3 w-3" />
                    Busquedas populares
                  </p>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSuggestionClick(term)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{term}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Category Pills - Horizontal Scroll */}
      <div className="mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-2 min-w-max">
          <button
            onClick={() => handleCategoryChange("Todos")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
              selectedCategory === "Todos"
                ? "bg-primary text-white shadow-md"
                : "bg-card border hover:border-primary hover:text-primary"
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2",
                selectedCategory === cat.name
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border hover:border-primary hover:text-primary"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", cat.color)} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b">
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

        <div className="flex items-center gap-3">
          {/* Results Count */}
          <span className="text-sm text-muted-foreground hidden sm:block">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
          </span>

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
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28 rounded-2xl border bg-card p-5">
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
