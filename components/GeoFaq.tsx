import SchemaMarkup from "@/components/SchemaMarkup";

export interface GeoFaqItem {
    q: string;
    a: string;
}

/**
 * FAQ-блок для гео- и услуговых посадочных страниц.
 *
 * Построен на нативном <details>, а не на useState: страницы отдаются
 * статически (force-static), и раскрытие вопросов должно работать без
 * гидратации — это же делает содержимое ответов доступным краулеру сразу.
 * Дополнительно отдаёт разметку FAQPage.
 */
export default function GeoFaq({
    items,
    title = "Частые вопросы",
}: {
    items: GeoFaqItem[];
    title?: string;
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <section className="mb-20">
            <SchemaMarkup schema={schema} />
            <h2 className="font-tactic font-black text-3xl md:text-5xl uppercase mb-8">
                {title}
            </h2>
            <div className="flex flex-col gap-3">
                {items.map((item) => (
                    <details
                        key={item.q}
                        className="group bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-[#FF2E63]/30 transition-colors"
                    >
                        <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4 font-chakra font-bold text-base md:text-lg uppercase tracking-wide">
                            <span>{item.q}</span>
                            <span
                                aria-hidden="true"
                                className="text-[#FF2E63] text-2xl leading-none shrink-0 transition-transform group-open:rotate-45"
                            >
                                +
                            </span>
                        </summary>
                        <div className="px-6 pb-6 font-inter text-sm md:text-base text-gray-400 leading-relaxed">
                            {item.a}
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
