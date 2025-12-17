export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      /* 1. ГЛАВНЫЙ БРЕНД (Федеральная сеть) - Опорная точка */
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

      /* 2. ВАШ ЛОКАЛЬНЫЙ ФИЛИАЛ */
      {
        "@type": "InternetCafe",
        "@id": "https://cyberx-novokosino.ru/#store",
        "url": "https://cyberx-novokosino.ru/",
        "name": "Компьютерный клуб CyberX Новокосино",
        "description": "Топовый кибер клуб в Новокосино 24/7. Мощные ПК (RTX 5070, 400Гц), автосимуляторы Sim Racing, PS5 Lounge. Гейминг нового уровня.",
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
        /* !!! КЛЮЧЕВАЯ СВЯЗЬ С БРЕНДОМ !!! */
        "parentOrganization": {
          "@id": "https://cyberxcommunity.ru/#brand"
        },
        /* Ваши услуги (для расширенного сниппета) */
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "RTX 5070 / 4070 Super", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Sim Racing (Автосимуляторы)", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "PS5 Lounge Zone", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "BootCamp", "value": true }
        ]
      },

      /* 3. ХЛЕБНЫЕ КРОШКИ (Иерархия) */
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