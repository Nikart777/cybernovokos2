import React from 'react';

export default function SEOBlock() {
    return (
        <section className="py-16 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF2E63]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00F0FF]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-white/50 space-y-6 font-inter text-sm md:text-base leading-relaxed">
                    <h2 className="text-white/80 font-chakra text-2xl font-bold mb-6">Компьютерный клуб CyberX в Новокосино (Москва)</h2>

                    <p>
                        Ищете где комфортно <strong>поиграть в мощные игры на ПК</strong> с максимальными настройками графики? CyberX Новокосино — это топовый <strong>компьютерный клуб в Москве</strong> (ВАО), расположенный по адресу ул. Новокосинская, 32. Мы работаем круглосуточно 24/7, чтобы вы могли побеждать и наслаждаться любимыми играми (Dota 2, CS2, Valorant, PUBG) в любое время дня и ночи.
                    </p>

                    <p>
                        Наш современный <strong>киберклуб</strong> предлагает бескомпромиссное игровое железо: сверхмощные системы на базе процессоров Intel Core и видеокарт <strong>NVIDIA RTX 4070 SUPER и RTX 5070</strong>, профессиональные киберспортивные мониторы с частотой ообновления 360-400Гц. Для максимального комфорта каждое место оборудовано эргономичной периферией и удобными геймерскими креслами Knight.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                        <div>
                            <h3 className="text-white/80 font-chakra text-xl font-semibold mb-3">PS5 Lounge и Автосимуляторы</h3>
                            <p className="text-sm">
                                Для любителей консолей у нас оборудована комфортная <strong>PS5 Lounge-зона</strong> с мягкими диванами и огромными TV для игры в FIFA 24, UFC 5 или Mortal Kombat 1 с друзьями. А для фанатов гонок доступен <strong>профессиональный автосимулятор с рулем и педалями</strong> (Moza R5), дающий полное погружение в гоночные чемпионаты.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white/80 font-chakra text-xl font-semibold mb-3">Бонусы и Турниры</h3>
                            <p className="text-sm">
                                Если вы у нас впервые — используйте <strong>промокод на первое посещение</strong> клубов CyberX, чтобы оценить качество бесплатно! Мы предлагаем выгодные утренние и ночные пакеты, программу лояльности с кэшбеком, а также регулярно проводим киберспортивные соревнования. Доступна удобная онлайн-бронь ПК через ЛАНГЕЙМ (Langame).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
