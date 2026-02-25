"use client";

import { useState, useEffect } from "react";

const VALUES = ["1000", "1500", "2000", "3000", "5000", "10000", "15000"];

export default function SlotMachineNumber() {
    const [currentValue, setCurrentValue] = useState("5000");
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
        let spinTimer: NodeJS.Timeout;
        let stopTimer: NodeJS.Timeout;

        const startSpin = () => {
            setIsSpinning(true);

            // Fast updates for the slot effect
            spinTimer = setInterval(() => {
                setCurrentValue(VALUES[Math.floor(Math.random() * VALUES.length)]);
            }, 50);

            // Stop after 1.5s
            stopTimer = setTimeout(() => {
                clearInterval(spinTimer);
                setIsSpinning(false);
                // Ensure it lands on a value
                setCurrentValue(VALUES[Math.floor(Math.random() * VALUES.length)]);
            }, 1500);
        };

        // Spin every 5 seconds
        const interval = setInterval(startSpin, 5000);

        // Initial spin after 1s
        const initialDelay = setTimeout(startSpin, 1000);

        return () => {
            clearInterval(spinTimer);
            clearTimeout(stopTimer);
            clearInterval(interval);
            clearTimeout(initialDelay);
        };
    }, []);

    return (
        <span
            className={`inline-block transition-all duration-[50ms] text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-[#FF2E63] ${isSpinning ? "opacity-30 blur-[2px] scale-105" : "opacity-100 blur-0 scale-100"
                }`}
            style={{
                minWidth: '4ch',
                textAlign: 'center',
                fontVariantNumeric: 'tabular-nums',
                lineHeight: '1',
                paddingRight: '4px' // Ensure italic doesn't clip
            }}
        >
            {currentValue}
        </span>
    );
}
