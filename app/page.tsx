import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ZoneHeader from "@/components/ZoneHeader";
import Zones from "@/components/Zones";
import PriceHeader from "@/components/PriceHeader";
import Prices from "@/components/Prices";
import PromoHeader from "@/components/PromoHeader";
import Promotions from "@/components/Promotions";
import AimControl from "@/components/AimControl";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import PromoModals from "@/components/PromoModals";
import StickyBar from "@/components/StickyBar";
import BookingModal from "@/components/BookingModal";
import LegalModals from "@/components/LegalModals"; // Добавляем LegalModals

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-cyber-bg text-white relative">
      <Header />
      
      <Hero />

      <ZoneHeader />
      <Zones />

      <PriceHeader />
      <Prices />

      <PromoHeader />
      <Promotions />
      
      <AimControl />

      <Reviews />

      <FAQ />

      <Contacts />
      <Footer />

      {/* Глобальные модалки */}
      <StickyBar />
      <BookingModal />
      <PromoModals />
      <LegalModals /> {/* Вставляем юридические документы */}
    </main>
  );
}