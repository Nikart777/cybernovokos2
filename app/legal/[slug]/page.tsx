import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


// Define the available legal documents
const DOCUMENTS: Record<string, { title: string; filename: string }> = {
    'privacy': { title: 'Политика конфиденциальности', filename: 'privacy.txt' },
    'offer': { title: 'Публичная оферта', filename: 'offer.txt' },
    'rules': { title: 'Правила посещения', filename: 'rules.txt' },
    'booking': { title: 'Правила бронирования', filename: 'booking.txt' },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const doc = DOCUMENTS[params.slug];
    if (!doc) {
        return {
            title: 'Документ не найден'
        };
    }
    return {
        title: doc.title,
    };
}

export function generateStaticParams() {
    return Object.keys(DOCUMENTS).map((slug) => ({
        slug,
    }));
}

export default function LegalDocumentPage({ params }: { params: { slug: string } }) {
    const doc = DOCUMENTS[params.slug];
    
    if (!doc) {
        notFound();
    }

    try {
        const filePath = path.join(process.cwd(), 'data', 'legal', doc.filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Simple markdown-like parser
        const renderContent = () => {
            const lines = fileContent.split('\n');
            const elements: React.ReactNode[] = [];
            let currentParagraph: string[] = [];

            const flushParagraph = (key: number) => {
                if (currentParagraph.length > 0) {
                    const text = currentParagraph.join(' ');
                    // Handle bold markdown "**text**"
                    const parts = text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });
                    
                    elements.push(<p key={`p-${key}`} className="mb-4">{parts}</p>);
                    currentParagraph = [];
                }
            };

            lines.forEach((line, index) => {
                const trimmed = line.trim();
                
                if (trimmed.startsWith('# ')) {
                    flushParagraph(index);
                    elements.push(
                        <h1 key={`h1-${index}`} className="text-3xl md:text-4xl font-tactic font-black text-white uppercase italic tracking-wider mb-8 mt-12 first:mt-0 text-[#FF2E63]">
                            {trimmed.replace('# ', '')}
                        </h1>
                    );
                } else if (trimmed.startsWith('## ')) {
                    flushParagraph(index);
                    elements.push(
                        <h2 key={`h2-${index}`} className="text-xl md:text-2xl font-chakra font-bold text-white uppercase tracking-wide mb-6 mt-10">
                            {trimmed.replace('## ', '')}
                        </h2>
                    );
                } else if (trimmed.startsWith('---')) {
                    flushParagraph(index);
                    elements.push(
                        <hr key={`hr-${index}`} className="border-t border-white/10 my-10" />
                    );
                } else if (trimmed === '') {
                    flushParagraph(index);
                } else {
                    currentParagraph.push(trimmed);
                }
            });

            flushParagraph(lines.length);

            return elements;
        };

        return (
            <div className="flex flex-col">
                <div className="mb-8 self-start">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF2E63] text-white font-chakra font-black text-xs uppercase tracking-widest transition-all skew-x-[-12deg] hover:bg-[#FF2E63]/80 hover:shadow-[0_0_20px_rgba(255,46,99,0.5)] active:scale-[0.98] select-none"
                    >
                        <span className="skew-x-[12deg] flex items-center gap-1.5">
                            <ArrowLeft size={14} className="stroke-[3px]" />
                            Назад на главную
                        </span>
                    </Link>
                </div>
                <article className="prose-container">
                    {renderContent()}
                </article>
            </div>
        );

    } catch (error) {
        console.error('Error reading legal document:', error);
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-[#FF2E63] mb-4">Ошибка загрузки документа</h1>
                <p>Не удалось найти запрашиваемый документ.</p>
            </div>
        );
    }
}
