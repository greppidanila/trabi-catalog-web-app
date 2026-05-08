import Image from "next/image";
import { Play, Clock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { tutorials } from "@/data/products";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tutoriales | Trabi",
  description: "Aprendé nuevas técnicas de lettering, acuarelas, acrílicos y más con nuestros tutoriales paso a paso.",
};

const categoryColors: Record<string, string> = {
  "Brush y Lettering": "bg-[#cc002d]",
  "Escolar y Coloreo": "bg-[#f20036]",
  "Artística y Manualidades": "bg-[#8a001f]",
  "Oficina y Uso General": "bg-[#111111]",
};

export default function TutorialesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl md:text-5xl">
              Tutoriales
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Aprendé nuevas técnicas y sacale el máximo provecho a tus productos Trabi con nuestros videos paso a paso
            </p>
          </div>

          {/* Featured Tutorial */}
          <div className="mt-12">
            <a
              href={tutorials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-card shadow-lg"
            >
              <div className="relative aspect-video md:aspect-[21/9] overflow-hidden">
                <Image
                  src={tutorials[0].thumbnail}
                  alt={tutorials[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition-transform group-hover:scale-110">
                    <Play className="h-9 w-9 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-sm font-medium text-white",
                      categoryColors[tutorials[0].category] || "bg-muted"
                    )}
                  >
                    {tutorials[0].category}
                  </span>
                  <h2 className="mt-3 font-serif text-2xl text-white md:text-4xl tracking-wide">
                    {tutorials[0].title}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{tutorials[0].duration}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Tutorial Grid */}
          <div className="mt-12">
            <h2 className="font-serif text-2xl tracking-wide text-foreground mb-6">
              Todos los tutoriales
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tutorials.map((tutorial) => (
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
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110">
                        <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
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

          {/* CTA Section */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary to-[#8b0022] p-8 md:p-12 text-center text-white">
            <h2 className="font-serif text-2xl tracking-wide md:text-3xl">
              ¿Querés ver tus creaciones en nuestros tutoriales?
            </h2>
            <p className="mt-4 text-white/90 max-w-2xl mx-auto">
              Compartí tus obras en Instagram o TikTok usando #TrabiArt y podrías aparecer en nuestros próximos videos
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://instagram.com/trabi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 font-semibold text-primary transition-transform hover:scale-105"
              >
                Seguinos en Instagram
              </a>
              <a
                href="https://tiktok.com/@trabi"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                Seguinos en TikTok
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
