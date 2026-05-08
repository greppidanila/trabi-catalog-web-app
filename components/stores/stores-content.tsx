"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { stores, provincias, zonas, Store, WHATSAPP_URL } from "@/data/stores";
import { Search, MapPin, MessageCircle, List, Map as MapIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Dynamic import for the map component (client-only)
const StoreMap = dynamic(
  () => import("./store-map").then((mod) => mod.StoreMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    ),
  }
);

export function StoresContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvincia, setSelectedProvincia] = useState("");
  const [selectedZona, setSelectedZona] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [showFilters, setShowFilters] = useState(false);

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch =
        searchQuery === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvincia =
        selectedProvincia === "" || store.provincia === selectedProvincia;

      const matchesZona =
        selectedZona === "" || store.zona === selectedZona;

      return matchesSearch && matchesProvincia && matchesZona;
    });
  }, [searchQuery, selectedProvincia, selectedZona]);

  const handleWhatsAppClick = (store: Store) => {
    const message = encodeURIComponent(
      `Hola! Quiero información sobre productos Trabi. Estoy cerca de ${store.name} (${store.address}).`
    );
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedProvincia("");
    setSelectedZona("");
  };

  const hasActiveFilters = searchQuery || selectedProvincia || selectedZona;

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-card rounded-xl shadow-sm border p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and View Toggle Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o dirección..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Toggle and Filter Button */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="sm:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-none px-3",
                      viewMode === "map" && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    )}
                    onClick={() => setViewMode("map")}
                  >
                    <MapIcon className="h-4 w-4 mr-1.5" />
                    Mapa
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-none px-3",
                      viewMode === "list" && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    )}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4 mr-1.5" />
                    Lista
                  </Button>
                </div>
              </div>
            </div>

            {/* Dropdown Filters */}
            <div className={cn(
              "flex flex-col sm:flex-row gap-4",
              !showFilters && "hidden sm:flex"
            )}>
              <Select value={selectedZona} onValueChange={setSelectedZona}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por zona" />
                </SelectTrigger>
                <SelectContent>
                  {zonas.map((zona) => (
                    <SelectItem key={zona.value || "all"} value={zona.value || "all"}>
                      {zona.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedProvincia} onValueChange={setSelectedProvincia}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Filtrar por provincia" />
                </SelectTrigger>
                <SelectContent>
                  {provincias.map((provincia) => (
                    <SelectItem key={provincia.value || "all"} value={provincia.value || "all"}>
                      {provincia.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Limpiar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredStores.length === 0 ? (
                "No se encontraron puntos de venta"
              ) : filteredStores.length === 1 ? (
                "1 punto de venta encontrado"
              ) : (
                `${filteredStores.length} puntos de venta encontrados`
              )}
            </p>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedZona && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {selectedZona}
                  </span>
                )}
                {selectedProvincia && (
                  <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {selectedProvincia}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Map or List View */}
        {viewMode === "map" ? (
          <div className="bg-card rounded-xl shadow-sm border overflow-hidden h-[500px] sm:h-[600px]">
            <StoreMap stores={filteredStores} />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStores.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground mb-4">
                  Probá con otros filtros o términos de búsqueda.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-card rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {store.name}
                      </h3>
                      <span className="inline-block text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full mt-1">
                        {store.zona}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-start gap-2 mb-4">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                    {store.address}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
                    onClick={() => handleWhatsAppClick(store)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Consultar por WhatsApp
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
