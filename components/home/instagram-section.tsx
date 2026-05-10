"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Heart, MessageCircle } from "lucide-react";
import { DotGrid, Sparkle } from "@/components/decorative/fun-shapes";

// Mock Instagram posts - in production these would come from Instagram API
const instagramPosts = [
  {
    id: "1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_3_banner-img-2-Uqgdtt1p8Wst3TApZM9iLhGgEceGsI.png",
    likes: 234,
    comments: 18,
    alt: "Art Brush Pastel colección",
  },
  {
    id: "2",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_4_banner-img-3-1cYTs8Cji068EKvEGYHjPDYaX5fDiU.png",
    likes: 512,
    comments: 42,
    alt: "Big Brush Classic set",
  },
  {
    id: "3",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_2_banner-img-1-n2I1boc4D2DYrCRGeQ3Ih4s9VOGqzk.png",
    likes: 189,
    comments: 15,
    alt: "Acrylic Pop en acción",
  },
  {
    id: "4",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_8_Acrylic-7JLvDVbau3nxGDas3hq5LqEf8FTkTr.jpg",
    likes: 387,
    comments: 29,
    alt: "Arte con marcadores acrílicos",
  },
  {
    id: "5",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_9_Big-Brush-ARWGdSCG7r5cdcfIaJa3K2jdnTp6iH.jpg",
    likes: 445,
    comments: 33,
    alt: "Lettering con Big Brush",
  },
  {
    id: "6",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_7_Difumio-uDHO34ErmHQvZaedXc0z0fiUEM7DCX.jpg",
    likes: 298,
    comments: 21,
    alt: "Difumios coloring kit",
  },
];

export function InstagramSection() {
  return (
    <section className="py-16 sm:py-24 bg-card relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute right-8 top-12 opacity-8">
        <DotGrid className="w-16 h-16" color="#f20036" cols={3} rows={3} />
      </div>
      <div className="absolute left-12 bottom-16 opacity-10">
        <Sparkle className="w-10 h-10" color="#f20036" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#f20036] to-[#cc002d] px-4 py-2 mb-4">
            <Instagram className="h-5 w-5 text-white" />
            <span className="text-sm font-semibold text-white">@trabi.ar</span>
          </div>
          <h2 className="font-serif text-3xl tracking-wide text-foreground sm:text-4xl">
            Seguinos en Instagram
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Inspirate con las creaciones de nuestra comunidad y compartí tus obras con #TrabiArt
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href="https://www.instagram.com/trabi.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 text-white">
                  <Heart className="h-5 w-5 fill-white" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <MessageCircle className="h-5 w-5 fill-white" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="https://www.instagram.com/trabi.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-6 py-3 font-semibold text-foreground transition-all hover:bg-foreground hover:text-white"
          >
            <Instagram className="h-5 w-5" />
            Ver más en Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
