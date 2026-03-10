"use client";

import React, { useState, useEffect, useRef } from "react";
import "./calculator.css";

interface Club {
    id: string;
    name: string;
    zones: Record<number, string>;
}

export default function CalculatorPage() {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loadingClubs, setLoadingClubs] = useState(true);

    const [club, setClub] = useState<string | null>(null);
    const [zone, setZone] = useState<number | null>(null);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [tariff, setTariff] = useState<string | null>(null);
    const [minutes, setMinutes] = useState<string>("");

    const [calcLoading, setCalcLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [errorToast, setErrorToast] = useState<string | null>(null);

    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            const s = String(now.getSeconds()).padStart(2, "0");
            setCurrentTime(`${h}:${m}:${s}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetch("/api/calculator/clubs")
            .then((res) => res.json())
            .then((data) => {
                setClubs(data);
                setLoadingClubs(false);
            })
            .catch(() => {
                showError("Не удалось загрузить список клубов");
                setLoadingClubs(false);
            });
    }, []);

    const showError = (msg: string) => {
        setErrorToast(msg);
        setTimeout(() => setErrorToast(null), 4000);
    };

    const handleSelectClub = (cId: string) => {
        setClub(cId);
        setZone(null);
        setTariff(null);
        setResult(null);
    };

    const handleSelectZone = (zId: number) => {
        setZone(zId);
        setTariff(null);
        setResult(null);
    };

    const handleSelectBooking = (status: boolean) => {
        setIsBooking(status);
        setTariff(null);
        setResult(null);
    };

    const handleSelectTariff = (tId: string) => {
        setTariff(tId);
        setResult(null);
    };

    const calculate = async () => {
        const mins = parseInt(minutes, 10);
        if (!mins || mins < 1) {
            showError("Введите количество минут");
            return;
        }

        setCalcLoading(true);
        setResult(null);

        try {
            const res = await fetch("/api/calculator/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    club,
                    zone,
                    tariff_type: tariff,
                    minutes_spent: mins,
                    is_booking: isBooking,
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Ошибка расчёта");
            }

            const data = await res.json();
            setResult(data);
            setTimeout(() => {
                resultRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } catch (e: any) {
            showError(e.message);
        } finally {
            setCalcLoading(false);
        }
    };

    const resetAll = () => {
        setClub(null);
        setZone(null);
        setIsBooking(false);
        setTariff(null);
        setMinutes("");
        setResult(null);
    };

    const activeClub = clubs.find((c) => c.id === club);

    const ZONE_ICONS: Record<string, string> = {
        "ОБЩИЙ ЗАЛ (Standard)": "🖥️",
        БУТКЕМП: "🎯",
        "VIP БУТКЕМП и DUO": "👥",
        SOLO: "👤",
        "TV ОБЩИЙ ЗАЛ": "📺",
        "TV VIP КОМНАТА": "💎",
        АВТОСИМУЛЯТОР: "🏎️",
    };

    return (
        <div className="calculator-page">
            <div className="app">
                <header className="header">
                    <div className="logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">CyberX</span>
                    </div>
                    <h1 className="header-title">Калькулятор компенсаций</h1>
                    <div className="header-time">{currentTime}</div>
                </header>

                <main className="main">
                    {/* STEP 1: Клуб */}
                    <section className="step" id="stepClub">
                        <div className="step-header">
                            <span className="step-number">01</span>
                            <span className="step-label">Клуб</span>
                        </div>
                        <div className="club-buttons">
                            {loadingClubs && <div className="text-sm text-gray-500">Загрузка...</div>}
                            {clubs.map((c) => (
                                <button
                                    key={c.id}
                                    className={`club-btn ${club === c.id ? "active" : ""}`}
                                    onClick={() => handleSelectClub(c.id)}
                                >
                                    <span className="club-name">{c.name}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* STEP 2: Зона */}
                    {club && activeClub && (
                        <section className="step" id="stepZone">
                            <div className="step-header">
                                <span className="step-number">02</span>
                                <span className="step-label">Зона</span>
                            </div>
                            <div className="zone-grid">
                                {Object.entries(activeClub.zones).map(([zId, zName]) => {
                                    const idNum = parseInt(zId, 10);
                                    const icon = ZONE_ICONS[zName] || "🖥️";
                                    return (
                                        <button
                                            key={idNum}
                                            className={`zone-btn ${zone === idNum ? "active" : ""}`}
                                            onClick={() => handleSelectZone(idNum)}
                                        >
                                            <span className="zone-icon">{icon}</span>
                                            <span className="zone-name">{zName}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* STEP 3: Бронь */}
                    {zone && (
                        <section className="step" id="stepBooking">
                            <div className="step-header">
                                <span className="step-number">03</span>
                                <span className="step-label">Клиент по брони?</span>
                            </div>
                            <div className="booking-toggle">
                                <button
                                    className={`booking-btn ${!isBooking ? "active" : ""}`}
                                    data-booking="false"
                                    onClick={() => handleSelectBooking(false)}
                                >
                                    <span className="booking-icon">🚶</span>
                                    <span className="booking-name">Без брони</span>
                                </button>
                                <button
                                    className={`booking-btn ${isBooking ? "active" : ""}`}
                                    data-booking="true"
                                    onClick={() => handleSelectBooking(true)}
                                >
                                    <span className="booking-icon">📱</span>
                                    <span className="booking-name">По брони (−5%)</span>
                                </button>
                            </div>
                        </section>
                    )}

                    {/* STEP 4: Тариф */}
                    {zone && (
                        <section className="step" id="stepTariff">
                            <div className="step-header">
                                <span className="step-number">04</span>
                                <span className="step-label">Тариф клиента</span>
                            </div>
                            <div className="tariff-buttons">
                                <button
                                    className={`tariff-btn ${tariff === "minute" ? "active" : ""}`}
                                    onClick={() => handleSelectTariff("minute")}
                                >
                                    <span className="tariff-icon">⏱</span>
                                    <span className="tariff-name">Поминутный</span>
                                </button>
                                <button
                                    className={`tariff-btn ${tariff === "3h" ? "active" : ""}`}
                                    onClick={() => handleSelectTariff("3h")}
                                >
                                    <span className="tariff-icon">🕒</span>
                                    <span className="tariff-name">Пакет 3 часа</span>
                                </button>
                                <button
                                    className={`tariff-btn ${tariff === "5h" ? "active" : ""}`}
                                    onClick={() => handleSelectTariff("5h")}
                                >
                                    <span className="tariff-icon">🕔</span>
                                    <span className="tariff-name">Пакет 5 часов</span>
                                </button>
                                <button
                                    className={`tariff-btn ${tariff === "night" ? "active" : ""}`}
                                    onClick={() => handleSelectTariff("night")}
                                >
                                    <span className="tariff-icon">🌙</span>
                                    <span className="tariff-name">Ночной</span>
                                </button>
                            </div>
                        </section>
                    )}

                    {/* STEP 5: Время */}
                    {tariff && (
                        <section className="step" id="stepTime">
                            <div className="step-header">
                                <span className="step-number">05</span>
                                <span className="step-label">Потраченное время (минуты)</span>
                            </div>
                            <div className="time-input-wrap">
                                <div className="time-presets">
                                    {[5, 10, 15, 20, 30, 45, 60].map((val) => (
                                        <button
                                            key={val}
                                            className={`preset-btn ${parseInt(minutes, 10) === val ? "active" : ""}`}
                                            onClick={() => setMinutes(String(val))}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                                <div className="time-custom">
                                    <input
                                        type="number"
                                        min="1"
                                        max="480"
                                        placeholder="Введите минуты"
                                        className="minutes-field"
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                    />
                                    <span className="minutes-suffix">мин</span>
                                </div>
                                <button className="calc-btn" onClick={calculate} disabled={calcLoading}>
                                    <span className="calc-btn-text">
                                        {calcLoading ? "Считаем..." : "Рассчитать компенсацию"}
                                    </span>
                                    {calcLoading && <span className="calc-btn-loader"></span>}
                                </button>
                            </div>
                        </section>
                    )}

                    {/* РЕЗУЛЬТАТ */}
                    {result && (
                        <section className="result" id="resultCard" ref={resultRef}>
                            <div className="result-glow"></div>
                            <div className="result-header">Компенсация</div>
                            <div className="result-amount">{result.compensation} ₽</div>
                            <div className="result-details">
                                <div className="detail-row">
                                    <span>Клуб</span>
                                    <span>{result.club}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Зона</span>
                                    <span>{result.zone}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Тариф</span>
                                    <span>
                                        {result.tariff_type}
                                        {result.is_booking && (
                                            <span style={{ color: "#ffd740", fontSize: "11px", marginLeft: "6px" }}>
                                                📱 По брони
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span>Тип дня</span>
                                    <span>{result.day_type}</span>
                                </div>
                                <div className="detail-row">
                                    <span>Время</span>
                                    <span>{result.minutes} мин</span>
                                </div>
                                <div className="detail-row highlight">
                                    <span>Расчёт</span>
                                    <span>{result.details}</span>
                                </div>
                            </div>
                            <button className="reset-btn" onClick={resetAll}>
                                Новый расчёт
                            </button>
                        </section>
                    )}

                    {/* ОШИБКА */}
                    {errorToast && (
                        <div className="error-toast" id="errorToast">
                            <span>{errorToast}</span>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
