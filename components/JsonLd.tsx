import Script from 'next/script';

export default function JsonLd() {
    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "InternetCafe",
        "name": "CyberX Новокосино",
        "image": "https://cyberx-novokosino.ru/main.webp",
        "logo": "https://cyberx-novokosino.ru/icon-512.png",
        "@id": "https://cyberx-novokosino.ru",
        "url": "https://cyberx-novokosino.ru",
        "telephone": "+79851289538",
        "priceRange": "100 - 450 RUB",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Новокосинская, 32",
            "addressLocality": "Москва",
            "postalCode": "111673",
            "addressCountry": "RU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "55.741887",
            "longitude": "37.867172"
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://vk.com/cyberx_novokosino",
            "https://t.me/CyberXNovokos",
            "https://yandex.ru/maps/org/cyberx/211756209228/"
        ],
        "hasMap": "https://yandex.ru/maps/-/CLhuNRiq"
    };

    const offerSchema = {
        "@context": "https://schema.org",
        "@type": "AggregateOffer",
        "name": "Тарифы и пакеты CyberX Новокосино",
        "priceCurrency": "RUB",
        "lowPrice": "100",
        "highPrice": "450",
        "offerCount": "12",
        "offers": [
            {
                "@type": "Offer",
                "name": "Standard (1 час) - Будни",
                "price": "100",
                "priceCurrency": "RUB"
            },
            {
                "@type": "Offer",
                "name": "Pro (1 час) - Будни",
                "price": "130",
                "priceCurrency": "RUB"
            },
            {
                "@type": "Offer",
                "name": "VIP (1 час) - Будни",
                "price": "180",
                "priceCurrency": "RUB"
            },
            {
                "@type": "Offer",
                "name": "Night Package (Standard)",
                "price": "350",
                "priceCurrency": "RUB"
            }
        ]
    };

    return (
        <>
            <Script id="json-ld-business" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(businessSchema)}
            </Script>
            <Script id="json-ld-offers" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify(offerSchema)}
            </Script>
        </>
    );
}
