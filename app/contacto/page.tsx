import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ContactContent } from "@/components/contact/contact-content";

export const metadata: Metadata = {
  title: "Contacto | Trabi",
  description: "Contactate con Trabi. Consultas sobre productos, pedidos mayoristas, puntos de venta y más.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 sm:pt-32">
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
