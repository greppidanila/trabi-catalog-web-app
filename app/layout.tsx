import type { Metadata, Viewport } from 'next'
import { Nunito, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { FloatingCart } from '@/components/floating-cart'
import { LoginModal } from '@/components/auth/login-modal'
import { PrototypeBanner } from '@/components/prototype-banner'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Trabi | Marcá la diferencia',
  description: 'Catálogo de productos Trabi - Artículos escolares, de oficina, brush lettering y manualidades. Calidad e innovación desde 1906.',
  keywords: ['Trabi', 'marcadores', 'lettering', 'artículos escolares', 'oficina', 'manualidades', 'Argentina'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f20036',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${bebasNeue.variable} bg-background`}>
      <body className="font-sans antialiased">
        <PrototypeBanner />
        <AuthProvider>
          <CartProvider>
            {children}
            <FloatingCart />
            <LoginModal />
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
