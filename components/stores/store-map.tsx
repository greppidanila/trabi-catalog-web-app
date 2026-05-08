"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Store, WHATSAPP_URL } from "@/data/stores";
import { MessageCircle, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Next.js
const createIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: #f20036;
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Component to fit bounds when stores change
function FitBounds({ stores }: { stores: Store[] }) {
  const map = useMap();

  useEffect(() => {
    if (stores.length === 0) {
      // Default view of Argentina
      map.setView([-38.4161, -63.6167], 4);
      return;
    }

    if (stores.length === 1) {
      map.setView([stores[0].lat, stores[0].lng], 14);
      return;
    }

    const bounds = L.latLngBounds(stores.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  }, [stores, map]);

  return null;
}

interface StoreMapProps {
  stores: Store[];
}

export function StoreMap({ stores }: StoreMapProps) {
  const icon = createIcon();

  const handleWhatsAppClick = (store: Store) => {
    const message = encodeURIComponent(
      `Hola! Quiero información sobre productos Trabi. Estoy cerca de ${store.name} (${store.address}).`
    );
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  return (
    <MapContainer
      center={[-38.4161, -63.6167]}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds stores={stores} />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.lat, store.lng]} icon={icon}>
          <Popup>
            <div className="min-w-[200px] p-1">
              <h3 className="font-bold text-foreground text-sm mb-1">
                {store.name}
              </h3>
              <p className="text-xs text-muted-foreground flex items-start gap-1 mb-3">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                {store.address}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs h-8"
                  onClick={() => handleWhatsAppClick(store)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  WhatsApp
                </Button>
                {store.googleMapsUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8"
                    onClick={() => window.open(store.googleMapsUrl, "_blank")}
                  >
                    <Navigation className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
