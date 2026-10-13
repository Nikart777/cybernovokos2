"use client";

import Image from "next/image";
import { ArrowUpRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const videoUrl =
  "https://www.tiktok.com/@cyberxnovokosino/video/7568569253553589522";

export default function SimracingVideo() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const showError = useCallback(() => {
    setPlaying(false);
    setFailed(true);
    requestAnimationFrame(() => playButton.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    if (!playing) return;
    closeButton.current?.focus({ preventScroll: true });
    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== "https://www.tiktok.com" ||
        event.source !== frame.current?.contentWindow
      )
        return;
      if (
        event.data?.["x-tiktok-player"] &&
        event.data.type === "onPlayerError" &&
        event.data.value?.errorCode !== 3002
      )
        showError();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playing, showError]);

  function stopVideo() {
    setPlaying(false);
    setFailed(false);
    requestAnimationFrame(() =>
      playButton.current?.focus({ preventScroll: true }),
    );
  }

  return (
    <figure className="sr-club-video">
      <div className="sr-video-frame">
        {playing ? (
          <>
            <iframe
              ref={frame}
              src="https://www.tiktok.com/player/v1/7568569253553589522?autoplay=1&rel=0&description=0&music_info=0"
              title="Заезд в CyberX Новокосино — видео TikTok"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              onError={showError}
            />
            <button
              ref={closeButton}
              className="sr-video-close"
              type="button"
              onClick={stopVideo}
              aria-label="Закрыть видео"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </>
        ) : (
          <button
            ref={playButton}
            className="sr-video-start"
            type="button"
            onClick={() => { setFailed(false); setPlaying(true); }}
            aria-label="Смотреть заезд в CyberX Новокосино"
          >
            <Image
              src="/racing/editorial/club-video-poster.webp"
              alt="Кадр нашего ролика: автомобиль на трассе и руки пилота на руле MOZA"
              fill
              sizes="(max-width: 639px) 90vw, 360px"
              className="object-cover"
            />
            <span className="sr-video-topline">
              ИЗ НАШЕГО TIKTOK <ArrowUpRight size={16} aria-hidden="true" />
            </span>
            <span className="sr-video-play">
              <Play size={28} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="sr-video-caption">
              Вот как это
              <br />
              <strong>ощущается.</strong>
              <span>{failed ? 'Попробовать ещё раз' : 'Смотреть заезд'}</span>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        {failed && (
          <p role="status" className="mb-3">
            Видео не загрузилось. Откройте ролик в TikTok по ссылке ниже.
          </p>
        )}
        <a href={videoUrl} target="_blank" rel="noopener noreferrer">
          @cyberxnovokosino · Открыть в TikTok{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </figcaption>
    </figure>
  );
}
