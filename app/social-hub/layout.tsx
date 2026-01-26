import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'cyberx_connect',
    description: 'Chat, challenge, and dominate. The new social arena for CyberX gamers.',
};

export default function SocialHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
