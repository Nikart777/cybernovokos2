"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Play, RotateCcw, Home, Trophy, Target, Smartphone, Copy, Check, Zap, Star, MapPin, Calculator, MousePointer2, Activity } from "lucide-react";
import Link from "next/link";

// --- ТИПЫ ---
type GameState = "menu" | "countdown" | "playing" | "finished";

type TargetObj = {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "normal" | "gold"; 
  createdAt: number;
  duration: number;
};

type Particle = {
  id: number;
  x: number;
  y: number;
  color: string;
};

// --- НАГРАДЫ ---
const REWARDS = [
  { score: 80000, code: "CN8NPK", label: "800 бонусов", type: "bonus" },
  { score: 65000, code: "CN6E32", label: "600 бонусов", type: "bonus" },
  { score: 50000, code: "CN4NPQ", label: "400 бонусов", type: "bonus" },
  { score: 35000, code: "CN3NXT", label: "300 бонусов", type: "bonus" },
  { score: 20000, code: "CN2MOS", label: "200 бонусов", type: "bonus" },
  { score: 10000, code: "CN1LCK", label: "100 бонусов", type: "bonus" },
];

export default function AimGamePage() {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [targets, setTargets] = useState<TargetObj[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [bestReward, setBestReward] = useState<typeof REWARDS[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [combo, setCombo] = useState(1);
  const [maxCombo, setMaxCombo] = useState(1);
  const [accuracy, setAccuracy] = useState({ hits: 0, miss: 0 });
  const [countdown, setCountdown] = useState(3);

  // Рефы
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const lastSpawnTime = useRef(0);
  const timeLeftRef = useRef(45);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Звуки
  const playSound = (type: 'hit' | 'miss' | 'gold') => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hit') {
      osc.frequency.setValueAtTime(400 + (combo * 100), now);
      osc.frequency.exponentialRampToValueAtTime(1000 + (combo * 100), now + 0.1);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'gold') {
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
      osc.type = 'triangle';
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else {
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(50, now + 0.2);
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  };

  const clearAllTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
  };

  const startCountdown = () => {
    clearAllTimers();
    setGameState("countdown");
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          startGame();
          return 0;
        }
        return prev - 1;
      });
    }, 600);
  };

  const startGame = () => {
    clearAllTimers(); 
    setGameState("playing");
    setScore(0);
    setTimeLeft(45);
    timeLeftRef.current = 45;
    setTargets([]);
    setParticles([]);
    setBestReward(null);
    setCopied(false);
    setCombo(1);
    setMaxCombo(1);
    setAccuracy({ hits: 0, miss: 0 });
    lastSpawnTime.current = 0;
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const loop = (time: number) => {
      setTargets(prev => {
        const now = Date.now();
        return prev.filter(t => {
          const age = now - t.createdAt;
          if (age > t.duration) {
            setCombo(1);
            return false;
          }
          return true;
        });
      });

      const difficulty = Math.max(0.3, timeLeftRef.current / 45); 
      const spawnRate = 500 * difficulty; 

      if (time - lastSpawnTime.current > spawnRate) {
        setTargets(prev => {
          if (prev.length < 6) { 
             return [...prev, createTarget()];
          }
          return prev;
        });
        lastSpawnTime.current = time;
      }

      gameLoopRef.current = requestAnimationFrame(loop);
    };

    gameLoopRef.current = requestAnimationFrame(loop);

    return () => clearAllTimers();
  }, [gameState]);

  const endGame = () => {
    setGameState("finished");
    clearAllTimers();
  };

  useEffect(() => {
    if (gameState === "finished") {
      const reward = REWARDS.find(r => score >= r.score);
      setBestReward(reward || null);
    }
  }, [gameState, score]);

  const createTarget = (): TargetObj => {
    if (!containerRef.current) return { id: 0, x: 50, y: 50, size: 50, type: "normal", createdAt: Date.now(), duration: 2000 };
    
    const { offsetWidth, offsetHeight } = containerRef.current;
    
    const isGold = Math.random() > 0.9;
    const type = isGold ? "gold" : "normal";

    const baseSize = isGold ? (30 + Math.random() * 20) : (50 + Math.random() * 40);
    const size = baseSize * Math.max(0.7, timeLeftRef.current / 45); 
    
    const x = Math.random() * (offsetWidth - size - 40) + 20;
    const y = Math.random() * (offsetHeight - size - 40) + 20;
    
    const baseDuration = isGold ? 1200 : 2000;
    const duration = baseDuration * Math.max(0.5, timeLeftRef.current / 45);

    return {
      id: Date.now() + Math.random(),
      x, y, size, type,
      createdAt: Date.now(),
      duration
    };
  };

  const spawnParticles = (x: number, y: number, color: string) => {
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x, y, color
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.slice(6));
    }, 500);
  };

  const handleBackgroundClick = (e: React.MouseEvent | React.TouchEvent) => {
    if ((e.target as HTMLElement).id === "game-area" && gameState === "playing") {
       setCombo(1);
       setScore(prev => Math.max(0, prev - 100)); 
       setAccuracy(prev => ({ ...prev, miss: prev.miss + 1 }));
       playSound('miss');
       
       if (containerRef.current) {
         containerRef.current.style.transform = `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)`;
         setTimeout(() => { if(containerRef.current) containerRef.current.style.transform = 'none' }, 50);
       }
    }
  };

  const hitTarget = (target: TargetObj) => {
    if (gameState !== "playing") return;
    
    setTargets(prev => prev.filter(t => t.id !== target.id));
    
    let points = 100 * combo;
    if (target.type === "gold") points *= 5; 
    
    setScore(prev => prev + points);
    
    // @ts-ignore
    setCombo(prev => {
        const val = Math.min(prev + 1, 10);
        setMaxCombo(m => Math.max(m, val));
        return val;
    });

    setAccuracy(prev => ({ ...prev, hits: prev.hits + 1 }));
    
    spawnParticles(target.x + target.size/2, target.y + target.size/2, target.type === "gold" ? "#FFD700" : "#FF2E63");
    
    playSound(target.type === "gold" ? "gold" : "hit");
  };

  const copyCode = () => {
    if (bestReward) {
      navigator.clipboard.writeText(bestReward.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalClicks = accuracy.hits + accuracy.miss;
  const accuracyPercent = totalClicks > 0 ? Math.round((accuracy.hits / totalClicks) * 100) : 0;
  const totalBonusWithReg = bestReward && bestReward.type === 'bonus' ? parseInt(bestReward.label) + 400 : 0;
  // CPS по русски
  const cps = (totalClicks / 45).toFixed(1);

  // Определение ранга
  const getRank = (s: number) => {
      if (s > 80000) return "AIMBOT (Читер?)";
      if (s > 65000) return "Global Elite";
      if (s > 50000) return "Киберкотлета";
      if (s > 35000) return "PRO Игрок";
      if (s > 20000) return "Любитель";
      if (s > 10000) return "Новичок";
      return "Сильвер";
  }

  const rank = getRank(score);

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col relative font-sans select-none">
      
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: gameState === "playing" ? 1 : 0.5 }}>
         <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_${timeLeft < 10 ? '#330000' : '#1a1a1a'}_0%,_#000_100%)] transition-colors duration-500`} />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,46,99,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,46,99,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* HEADER HUD */}
      <header className="relative z-20 flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 bg-[#050505]/80 backdrop-blur-md">
         <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <Home size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-chakra font-bold text-xs md:text-sm uppercase tracking-widest hidden sm:inline">На главную</span>
         </Link>
         
         <div className="flex items-center gap-4 md:gap-12">
            <div className="flex flex-col items-center w-16 md:w-20">
               <span className="text-[9px] text-[#FF2E63] uppercase font-bold tracking-widest">Time</span>
               <span className={`font-mono text-xl md:text-3xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                 {timeLeft}
               </span>
            </div>
            
            <div className="flex flex-col items-center w-20 md:w-28 relative">
               <span className="text-[9px] text-yellow-500 uppercase font-bold tracking-widest">Combo</span>
               <motion.div 
                 key={combo}
                 initial={{ scale: 1.5, opacity: 0.5 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className={`font-tactic font-black text-2xl md:text-4xl italic ${combo >= 5 ? 'text-yellow-400 drop-shadow-[0_0_10px_orange]' : 'text-gray-500'}`}
               >
                 x{combo}
               </motion.div>
               <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(combo / 10) * 100}%` }}
                  />
               </div>
            </div>

            <div className="flex flex-col items-center w-24 md:w-32">
               <span className="text-[9px] text-[#00F0FF] uppercase font-bold tracking-widest">Score</span>
               <span className="font-tactic font-bold text-xl md:text-3xl text-white tracking-widest">
                 {score}
               </span>
            </div>
         </div>

         <div className="w-[80px] hidden sm:flex justify-end opacity-30">
            <Target className="text-white" />
         </div>
      </header>

      {/* GAME AREA */}
      <div className="flex-grow relative flex items-center justify-center p-2 md:p-6 overflow-hidden">
         
         <div 
           id="game-area"
           ref={containerRef}
           onMouseDown={handleBackgroundClick}
           onTouchStart={handleBackgroundClick}
           className={`relative w-full max-w-6xl h-[75vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] overflow-hidden cursor-crosshair touch-none transition-colors duration-100 ${combo > 5 ? 'border-yellow-500/20 shadow-[inset_0_0_50px_rgba(255,215,0,0.1)]' : ''}`}
         >
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* TARGETS */}
            <AnimatePresence>
              {gameState === "playing" && targets.map(target => {
                const isGold = target.type === "gold";
                return (
                  <motion.div
                    key={target.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute rounded-full flex items-center justify-center cursor-pointer z-10"
                    style={{ 
                      left: target.x, top: target.y, width: target.size, height: target.size 
                    }}
                    onMouseDown={(e) => { e.stopPropagation(); hitTarget(target); }}
                    onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); hitTarget(target); }}
                  >
                     <motion.div 
                        initial={{ scale: 1.4, opacity: 0.8, borderColor: isGold ? "#FFD700" : "#00F0FF" }}
                        animate={{ scale: 1, opacity: 1, borderColor: isGold ? "#FFF" : "#FF2E63" }}
                        transition={{ duration: target.duration / 1000, ease: "linear" }}
                        className="absolute inset-[-8px] border-2 rounded-full"
                     />
                     
                     <div className={`w-full h-full rounded-full border-2 border-white shadow-lg relative overflow-hidden flex items-center justify-center ${isGold ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_20px_#FFD700]' : 'bg-gradient-to-br from-[#FF2E63] to-[#B900FF] shadow-[0_0_15px_#FF2E63]'}`}>
                        {isGold && <Star size={16} className="text-white animate-spin" />}
                        <div className="absolute top-0 -left-[50%] w-full h-full bg-white/30 skew-x-12" />
                     </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* PARTICLES */}
            {particles.map(p => (
               <motion.div
                 key={p.id}
                 initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
                 animate={{ 
                   x: p.x + (Math.random() - 0.5) * 100, 
                   y: p.y + (Math.random() - 0.5) * 100, 
                   scale: 0, 
                   opacity: 0 
                 }}
                 transition={{ duration: 0.4 }}
                 className="absolute w-2 h-2 rounded-full pointer-events-none z-20"
                 style={{ backgroundColor: p.color }}
               />
            ))}

            {/* COUNTDOWN */}
            <AnimatePresence>
              {gameState === "countdown" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 backdrop-blur-[2px]">
                   <motion.div
                     key={countdown}
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1.5, opacity: 1 }}
                     exit={{ scale: 2, opacity: 0 }}
                     className="font-tactic font-black text-[150px] text-white drop-shadow-[0_0_30px_#FF2E63]"
                   >
                     {countdown}
                   </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* MENU */}
            {gameState === "menu" && (
               <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center max-w-xl"
                  >
                     <h1 className="font-tactic font-black text-6xl md:text-9xl text-white uppercase tracking-tighter mb-4 leading-none drop-shadow-[0_0_30px_rgba(255,46,99,0.5)]">
                       AIM <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E63] to-[#B900FF]">GOD</span>
                     </h1>
                     
                     <div className="grid grid-cols-3 gap-6 mb-8 text-center text-xs font-mono text-gray-400 uppercase tracking-widest border-y border-white/10 py-6">
                        <div className="flex flex-col items-center gap-2">
                           <Zap className="text-[#FFD700]" size={24} />
                           <span>Скорость</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <Crosshair className="text-[#00F0FF]" size={24} />
                           <span>Точность</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <Star className="text-[#FF2E63]" size={24} />
                           <span>Комбо x10</span>
                        </div>
                     </div>

                     <p className="font-inter text-gray-300 mb-10 leading-relaxed text-sm md:text-base">
                       Цели живут всего <span className="text-white font-bold">1 секунду</span>.<br/> 
                       Лови золотые мишени и держи комбо!<br/>
                       <span className="text-[#FF2E63] font-bold block mt-2 text-lg">Главный приз: 800 бонусов</span>
                     </p>
                     
                     <button 
                       onClick={startCountdown}
                       className="group relative px-16 py-6 bg-white text-black font-chakra font-black text-2xl uppercase tracking-widest overflow-hidden skew-x-[-10deg] hover:bg-[#FF2E63] hover:text-white transition-colors duration-200 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,46,99,0.6)]"
                     >
                        <span className="relative z-10 flex items-center gap-4 skew-x-[10deg]">
                          <Play size={28} className="fill-current" /> 
                          START
                        </span>
                     </button>
                  </motion.div>
               </div>
            )}

            {/* RESULTS SCREEN (FIXED SCROLL & SPACING) */}
            {gameState === "finished" && (
               <div className="absolute inset-0 bg-black/95 backdrop-blur-xl flex flex-col z-50 overflow-y-auto">
                  <div className="flex-grow flex flex-col items-center justify-center p-4 py-12 md:py-8 min-h-full">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full max-w-md text-center relative"
                    >
                       
                       {/* Score Header */}
                       <div className="mb-6">
                          <span className="text-gray-500 uppercase font-bold text-xs tracking-widest block mb-2">Твой результат</span>
                          <div className="font-tactic font-black text-6xl md:text-8xl text-white leading-none drop-shadow-[0_0_30px_rgba(255,46,99,0.6)]">
                            {score}
                          </div>
                       </div>

                       {/* DETAILED STATS */}
                       <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Trophy size={10}/> Ранг</div>
                             <div className="text-xs md:text-sm font-bold text-[#00F0FF]">{rank}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><MousePointer2 size={10}/> Клик/сек</div>
                             <div className="text-xs md:text-sm font-bold text-white">{cps}</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Crosshair size={10}/> Точность</div>
                             <div className={`text-xs md:text-sm font-bold ${accuracyPercent > 90 ? "text-green-500" : "text-white"}`}>{accuracyPercent}%</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                             <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><Zap size={10}/> Макс. Комбо</div>
                             <div className="text-xs md:text-sm font-bold text-yellow-500">x{maxCombo}</div>
                          </div>
                       </div>

                       {/* REWARD CARD */}
                       {bestReward ? (
                          <div className="bg-gradient-to-b from-[#1a1a1a] to-[#0A0A0A] rounded-xl p-1 border border-[#FFD700] mb-8 relative shadow-[0_0_60px_rgba(255,215,0,0.2)]">
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black px-4 py-1 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 whitespace-nowrap z-20">
                                <Trophy size={14} fill="black" /> Победа
                             </div>
                             <div className="bg-[#111] rounded-lg p-6 pt-8">
                                <h3 className="font-tactic font-black text-2xl md:text-3xl text-white uppercase mb-4 leading-none">
                                  {bestReward.label}
                                </h3>

                                <div className="bg-[#000] rounded-xl p-4 flex items-center justify-between border border-white/10 mb-4 group cursor-pointer active:scale-95 transition-transform" onClick={copyCode}>
                                   <div className="flex flex-col items-start text-left">
                                      <span className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Промокод</span>
                                      <code className="text-xl md:text-2xl font-mono font-bold text-[#FF2E63] tracking-widest">{bestReward.code}</code>
                                   </div>
                                   <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-[#FF2E63] group-hover:text-white transition-colors">
                                     {copied ? <Check size={20} /> : <Copy size={20} />}
                                   </div>
                                </div>

                                {/* HINT FOR BONUS SUM */}
                                {bestReward.type === 'bonus' && (
                                  <div className="mb-4 bg-[#FF2E63]/10 border border-[#FF2E63]/30 rounded-lg p-3 flex items-center gap-3">
                                     <div className="p-2 bg-[#FF2E63]/20 rounded-full text-[#FF2E63] shrink-0">
                                        <Calculator size={16} />
                                     </div>
                                     <div className="text-left">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Итого при регистрации</p>
                                        <p className="text-xs md:text-sm font-bold text-white leading-tight">
                                          <span className="text-[#FF2E63]">{parseInt(bestReward.label)}</span> (игра) + <span className="text-[#00F0FF]">400</span> (welcome) = <span className="text-[#FFD700]">{totalBonusWithReg} бонусов!</span>
                                        </p>
                                     </div>
                                  </div>
                                )}

                                {/* INSTRUCTIONS */}
                                <div className="text-[11px] text-gray-400 text-left space-y-3 border-t border-white/10 pt-4 leading-snug">
                                   <div className="flex gap-3">
                                      <Smartphone className="text-[#00F0FF] shrink-0" size={16} />
                                      <p>Активируй быстро в приложении при регистрации</p>
                                   </div>
                                   
                                   <div className="flex gap-3">
                                      <MapPin className="text-[#00F0FF] shrink-0" size={16} />
                                      <p>CYBERX Новокосино, ул. Новокосинская 32</p>
                                   </div>

                                   <div className="flex gap-3">
                                      <Zap className="text-orange-500 shrink-0" size={16} />
                                      <p>Только для новых клиентов</p>
                                   </div>
                                   <div className="flex gap-3">
                                      <RotateCcw className="text-red-500 shrink-0" size={16} />
                                      <p className="text-red-400 font-bold">Сгорает через 3 дня</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ) : (
                          <div className="bg-[#111] rounded-2xl p-8 border border-white/10 mb-8">
                             <Activity className="mx-auto text-gray-600 mb-4" size={40} />
                             <p className="text-gray-400 mb-2 font-inter text-sm">Неплохая попытка!</p>
                             <p className="text-white font-bold text-lg uppercase tracking-wide mb-4">
                               До приза не хватило <span className="text-[#FF2E63]">{10000 - score}</span> очков
                             </p>
                             <p className="text-xs text-gray-500">Совет: не промахивайся, чтобы растить комбо.</p>
                          </div>
                       )}

                       {/* ACTIONS */}
                       <div className="flex flex-col gap-3 relative z-10 pb-10 md:pb-0">
                          <a 
                            href="https://redirect.appmetrica.yandex.com/serve/965634439310753772" 
                            target="_blank"
                            className="w-full py-4 bg-[#FF2E63] hover:bg-white hover:text-black text-white font-chakra font-bold text-lg uppercase rounded-lg transition-all shadow-[0_0_30px_rgba(255,46,99,0.4)] flex items-center justify-center gap-3"
                          >
                             <Smartphone size={20} />
                             {bestReward ? "Скачать и забрать" : "Скачать приложение"}
                          </a>
                          
                          <button 
                            onClick={startCountdown}
                            className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-chakra font-bold text-sm uppercase rounded-lg transition-colors flex items-center justify-center gap-2"
                          >
                             <RotateCcw size={16} />
                             Играть снова
                          </button>
                       </div>

                    </motion.div>
                  </div>
               </div>
            )}

         </div>

      </div>
    </main>
  );
}