import type { Metadata } from "next";
import Header from "@/components/Header";
import SchemaMarkup from "@/components/SchemaMarkup";
import DropFooter from "@/components/certificate-drop/DropFooter";
import CertificateDrop from "@/components/certificate-drop/CertificateDrop";
import { configFromParams, FAQ, NOMINAL_MAX, NOMINAL_MIN, SITE_URL } from "@/components/certificate-drop/model";
import { loadRates } from "@/lib/gift-drop/rates";

type SearchParams = Record<string, string | string[] | undefined>;

const URL = `${SITE_URL}/certificate`;
const TITLE = "Купить подарочный сертификат в компьютерный клуб в Новокосино";
const DESCRIPTION =
    "Подарочный сертификат в компьютерный клуб CyberX Новокосино: соберите дизайн, оплатите онлайн и сразу получите промокод. ПК, PS5, автосимулятор, снеки и напитки. Москва, ул. Новокосинская, 32.";

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
    // ?gift=1 is the recipient preview of someone's design: never indexed.
    if (searchParams.gift === "1") {
        const cfg = configFromParams(searchParams);
        const title = cfg.from ? `${cfg.from} дарит тебе подарок в CyberX` : "Тебе подарок в CyberX Новокосино";
        const description = "Открой кейс и посмотри, что внутри: сертификат в компьютерный клуб CyberX Новокосино.";
        return {
            title,
            description,
            robots: { index: false, follow: false },
            alternates: { canonical: URL },
            openGraph: { title, description, images: [{ url: "/certificates.webp", alt: "Подарочный сертификат CyberX" }] },
        };
    }
    return {
        title: TITLE,
        description: DESCRIPTION,
        keywords:
            "купить сертификат в компьютерный клуб, подарочный сертификат компьютерный клуб, сертификат CyberX Новокосино, подарок парню, что подарить мужчине, оригинальный подарок парню, подарок на день рождения парню, сертификат",
        alternates: { canonical: URL },
        openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            url: URL,
            images: [{ url: "/certificates.webp", alt: "Подарочный сертификат CyberX Новокосино" }],
        },
    };
}

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${URL}#gift-certificate`,
    name: "Подарочный сертификат CyberX Новокосино",
    description:
        "Электронный подарочный сертификат в компьютерный клуб CyberX Новокосино. Подходит для игровых зон ПК, PS5, автосимулятора, а также снеков и напитков в баре клуба.",
    image: `${SITE_URL}/certificates.webp`,
    brand: { "@type": "Brand", name: "CyberX Новокосино" },
    category: "Подарочные сертификаты",
    areaServed: { "@type": "City", name: "Москва" },
    offers: {
        "@type": "AggregateOffer",
        url: URL,
        priceCurrency: "RUB",
        lowPrice: String(NOMINAL_MIN),
        highPrice: String(NOMINAL_MAX),
        availability: "https://schema.org/InStock",
        seller: {
            "@type": "LocalBusiness",
            name: "CyberX Новокосино",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Новокосинская улица, 32",
                addressLocality: "Москва",
                addressCountry: "RU",
            },
        },
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

export default async function CertificatePage({ searchParams }: { searchParams: SearchParams }) {
    const cfg = configFromParams(searchParams);
    const isGift = searchParams.gift === "1";
    const rates = await loadRates();

    if (isGift) {
        return <CertificateDrop initial={cfg} rates={rates} mode="gift" />;
    }

    return (
        <div className="bg-[#0d0a1c]">
            <SchemaMarkup schema={productSchema} />
            <SchemaMarkup schema={faqSchema} />
            <Header />
            <CertificateDrop initial={cfg} rates={rates} mode="studio" startAtStudio={searchParams.n !== undefined} />
            <DropFooter />
        </div>
    );
}
