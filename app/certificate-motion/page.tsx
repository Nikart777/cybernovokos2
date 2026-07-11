import CertMotionShowcase from "@/components/certificate/CertMotionShowcase";

export const metadata = {
  title: "Motion demo — сертификат CyberX",
  robots: { index: false, follow: false },
};

export default function CertificateMotionDemo() {
  return (
    <main className="bg-[#050505] text-white">
      {/* Lead-in */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 text-center px-6">
        <span className="font-chakra uppercase tracking-[0.3em] text-[#00F0FF] text-xs">
          Motion demo
        </span>
        <h1 className="font-tactic italic uppercase font-black text-4xl md:text-6xl leading-[0.95]">
          Scroll-scrub<br />шоукейс
        </h1>
        <p className="max-w-md font-inter text-slate-400">
          Прокручивай вниз — карта сертификата оживает по скроллу.
          Тот же приём, что делает twinbru «дорогим».
        </p>
        <div className="mt-4 text-white/40 text-2xl">↓</div>
      </section>

      <CertMotionShowcase />

      {/* Lead-out */}
      <section className="flex h-screen flex-col items-center justify-center gap-3 text-center px-6">
        <h2 className="font-tactic italic uppercase font-black text-3xl md:text-5xl">
          Понравилось?
        </h2>
        <p className="max-w-md font-inter text-slate-400">
          Если ок — перенесу этот эффект на боевую страницу сертификата.
        </p>
      </section>
    </main>
  );
}
