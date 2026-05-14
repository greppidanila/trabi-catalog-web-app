import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { TutorialsSection } from "@/components/home/tutorials-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { InstagramSection } from "@/components/home/instagram-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedSection />
        <TutorialsSection />
        <InstagramSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
