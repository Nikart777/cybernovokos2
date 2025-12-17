export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      /* 1. ГЛАВНЫЙ БРЕНД */
      {
        "@type": "Organization",
        "@id": "https://cyberxcommunity.ru/#brand",
        "name": "CyberX Community",
        "url": "https://cyberxcommunity.ru/",
        "logo": "https://cyberxcommunity.ru/images/logo.svg",
        "sameAs": [
          "https://vk.com/cyberx_community"
        ]
      },

      /* 2. ЛОКАЛЬНЫЙ ФИЛИАЛ */
      {
        "@type": "InternetCafe",
        "@id": "https://cyberx-novokosino.ru/#store",
        "url": "https://cyberx-novokosino.ru/",
        "name": "Компьютерный клуб CyberX Новокосино",
        "description": "Топовый кибер клуб в Новокосино 24/7. Мощные ПК (RTX 5070, 400Гц), автосимуляторы Sim Racing, PS5 Lounge.",
        "image": "https://cyberx-novokosino.ru/og-image.jpg",
        "telephone": "+79851289538",
        "email": "info@cyberx-novokosino.ru",
        "priceRange": "100 - 2450 RUB",
        "paymentAccepted": "Cash, Credit Card, SBP",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Новокосинская, 32",
          "addressLocality": "Москва",
          "postalCode": "111673",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 55.742007,
          "longitude": 37.867178
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "parentOrganization": {
          "@id": "https://cyberxcommunity.ru/#brand"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "RTX 5070 / 4070 Super", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Sim Racing (Автосимуляторы)", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "PS5 Lounge Zone", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "BootCamp", "value": true }
        ]
      },

      /* 3. ТОВАРЫ (ЗОНЫ И ЦЕНЫ) - НОВОЕ! */
      {
        "@type": "Product",
        "name": "Общий зал (Standard)",
        "description": "Игровое место с ПК RTX 4060 и монитором 144 Гц.",
        "image": "https://cyberx-novokosino.ru/zones/common-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "100",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },
      {
        "@type": "Product",
        "name": "VIP Bootcamp",
        "description": "Приватная комната на 5 ПК с RTX 4070 и 240 Гц.",
        "image": "https://cyberx-novokosino.ru/zones/bootcamp-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "110",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },
      {
        "@type": "Product",
        "name": "Автосимулятор Sim Racing",
        "description": "Профессиональный кокпит Moza R12, руль с обратной связью, 4K TV.",
        "image": "https://cyberx-novokosino.ru/zones/sim-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "300",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },
      {
        "@type": "Product",
        "name": "PS5 Lounge Zone",
        "description": "Зона с PlayStation 5, диванами и 4K TV 70 дюймов.",
        "image": "https://cyberx-novokosino.ru/zones/ps5-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "250",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },

      /* 4. ХЛЕБНЫЕ КРОШКИ */
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://cyberxcommunity.ru/",
              "name": "CyberX Community"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://cyberx-novokosino.ru/",
              "name": "Клуб Новокосино"
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}