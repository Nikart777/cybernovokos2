'use client';

import React, { useState } from 'react';
import { Target, MonitorPlay, CheckCircle2, ShieldAlert, XCircle, ArrowRight, Home, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

// === ВОПРОСЫ ПО ВСЕМ 18 РАЗДЕЛАМ ===
import { QUESTIONS } from './questions';

export default function AdminTestPage() {
    const [started, setStarted] = useState(false);
    const [club, setClub] = useState<'altufevo' | 'novokosino' | null>(null);
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [mistakes, setMistakes] = useState<{questionIdx: number, selectedIdx: number}[]>([]);

    const handleStart = (selectedClub: 'altufevo' | 'novokosino') => {
        setClub(selectedClub);
        setStarted(true);
    };

    const handleAnswer = (optionIdx: number) => {
        if (showExplanation) return;
        
        setSelectedOption(optionIdx);
        setShowExplanation(true);
        
        if (optionIdx === QUESTIONS[currentQuestion].correct) {
            setScore(s => s + 1);
        } else {
            setMistakes(prev => [...prev, { questionIdx: currentQuestion, selectedIdx: optionIdx }]);
        }
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(curr => curr + 1);
        } else {
            setCompleted(true);
        }
    };

    const resetQuiz = () => {
        setStarted(false);
        setClub(null);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedOption(null);
        setShowExplanation(false);
        setCompleted(false);
        setMistakes([]);
    };

    // === ЭКРАН СТАРТА ===
    if (!started) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-rose-500/5 rounded-full blur-[100px]" />
                
                <Link href="/admin-rules" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-chakra transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
                    <Home size={18} /> Вернуться к правилам
                </Link>

                <div className="max-w-2xl text-center relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="w-24 h-24 bg-white shadow-xl shadow-indigo-500/10 rounded-3xl mx-auto mb-8 flex items-center justify-center border border-slate-100 transform rotate-[-5deg]">
                        <Target size={48} className="text-indigo-600" />
                    </div>
                    
                    <h1 className="font-tactic font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 uppercase italic mb-6 leading-none">
                        Финальное <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Тестирование</span>
                    </h1>
                    
                    <p className="font-chakra text-lg text-slate-600 mb-12 max-w-xl mx-auto border-x-4 border-indigo-200 px-6">
                        Тест содержит <strong className="text-slate-900">{QUESTIONS.length} вопросов</strong> по всем разделам правил. 
                        Для допуска к полноценной работе требуется набрать минимум {QUESTIONS.length - 2} правильных ответов.
                    </p>

                    <div className="space-y-6 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="font-tactic font-black text-xl uppercase text-slate-400">Выберите клуб стажировки:</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => handleStart('altufevo')}
                                className="flex-1 group bg-slate-50 border-2 border-slate-200 hover:border-[#0ea5e9] rounded-2xl p-6 transition-all hover:bg-[#0ea5e9]/5"
                            >
                                <div className="text-2xl font-tactic italic uppercase text-slate-700 group-hover:text-[#0ea5e9] mb-2 tracking-wide">Алтуфьево</div>
                            </button>
                            
                            <button 
                                onClick={() => handleStart('novokosino')}
                                className="flex-1 group bg-slate-50 border-2 border-slate-200 hover:border-[#FF2E63] rounded-2xl p-6 transition-all hover:bg-[#FF2E63]/5"
                            >
                                <div className="text-2xl font-tactic italic uppercase text-slate-700 group-hover:text-[#FF2E63] mb-2 tracking-wide">Новокосино</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // === ЭКРАН РЕЗУЛЬТАТОВ ===
    if (completed) {
        const passTarget = QUESTIONS.length - 2;
        const passed = score >= passTarget;

        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center relative overflow-x-hidden">
                {/* Result Decor */}
                <div className={`fixed inset-0 opacity-10 blur-3xl pointer-events-none ${passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-6 sm:p-10 text-center relative z-10 border border-slate-100 animate-in zoom-in-95 duration-500 mb-8 mt-auto mx-auto shrink-0">
                    <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-8 border-8 ${passed ? 'bg-emerald-100 text-emerald-500 border-emerald-50' : 'bg-rose-100 text-rose-500 border-rose-50'}`}>
                        {passed ? <CheckCircle2 size={64} /> : <XCircle size={64} />}
                    </div>
                    
                    <h2 className="font-tactic font-black italic uppercase text-4xl mb-4 text-slate-900">
                        {passed ? 'Тест Пройден!' : 'Тест Завален.'}
                    </h2>
                    
                    <div className="font-chakra text-3xl font-bold mb-6 flex items-center justify-center gap-2">
                        <span className={passed ? 'text-emerald-600' : 'text-rose-600'}>{score}</span> 
                        <span className="text-slate-400">/ {QUESTIONS.length}</span>
                    </div>

                    <p className="font-chakra text-slate-600 mb-10 text-lg">
                        {passed 
                            ? 'Вы отлично усвоили материалы регламента. Вы готовы приступить к работе администратором. Сообщите старшему администратору о прохождении теста.' 
                            : `Допускается не более 2-х ошибок. Вы сделали ${QUESTIONS.length - score}. Рекомендуем еще раз внимательно прочитать правила и попробовать снова.`
                        }
                    </p>

                    <div className="flex flex-col gap-4">
                        {passed ? (
                            <Link href="/admin-rules" className="bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-2xl font-tactic italic uppercase tracking-wider transition-colors inline-flex justify-center items-center gap-2">
                                <Home size={20} /> Вернуться в Инструкцию
                            </Link>
                        ) : (
                            <button onClick={resetQuiz} className="bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-2xl font-tactic italic uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all hover:shadow-rose-500/40 inline-flex justify-center items-center gap-2">
                                <RefreshCcw size={20} /> Повторить Тест
                            </button>
                        )}
                    </div>
                </div>

                {mistakes.length > 0 && (
                    <div className="max-w-2xl w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 mx-auto mt-4 mb-auto">
                        <h3 className="font-tactic font-black text-2xl uppercase italic text-slate-800 mb-6 flex items-center justify-center sm:justify-start gap-3">
                            <ShieldAlert className="text-rose-500" /> Разбор ошибок ({mistakes.length})
                        </h3>
                        <div className="space-y-6">
                            {mistakes.map((m, i) => {
                                const q = QUESTIONS[m.questionIdx];
                                return (
                                    <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden shadow-sm">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
                                        <div className="text-xs font-chakra font-bold uppercase tracking-widest text-slate-400 mb-2">{q.section}</div>
                                        <h4 className="font-tactic text-lg uppercase italic text-slate-900 mb-6">{q.question}</h4>
                                        
                                        <div className="space-y-4 mb-6">
                                            <div className="flex gap-4 items-start p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                                                <XCircle className="text-rose-500 shrink-0 mt-0.5" size={24} />
                                                <div>
                                                    <span className="text-xs font-bold uppercase text-rose-500 tracking-wider block mb-1">Ваш ответ</span>
                                                    <span className="font-chakra text-slate-700">{q.options[m.selectedIdx]}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 items-start p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                                                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={24} />
                                                <div>
                                                    <span className="text-xs font-bold uppercase text-emerald-500 tracking-wider block mb-1">Правильный ответ</span>
                                                    <span className="font-chakra text-slate-700">{q.options[q.correct]}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                            <span className="text-xs font-tactic italic uppercase text-indigo-500 tracking-wider block mb-2">Объяснение:</span>
                                            <p className="font-chakra text-slate-600 leading-relaxed">{q.explanation}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Repeat buttons at the bottom if many mistakes */}
                        {mistakes.length > 2 && (
                             <div className="mt-8 flex justify-center pb-8">
                                 {passed ? (
                                    <Link href="/admin-rules" className="bg-slate-900 hover:bg-slate-800 text-white p-5 rounded-2xl font-tactic italic uppercase tracking-wider transition-colors inline-flex justify-center items-center gap-2">
                                        <Home size={20} /> В Инструкцию
                                    </Link>
                                ) : (
                                    <button onClick={resetQuiz} className="bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-2xl font-tactic italic uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all hover:shadow-rose-500/40 inline-flex justify-center items-center gap-2">
                                        <RefreshCcw size={20} /> Повторить Тест
                                    </button>
                                )}
                             </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // === ЭКРАН ВОПРОСА ===
    const q = QUESTIONS[currentQuestion];
    const isAnswered = showExplanation;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-20 px-4 sm:px-6 relative">
            
            <div className="w-full max-w-3xl mb-8 flex items-center justify-between z-10">
                <div className="flex items-center gap-3 sm:gap-6">
                    <Link href="/admin-rules" onClick={() => confirm("Точно выйти? Прогресс сбросится.")} className="p-3 bg-white hover:bg-slate-100 rounded-full shadow-sm text-slate-400 border border-slate-200 transition-colors shrink-0">
                        <XCircle size={24} />
                    </Link>
                    <div className="flex flex-col">
                        <span className="font-tactic text-slate-400 uppercase italic tracking-widest text-[10px] sm:text-xs">Текущая тема:</span>
                        <span className="font-tactic text-indigo-600 uppercase italic tracking-wider text-sm sm:text-lg border-b-2 border-indigo-100 pb-0.5 max-w-[200px] sm:max-w-md truncate" title={q.section}>{q.section}</span>
                    </div>
                </div>
                <div className="font-tactic text-slate-500 uppercase italic tracking-widest text-xs sm:text-sm bg-white px-3 sm:px-5 py-2 sm:py-3 rounded-2xl shadow-sm border border-slate-200 shrink-0">
                    <span className="text-slate-400 hidden sm:inline">Вопрос </span>
                    <strong className="text-indigo-600 text-lg">{currentQuestion + 1}</strong> / {QUESTIONS.length}
                </div>
            </div>

            {/* Прогресс бар */}
            <div className="w-full max-w-3xl h-2 bg-slate-200 rounded-full mb-10 overflow-hidden shadow-inner z-10">
                <div 
                    className={`h-full bg-gradient-to-r ${club === 'altufevo' ? 'from-[#0ea5e9] to-[#38bdf8]' : 'from-[#FF2E63] to-[#fb7185]'} transition-all duration-500`}
                    style={{ width: `${((currentQuestion) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <div className="w-full max-w-3xl relative z-10">
                {/* Карточка Вопроса */}
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 sm:p-10 mb-8 animate-in slide-in-from-right-8 duration-300">
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-chakra font-bold text-slate-500 uppercase tracking-widest border border-slate-200">
                        {q.section}
                    </div>
                    
                    <h2 className="font-tactic font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 uppercase italic leading-tight mb-8">
                        {q.question}
                    </h2>

                    <div className="flex flex-col gap-4">
                        {q.options.map((opt, idx) => {
                            let btnStyle = "border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50";
                            
                            // Если юзер уже ответил
                            if (isAnswered) {
                                if (idx === q.correct) {
                                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-2 ring-emerald-500/20"; // Правильный всегда светится зеленым
                                } else if (idx === selectedOption) {
                                    btnStyle = "border-rose-500 bg-rose-50 text-rose-800 shadow-[0_0_20px_rgba(244,63,94,0.15)] ring-2 ring-rose-500/20"; // Если выбрал ошибку
                                } else {
                                    btnStyle = "border-slate-200 text-slate-400 opacity-50 cursor-default"; // Остальные меркнут
                                }
                            }

                            return (
                                <button 
                                    key={idx}
                                    disabled={isAnswered}
                                    onClick={() => handleAnswer(idx)}
                                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 font-chakra text-base sm:text-lg leading-relaxed flex gap-4 ${btnStyle}`}
                                >
                                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-full font-tactic italic ${isAnswered && idx === q.correct ? 'bg-emerald-500 text-white' : isAnswered && idx === selectedOption ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                        {['A', 'B', 'C', 'D'][idx]}
                                    </div>
                                    <div className="pt-1">{opt}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Объяснение после ответа */}
                {isAnswered && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8">
                        <div className={`p-6 rounded-[2rem] border-2 flex flex-col sm:flex-row gap-6 ${selectedOption === q.correct ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                            <div className="shrink-0 flex items-start">
                                {selectedOption === q.correct 
                                    ? <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30"><CheckCircle2 size={32} /></div>
                                    : <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30"><XCircle size={32} /></div>
                                }
                            </div>
                            <div>
                                <h4 className={`font-tactic font-black italic uppercase text-lg mb-2 ${selectedOption === q.correct ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {selectedOption === q.correct ? 'Абсолютно Верно!' : 'Ошибка.'}
                                </h4>
                                <p className="font-chakra text-slate-600 mb-4">{q.explanation}</p>
                                
                                <button 
                                    onClick={nextQuestion}
                                    className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-tactic italic uppercase tracking-wider flex items-center gap-3 transition-transform hover:-translate-y-1 shadow-lg shadow-slate-900/20"
                                >
                                    {currentQuestion === QUESTIONS.length - 1 ? 'Завершить Тест' : 'Следующий Вопрос'} <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
