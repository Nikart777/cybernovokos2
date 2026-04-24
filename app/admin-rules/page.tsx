import type { Metadata } from 'next';
import AdminRulesClient from './AdminRulesClient';

export const metadata: Metadata = {
    title: 'Правила администратора | CyberX Новокосино',
    description: 'Должностная инструкция администратора компьютерного клуба CYBERX COMMUNITY. Общие положения, обязанности, правила работы.',
    robots: { index: false, follow: false },
};

export default function AdminRulesPage() {
    return <AdminRulesClient />;
}
