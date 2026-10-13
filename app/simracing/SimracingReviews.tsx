import { ArrowUpRight, Quote } from "lucide-react";
import { Reveal } from "./SimracingControls";

// Verified public excerpts, 13 October 2026. Quotes are unchanged; labels are editorial.
// Source: https://yandex.com/maps/org/cyberx_community/98831858695/reviews/
const source =
  "https://yandex.ru/maps/org/cyberx_community/98831858695/reviews/";
const reviews = [
  {
    name: "XXX",
    date: "15 июля",
    topic: "Заезд с друзьями",
    text: "Можно заходить большой компанией и все вместе на один сервер погонять",
  },
  {
    name: "Данил В.",
    date: "5 августа",
    topic: "Атмосфера клуба",
    text: "Чисто, аккуратно и уютно.",
  },
  {
    name: "Карина Игнатова",
    date: "24 декабря 2024",
    topic: "Оборудование и команда",
    text: "замечательные устройства и внимательные администраторы.",
  },
];

export default function SimracingReviews() {
  return (
    <section id="reviews" className="sr-section sr-reviews-section">
      <div className="sr-container">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h2 className="sr-title">Отзывы об автосимуляторах в Москве.</h2>
              <p className="sr-lead">
                Наш клуб автосимуляторов в Новокосино глазами гостей:
                впечатления от заездов, атмосферы и команды.
              </p>
            </div>
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold text-[#ff648a]"
            >
              Все отзывы на Яндекс Картах{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only"> в новой вкладке</span>
            </a>
          </div>
        </Reveal>
        <div className="sr-review-grid mt-10">
          {reviews.map((review, index) => (
            <figure
              key={review.name}
              className={`sr-review ${index === 0 ? "sr-review-featured" : ""}`}
            >
              <div className="flex items-center justify-between gap-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#b4b6c0]">
                  {review.topic}
                </p>
                <Quote
                  size={24}
                  className="text-[#ff648a]"
                  aria-hidden="true"
                />
              </div>
              <blockquote className="sr-review-quote">
                <p>«{review.text}»</p>
              </blockquote>
              <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-sm">
                <span>
                  <span className="font-semibold">{review.name}</span>
                  <span className="ml-3 text-[#b4b6c0]">{review.date}</span>
                </span>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[#b4b6c0] underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Яндекс Карты <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="sr-only">
                    , полный отзыв в новой вкладке
                  </span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-[#b4b6c0]">
          Короткие выдержки из отзывов гостей. Полные тексты и другие мнения
          доступны на Яндекс Картах.
        </p>
      </div>
    </section>
  );
}
