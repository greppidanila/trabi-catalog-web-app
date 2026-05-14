"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  colors?: string[];
}

export function ProductGallery({ images, productName, colors }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // If no images array, create one from the main image or use placeholder
  const galleryImages = images.length > 0 ? images : [];

  if (galleryImages.length === 0) {
    return (
      <div
        className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
        style={{
          background: colors
            ? `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 100%)`
            : "#e5e5e5",
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-serif text-8xl text-white/80">T</span>
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setIsZoomed(false);
  };

  return (
    <>
      <div className="space-y-4" onKeyDown={handleKeyDown} tabIndex={0}>
        {/* Main Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted group">
          <Image
            src={galleryImages[currentIndex]}
            alt={`${productName} - Imagen ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* Zoom Button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            aria-label="Ampliar imagen"
          >
            <ZoomIn className="h-5 w-5" />
          </button>

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all",
                  currentIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                )}
                aria-label={`Ver imagen ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              >
                <Image
                  src={image}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox/Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setIsZoomed(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Zoomed Image */}
          <div
            className="relative h-[80vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentIndex]}
              alt={`${productName} - Imagen ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Thumbnail Strip at Bottom */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-black/50 p-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    currentIndex === index
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`Ver imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
