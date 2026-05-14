"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, Store } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/tutoriales", label: "Tutoriales" },
  { href: "/puntos-de-venta", label: "Puntos de Venta" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const { user, isLibrero, logout, setShowLoginModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBackground = hasScrolled || !isHomepage;

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        "top-0 sm:top-[52px]", // Account for prototype banner
        showBackground ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imgi_1_logo-trabi-AY0MftpeCUEAMhnMXcBHhATXUZXEK2.png"
              alt="Trabi"
              width={120}
              height={40}
              className="h-10 w-auto md:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  showBackground
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-white/80",
                  pathname === link.href && showBackground && "text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/catalogo"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Ver Catálogo
            </Link>
            
            {/* Auth Section */}
            {isLibrero ? (
              <div className="relative group">
                <button
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    showBackground
                      ? "border-border text-foreground hover:bg-muted"
                      : "border-white/30 text-white hover:bg-white/10"
                  )}
                >
                  <Store className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{user?.businessName || user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border bg-white py-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  showBackground
                    ? "border-border text-foreground hover:bg-muted"
                    : "border-white/30 text-white hover:bg-white/10"
                )}
              >
                <User className="h-4 w-4" />
                Acceso
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden rounded-md p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className={cn("h-6 w-6", showBackground ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", showBackground ? "text-foreground" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-md px-3 py-3 text-base font-medium",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/catalogo"
              className="mt-3 block w-full rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ver Catálogo
            </Link>
            
            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t">
              {isLibrero ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">{user?.businessName || user?.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-base font-medium"
                >
                  <User className="h-5 w-5" />
                  Acceso
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
