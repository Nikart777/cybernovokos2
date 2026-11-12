import type { Metadata } from "next";
import Header from "@/components/Header";
import SchemaMarkup from "@/components/SchemaMarkup";
import DropFooter from "@/components/certificate-drop/DropFooter";
import CertificateDrop from "@/components/certificate-drop/CertificateDrop";
import { configFromParams, FAQ, NOMINAL_MAX, NOMINAL_MIN, SITE_URL } from "@/components/certificate-drop/model";
import { loadRates } from "@/lib/gift-drop/rates";
import { ORG_NAME, ORG_REF } from "@/lib/organization";

type SearchParams = Record<string, string | string[] | undefined>;

const URL = `${SITE_URL}/certificate`;
// The page ranks for «подарочный сертификат в компьютерный клуб», so that phrase leads the title.
// «Необычный подарок» SERPs belong to gift aggregators: those words stay in the description and on the page.
const TITLE = "Подарочный сертификат в компьютерный клуб в Москве";
const DESCRIPTION =
    "Подарочный сертификат в компьютерный клуб CyberX Новокосино от 1 000 ₽: необычный подарок геймеру. ПК, PS5, автосимулятор и бар. Оплата онлайн, промокод сразу.";

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
            "подарочный сертификат в компьютерный клуб, сертификат в компьютерный клуб Москва, сертификат в компьютерный клуб Новокосино, сертификат в киберклуб, сертификат в игровой клуб, подарок геймеру, необычный подарок геймеру, сертификат на автосимулятор, сертификат на PS5, CyberX Новокосино",
        alternates: { canonical: URL },
        // openGraph и twitter страницы заменяют общие из layout целиком, поэтому type,
        // siteName и locale повторены здесь, а twitter задан свой (раньше брался с главной).
        openGraph: {
            type: "website",
            siteName: "CyberX Новокосино",
            locale: "ru_RU",
            title: "Подарочный сертификат в компьютерный клуб CyberX Новокосино",
            description: DESCRIPTION,
            url: URL,
            images: [{ url: "/certificates.webp", alt: "Подарочный сертификат CyberX Новокосино" }],
        },
        twitter: {
            card: "summary_large_image",
            title: "Подарочный сертификат в компьютерный клуб CyberX Новокосино",
            description: DESCRIPTION,
            images: ["/certificates.webp"],
        },
    };
}

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${URL}#gift-certificate`,
    name: "Подарочный сертификат в компьютерный клуб CyberX Новокосино",
    // В сети CyberX много клубов: адрес в описании показывает, к какому клубу привязан сертификат.
    description:
        "Электронный подарочный сертификат в компьютерный клуб CyberX на Новокосинской улице, 32 (Москва). Действует год со дня покупки и только в этом клубе. Баланс тратится частями на игровые ПК, Solo- и Duo-комнаты, Bootcamp, PS5, автосимулятор и бар клуба. Номинал от 1 000 до 20 000 ₽, промокод приходит сразу после оплаты картой или через СБП.",
    url: URL,
    // Yandex reads image as a plain URL, not ImageObject.
    image: `${SITE_URL}/certificates.webp`,
    brand: { "@type": "Brand", name: "CyberX" },
    category: "Подарки-впечатления",
    offers: {
        "@type": "AggregateOffer",
        url: URL,
        priceCurrency: "RUB",
        lowPrice: String(NOMINAL_MIN),
        highPrice: String(NOMINAL_MAX),
        availability: "https://schema.org/InStock",
        // У Product нет свойства areaServed (ошибка словаря schema.org), у Offer есть.
        areaServed: { "@type": "City", name: "Москва" },
        // The club from app/layout.tsx; type and name stay for validators that do not follow @id.
        seller: { ...ORG_REF, "@type": "InternetCafe", name: ORG_NAME },
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Подарочный сертификат", item: URL },
    ],
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
            <SchemaMarkup schema={breadcrumbSchema} />
            <SchemaMarkup schema={faqSchema} />
            <Header />
            <CertificateDrop initial={cfg} rates={rates} mode="studio" startAtStudio={searchParams.n !== undefined} />
            <DropFooter />
        </div>
    );
}
