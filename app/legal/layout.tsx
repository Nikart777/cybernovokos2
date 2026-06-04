import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | CyberX Novokosino',
        default: 'Документы | CyberX Novokosino',
    },
    robots: {
        index: false,
        follow: false,
    }
};

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF2E63]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                    
                    <div className="relative z-10 text-gray-300 font-inter text-sm md:text-base leading-relaxed space-y-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
