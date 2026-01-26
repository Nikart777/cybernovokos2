import { motion } from 'framer-motion';

interface ClubBadgeProps {
    club: 'altufievo' | 'vlasino' | 'neutral';
    size?: 'sm' | 'md' | 'lg';
    isAdmin?: boolean;
}

const CLUB_CONFIG = {
    altufievo: {
        emoji: '🔴',
        code: 'Алтуфьево',
        name: 'Алтуфьево',
        color: 'text-red-500',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30'
    },
    vlasino: {
        emoji: '🟣',
        code: 'Новокосино',
        name: 'Новокосино',
        color: 'text-purple-500',
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/30'
    }
};

export default function ClubBadge({ club, size = 'md', isAdmin = false }: ClubBadgeProps) {
    if (isAdmin) {
        const adminSizeClasses = {
            sm: 'text-[8px] px-1.5 py-0.5',
            md: 'text-[9px] px-2 py-0.5',
            lg: 'text-[10px] px-2.5 py-1'
        };

        return (
            <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`inline-flex items-center gap-1 rounded-md font-black uppercase tracking-wider border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)] ${adminSizeClasses[size]}`}
                title="Администратор"
            >
                <span>🛡️</span>
                <span>ADMIN</span>
            </motion.span>
        );
    }

    // @ts-ignore - we intentionally allow 'neutral' in props but it won't exist in config
    const config = CLUB_CONFIG[club];

    // If no valid club config (e.g. neutral or error), don't render a badge at all
    if (!config) return null;

    const sizeClasses = {
        sm: 'text-[9px] px-1.5 py-0.5',
        md: 'text-[10px] px-2 py-1',
        lg: 'text-xs px-3 py-1.5'
    };

    return (
        <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider border ${config.color} ${config.bg} ${config.border} ${sizeClasses[size]}`}
            title={config.name}
        >
            <span>{config.emoji}</span>
            <span>{config.code}</span>
        </motion.span>
    );
}
