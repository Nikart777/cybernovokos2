import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white relative overflow-hidden px-4 text-center">
      
      {/* Фон: Глитч-эффект и сетка */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `linear-gradient(#FF2E63 1px, transparent 1px), linear-gradient(90deg, #FF2E63 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} 
      />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505] to-[#050505]" />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-[#FF2E63] mb-6 animate-pulse">
          <AlertTriangle size={64} />
        </div>
        
        <h1 className="font-tactic font-black text-9xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF] mb-2 drop-shadow-[0_0_30px_rgba(255,46,99,0.5)]">
          404
        </h1>
        
        <h2 className="font-chakra font-bold text-2xl uppercase tracking-widest mb-6">
          System Failure
        </h2>
        
        <p className="font-inter text-gray-400 max-w-md mb-10 leading-relaxed">
          Страница не найдена или была удалена из матрицы. <br/>
          Проверьте координаты или вернитесь на базу.
        </p>

        <Link 
          href="/"
          className="group flex items-center gap-3 px-8 py-4 border border-white/20 rounded-xl hover:border-[#FF2E63] hover:bg-[#FF2E63]/10 transition-all duration-300"
        >
          <Home size={20} className="group-hover:text-[#FF2E63] transition-colors" />
          <span className="font-chakra font-bold uppercase tracking-wider text-sm">
            Вернуться на главную
          </span>
        </Link>
      </div>

      {/* Декор */}
      <div className="absolute bottom-10 font-mono text-[10px] text-gray-600 uppercase tracking-[0.5em]">
        CyberX Security System v.5.0
      </div>
    </div>
  );
}