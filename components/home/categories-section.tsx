import Link from "next/link";
import Image from "next/image";
import { Briefcase, Pencil, PenTool, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Star4Point, Squiggle, DotGrid, Ring, Cross } from "@/components/decorative/fun-shapes";

const categoryCards = [
  {
    name: "Oficina y Uso General",
    slug: "oficina-y-uso-general",
    description: "Marcadores, resaltadores, bolígrafos y más para tu espacio de trabajo.",
    icon: Briefcase,
    color: "bg-[#111111]",
    hoverColor: "group-hover:bg-[#333333]",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_5_banner-img-4-mWRMayvSaST44igkdtzBEGJkz5Ch4d.png",
  },
  {
    name: "Escolar y Coloreo",
    slug: "escolar-y-coloreo",
    description: "Todo lo que necesitan los más pequeños para aprender y crear.",
    icon: Pencil,
    color: "bg-[#f20036]",
    hoverColor: "group-hover:bg-[#d90030]",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_7_Difumio-uDHO34ErmHQvZaedXc0z0fiUEM7DCX.jpg",
  },
  {
    name: "Brush y Lettering",
    slug: "brush-y-lettering",
    description: "Marcadores punta pincel para lettering, caligrafía y arte.",
    icon: PenTool,
    color: "bg-[#cc002d]",
    hoverColor: "group-hover:bg-[#a80025]",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_3_banner-img-2-Uqgdtt1p8Wst3TApZM9iLhGgEceGsI.png",
  },
  {
    name: "Artística y Manualidades",
    slug: "artistica-y-manualidades",
    description: "Acrílicos, glitter y materiales para proyectos creativos.",
    icon: Palette,
    color: "bg-[#8a001f]",
    hoverColor: "group-hover:bg-[#6b0018]",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_8_Acrylic-7JLvDVbau3nxGDas3hq5LqEf8FTkTr.jpg",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Fun decorative shapes */}
      <div className="absolute left-10 top-10 opacity-10">
        <Star4Point className="w-16 h-16 rotate-12" color="#f20036" />
      </div>
      <div className="absolute right-20 top-20 opacity-8">
        <DotGrid className="w-20 h-20" color="#f20036" cols={3} rows={3} />
      </div>
      <div className="absolute left-1/3 bottom-8 opacity-10">
        <Squiggle className="w-32 h-10" color="#f20036" />
      </div>
      <div className="absolute right-10 bottom-16 opacity-10">
        <Ring className="w-14 h-14" color="#f20036" strokeWidth={4} />
      </div>
      <div className="absolute -left-4 top-1/2 opacity-8">
        <Cross className="w-10 h-10 rotate-45" color="#f20036" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl md:text-5xl">
            Nuestras Categorías
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explorá nuestra amplia variedad de productos diseñados para cada necesidad
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryCards.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/catalogo?categoria=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div
                    className={cn(
                      "absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors",
                      category.color,
                      category.hoverColor
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                    Ver productos
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
