import React from 'react';
export function SectionBadge({ number, label }: { number: string; label: string }) {
    return (
        <div className="inline-flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#FF2E63] font-tactic font-black text-white text-lg italic shadow-md shadow-[#FF2E63]/20">
                {number}
            </div>
            <span className="font-chakra font-bold text-slate-400 text-xs uppercase tracking-[0.3em]">{label}</span>
        </div>
    );
}
