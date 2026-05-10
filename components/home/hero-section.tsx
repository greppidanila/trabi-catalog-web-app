import Link from "next/link";
import Image from "next/image";
import { MarkerIllustration, PencilIllustration, BrushMarkerIllustration, CrayonIllustration } from "@/components/decorative/marker-elements";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_15_lab3-slider-bg-tuWihuBUQ9D7sbkGJ80GrfiO7ADuAp.jpg"
        alt="Niños coloreando con productos Trabi"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      
      {/* Soft Red Overlay - more transparent to show image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8b0022]/60 via-[#f20036]/40 to-[#8b0022]/60" />

      {/* Decorative Markers - Left Side */}
      <div className="hidden lg:block absolute left-4 xl:left-12 top-1/4 z-20 opacity-90">
        <div className="flex flex-col gap-4 -rotate-12">
          <MarkerIllustration className="h-48 drop-shadow-2xl" color="#f20036" />
          <PencilIllustration className="h-44 -ml-2 rotate-6 drop-shadow-2xl" color="#f59e0b" />
        </div>
      </div>

      {/* Decorative Markers - Right Side */}
      <div className="hidden lg:block absolute right-4 xl:right-12 top-1/3 z-20 opacity-90">
        <div className="flex flex-col gap-4 rotate-12">
          <BrushMarkerIllustration className="h-52 drop-shadow-2xl" color="#8b5cf6" />
          <CrayonIllustration className="h-32 ml-4 -rotate-6 drop-shadow-2xl" color="#22c55e" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-40 pb-32 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl tracking-wider text-white sm:text-6xl md:text-7xl lg:text-8xl text-balance">
          Marcá la diferencia
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl leading-relaxed">
          Descubrí nuestra línea completa de artículos escolares, de oficina, brush lettering y manualidades. Calidad e innovación desde 1906.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="/catalogo"
            className="w-full sm:w-auto rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105"
          >
            Ver Catálogo
          </Link>
          <Link
            href="/catalogo"
            className="w-full sm:w-auto rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary"
          >
            Armar mi Pedido
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-10 w-6 rounded-full border-2 border-white/50 p-1">
          <div className="h-2 w-1 rounded-full bg-white/80 mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
