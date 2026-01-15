"use client";

import { Crosshair } from "lucide-react";

export default function BookingButton({ className }: { className?: string }) {
    const openBooking = () => {
        window.dispatchEvent(new CustomEvent("open-booking"));
    };

    return (
        <button
            onClick={openBooking}
            className={className || "px-10 py-5 bg-[#FF2E63] text-white font-chakra font-black text-xl uppercase tracking-wider rounded-xl hover:shadow-[0_0_30px_#FF2E63] transition-all duration-300 transform -skew-x-12"}
        >
            <span className="block transform skew-x-12 flex items-center gap-2">
                <Crosshair size={20} />
                Забронировать
            </span>
        </button>
    );
}
