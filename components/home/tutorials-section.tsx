import Link from "next/link";
import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { tutorials } from "@/data/products";
import { cn } from "@/lib/utils";
import { Sparkle, SemiCircle, DotGrid, Swoosh, Sunburst } from "@/components/decorative/fun-shapes";

const categoryColors: Record<string, string> = {
  "Brush y Lettering": "bg-[#cc002d]",
  "Escolar y Coloreo": "bg-[#f20036]",
  "Artística y Manualidades": "bg-[#8a001f]",
  "Oficina y Uso General": "bg-[#111111]",
};

export function TutorialsSection() {
  const displayTutorials = tutorials.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Fun decorative shapes */}
      <div className="absolute right-10 top-16 opacity-10">
        <Sunburst className="w-20 h-20" color="#f20036" />
      </div>
      <div className="absolute left-20 top-1/3 opacity-8">
        <DotGrid className="w-16 h-16" color="#f20036" cols={3} rows={3} />
      </div>
      <div className="absolute right-1/4 bottom-10 opacity-10">
        <Sparkle className="w-14 h-14 rotate-12" color="#f20036" />
      </div>
      <div className="absolute -left-8 bottom-20 opacity-10">
        <SemiCircle className="w-28 h-14 rotate-90" color="#f20036" />
      </div>
      <div className="absolute left-1/2 top-8 opacity-8">
        <Swoosh className="w-24 h-12" color="#f20036" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl md:text-5xl">
              Tutoriales
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Aprendé nuevas técnicas con nuestros videos paso a paso
            </p>
          </div>
          <Link
            href="/tutoriales"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Ver todos los tutoriales
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayTutorials.map((tutorial) => (
            <a
              key={tutorial.id}
              href={tutorial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-7 w-7 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
                  <Clock className="h-3 w-3" />
                  {tutorial.duration}
                </div>

                {/* Category Badge */}
                <span
                  className={cn(
                    "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium text-white",
                    categoryColors[tutorial.category] || "bg-muted"
                  )}
                >
                  {tutorial.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {tutorial.title}
                </h3>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver tutorial
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
