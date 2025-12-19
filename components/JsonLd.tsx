export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      /* 1. ИНФОРМАЦИЯ О КЛУБЕ (InternetCafe) */
      {
        "@type": "InternetCafe",
        "@id": "https://cyberx-novokosino.ru/#store",
        "url": "https://cyberx-novokosino.ru/",
        "name": "CyberX Новокосино",
        "description": "Топовый компьютерный клуб в Новокосино 24/7. Мощные ПК RTX 5070, автосимуляторы Sim Racing, PS5 Lounge с диванами.",
        "image": "https://cyberx-novokosino.ru/og-image.jpg",
        "logo": "https://cyberx-novokosino.ru/icon-512.png",
        "telephone": "+79851289538",
        "email": "info@cyberx-novokosino.ru",
        "priceRange": "100 - 2450 RUB",
        "paymentAccepted": "Cash, Credit Card, SBP",
        "currenciesAccepted": "RUB",
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
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "150",
          "bestRating": "5"
        },
        /* ВОССТАНОВЛЕНА СВЯЗЬ С СЕТЬЮ (Для авторитета, но не ломает крошки) */
        "parentOrganization": {
          "@type": "Organization",
          "name": "CyberX Community",
          "url": "https://cyberxcommunity.ru/",
          "sameAs": "https://vk.com/cyberx_community"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "RTX 5070 / 4070 Super", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Sim Racing (Автосимуляторы)", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "PS5 Lounge Zone", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "BootCamp", "value": true }
        ]
      },

      /* 2. ТОВАРЫ (Для сниппета с ценами в Яндексе) */
      {
        "@type": "Product",
        "name": "Пакет 1 Час (Общий зал)",
        "description": "Игровое место в общем зале: ПК RTX 4060, монитор 144 Гц, периферия Logitech.",
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
        "name": "Пакет Ночь (VIP Bootcamp)",
        "description": "Ночной пакет (22:00 - 08:00) в приватной зоне Bootcamp на 5 ПК.",
        "image": "https://cyberx-novokosino.ru/zones/bootcamp-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "850",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },
      {
        "@type": "Product",
        "name": "Автосимулятор Sim Racing (1 час)",
        "description": "Профессиональный кокпит, руль Moza R12 с обратной связью, 4K TV.",
        "image": "https://cyberx-novokosino.ru/zones/sim-1.webp",
        "offers": {
          "@type": "Offer",
          "price": "300",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },

      /* 3. НАВИГАЦИОННАЯ ЦЕПОЧКА (ОСТАВЛЯЕМ ЛОКАЛЬНОЙ ДЛЯ ЯНДЕКСА) */
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@id": "https://cyberx-novokosino.ru/",
              "name": "Главная"
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@id": "https://cyberx-novokosino.ru/#about",
              "name": "Зоны и Компьютеры"
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@id": "https://cyberx-novokosino.ru/#price",
              "name": "Цены и Тарифы"
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