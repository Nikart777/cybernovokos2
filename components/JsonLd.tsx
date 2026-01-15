export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      /* 1. ГЛАВНЫЙ БРЕНД / ВЕБ-САЙТ */
      {
        "@type": "WebSite",
        "@id": "https://cyberx-novokosino.ru/#website",
        "url": "https://cyberx-novokosino.ru/",
        "name": "CyberX Новокосино",
        "description": "Компьютерный клуб 24/7 в Новокосино",
        "publisher": { "@id": "https://cyberx-novokosino.ru/#store" },
        "inLanguage": "ru-RU"
      },

      /* 2. ЛОКАЛЬНЫЙ БИЗНЕС */
      {
        "@type": ["InternetCafe", "LocalBusiness"],
        "@id": "https://cyberx-novokosino.ru/#store",
        "url": "https://cyberx-novokosino.ru/",
        "name": "Компьютерный клуб CyberX Новокосино",
        "legalName": "Компьютерный клуб CyberX Новокосино",
        "description": "Топовый компьютерный клуб в Новокосино (Москва) с RTX 5070, мониторами 400 Гц BenQ Zowie, PS5 и профессиональными автосимуляторами. Зоны Solo Pro, Solo Premium и Bootcamp. Работаем 24/7.",
        "image": "https://cyberx-novokosino.ru/main.webp",
        "logo": "https://cyberx-novokosino.ru/icon-512.png",
        "telephone": "+79851289538",
        "email": "info@cyberx-novokosino.ru",
        "priceRange": "100 - 450 RUB",
        "currenciesAccepted": "RUB",
        "paymentAccepted": "Cash, Credit Card, SBP",
        "hasMap": [
          "https://yandex.ru/maps/-/CLhI4A3c",
          "https://goo.gl/maps/example"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Новокосинская, 32, ТЦ \"Новокосино\", 2 этаж",
          "addressLocality": "Москва",
          "addressRegion": "Москва",
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
        "sameAs": [
          "https://vk.com/club224403383",
          "https://t.me/cyberxn32",
          "https://yandex.ru/maps/-/CLhI4A3c",
          "https://go.2gis.com/zeQlt"
        ],
        "parentOrganization": {
          "@type": "Organization",
          "name": "CyberX Community",
          "url": "https://cyberxcommunity.ru/",
          "sameAs": "https://vk.com/cyberx_community"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "RTX 5070 / 4060", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Мониторы 400Гц BenQ Zowie", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Solo Pro & Solo Premium", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Симрейсинг (Автосимуляторы)", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "PS5 Lounge Zone", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "BootCamp", "value": true }
        ]
      },

      /* 3. УСЛУГИ/ТОВАРЫ */
      {
        "@type": "Product",
        "name": "Пакет 1 Час (Общий зал)",
        "description": "Игровое место в общем зале: ПК RTX 4060, монитор 144 Гц, периферия Logitech.",
        "image": "https://cyberx-novokosino.ru/zones/common-1.webp",
        "brand": { "@type": "Brand", "name": "CyberX" },
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
        "brand": { "@type": "Brand", "name": "CyberX" },
        "offers": {
          "@type": "Offer",
          "price": "850",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "seller": { "@id": "https://cyberx-novokosino.ru/#store" }
        }
      },

      /* 4. НАВИГАЦИОННАЯ ЦЕПОЧКА */
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