"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import s from "./drop.module.css";
import Studio from "./Studio";
import GiftReveal from "./GiftReveal";
import Checkout from "./Checkout";
import IntroScroll from "./IntroScroll";
import { BuyBar, DemoSection, FaqSection, FinalSection, RevealModal, SpendSection, StepsSection } from "./Sections";
import { configToQuery, GiftConfig, Rates, rarityOf, track } from "./model";

function useOnScreen(ref: React.RefObject<Element>, margin = "0px") {
    // null until the first observation, so nothing flickers on load
    const [on, setOn] = useState<boolean | null>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, margin]);
    return on;
}

type Props = { initial: GiftConfig; rates: Rates; mode: "studio" | "gift"; startAtStudio?: boolean };

export default function CertificateDrop({ initial, rates, mode, startAtStudio = false }: Props) {
    const [cfg, setCfg] = useState<GiftConfig>(initial);
    const touched = useRef(false);

    const update = useCallback((patch: Partial<GiftConfig>) => {
        setCfg((c) => ({ ...c, ...patch }));
        if (!touched.current) {
            touched.current = true;
            track("cert_drop_edit", { field: Object.keys(patch)[0] });
        }
    }, []);

    // Keep the design in the address bar so a refresh or a shared link restores it.
    useEffect(() => {
        if (mode !== "studio" || !touched.current) return;
        const id = window.setTimeout(() => {
            window.history.replaceState(window.history.state, "", `${window.location.pathname}?${configToQuery(cfg)}`);
        }, 350);
        return () => window.clearTimeout(id);
    }, [cfg, mode]);

    const introRef = useRef<HTMLElement>(null);
    const heroCtaRef = useRef<HTMLDivElement>(null);
    const demoRef = useRef<HTMLElement>(null);
    const finalRef = useRef<HTMLElement>(null);
    const introOn = useOnScreen(introRef, "0px 0px -50% 0px");
    // The constructor leads with its own buttons, so the floating bar waits until it is passed.
    const studioRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        studioRef.current = document.getElementById("studio");
    }, []);
    const studioOn = useOnScreen(studioRef as React.RefObject<Element>, "0px 0px -30% 0px");
    // Phones: while the constructor fills the top of the screen the site header steps aside.
    const studioAtTop = useOnScreen(studioRef as React.RefObject<Element>, "0px 0px -88% 0px");
    const [headerTucked, setHeaderTucked] = useState(false);
    useEffect(() => {
        const tuck = studioAtTop === true && window.matchMedia("(max-width: 1023px)").matches;
        setHeaderTucked(tuck);
        window.dispatchEvent(new CustomEvent("cx-header-hide", { detail: tuck }));
    }, [studioAtTop]);
    useEffect(() => () => void window.dispatchEvent(new CustomEvent("cx-header-hide", { detail: false })), []);
    const heroCtaOn = useOnScreen(heroCtaRef);

    // Someone coming back to their own design (link with params) skips the intro.
    useEffect(() => {
        if (mode === "studio" && startAtStudio) document.getElementById("studio")?.scrollIntoView({ block: "start" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const finalOn = useOnScreen(finalRef, "0px 0px -20% 0px");

    const [trigger, setTrigger] = useState(0);
    const [revealOpen, setRevealOpen] = useState(false);
    const [checkout, setCheckout] = useState<string | null>(null);
    const openCheckout = useCallback((place: string) => {
        setRevealOpen(false);
        setCheckout(place);
    }, []);

    const openCase = useCallback(() => {
        demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => setTrigger((v) => v + 1), 650);
    }, []);
    const closeReveal = useCallback(() => setRevealOpen(false), []);
    const respin = useCallback(() => {
        setRevealOpen(false);
        window.setTimeout(() => setTrigger((v) => v + 1), 350);
    }, []);
    const editDesign = useCallback(() => {
        document.getElementById("studio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    if (mode === "gift") return <GiftReveal cfg={cfg} rates={rates} code={null} />;

    const rarity = rarityOf(cfg.nominal);
    return (
        <div className={s.root} style={{ "--rar": rarity.color, "--pin-top": headerTucked ? "8px" : "66px" } as React.CSSProperties}>
            <div className={s.grain} aria-hidden />
            <main>
                <IntroScroll sectionRef={introRef} />
                <Studio cfg={cfg} update={update} rates={rates} onOpenCase={openCase} onBuy={openCheckout} ctaRef={heroCtaRef} />
                <DemoSection ref={demoRef} cfg={cfg} trigger={trigger} onDone={() => setRevealOpen(true)} />
                <SpendSection cfg={cfg} update={update} rates={rates} />
                <StepsSection onOpenCase={openCase} />
                <FaqSection />
                <FinalSection ref={finalRef} cfg={cfg} onEdit={editDesign} onBuy={openCheckout} />
            </main>
            <BuyBar cfg={cfg} visible={heroCtaOn === false && !introOn && !studioOn && !finalOn && !revealOpen && !checkout} onBuy={openCheckout} />
            <RevealModal cfg={cfg} open={revealOpen} onClose={closeReveal} onRespin={respin} onBuy={openCheckout} />
            <Checkout cfg={cfg} open={checkout !== null} place={checkout ?? ""} onClose={() => setCheckout(null)} />
        </div>
    );
}
