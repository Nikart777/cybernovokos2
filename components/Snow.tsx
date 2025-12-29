"use client";

import { useEffect, useState } from "react";

export default function Snow() {
  const [flakes, setFlakes] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    // Генерируем снежинки только на клиенте, чтобы не было ошибки гидратации
    const count = 50; // Количество снежинок (50 - оптимально, чтобы не лагало)
    const newFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Позиция по горизонтали %
      delay: Math.random() * 5, // Случайная задержка старта
      duration: 10 + Math.random() * 10, // Скорость падения (10-20 сек)
      size: 0.2 + Math.random() * 0.4 // Размер (в rem)
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(20px);
            opacity: 0.3;
          }
        }
      `}</style>
      
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-80"
          style={{
            left: `${flake.left}%`,
            top: `-20px`,
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `-${flake.delay}s`,
            filter: `blur(${flake.size > 0.4 ? '1px' : '0px'})`, // Блюр для крупных хлопьев
            boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)" // Легкое свечение
          }}
        />
      ))}
    </div>
  );
}