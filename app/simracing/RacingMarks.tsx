// Decorative motorsport marks. No timers, live telemetry or implied server status.
export function RaceFlag({ className = "" }: { className?: string }) {
  return <span className={`sr-race-flag ${className}`} aria-hidden="true" />;
}

export function StartLights() {
  return (
    <div className="sr-start-lights" aria-hidden="true">
      <span className="sr-start-label">На старт</span>
      <div className="sr-light-bank">
        {[0, 1, 2, 3, 4].map((light) => (
          <span key={light} style={{ animationDelay: `${light * 120}ms` }} />
        ))}
      </div>
    </div>
  );
}

export function RaceDivider({ finish = false }: { finish?: boolean }) {
  return (
    <div
      className={`sr-race-divider ${finish ? "sr-race-divider-finish" : ""}`}
      aria-hidden="true"
    >
      <div className="sr-race-ribbon">
        <span className="sr-chevron-set">
          <i />
          <i />
          <i />
        </span>
        <span>{finish ? "Твой следующий старт" : "Почувствуй гонку"}</span>
        <RaceFlag />
      </div>
    </div>
  );
}

export function TrackOutline() {
  return (
    <svg
      className="sr-track-outline"
      viewBox="0 0 560 340"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M92 246 40 174Q23 144 50 124L119 85Q138 75 165 84L213 111Q227 119 241 102L275 54Q290 31 325 37L490 76Q518 85 502 112L448 175Q430 197 449 217L487 253Q508 278 472 291L411 304Q391 309 372 290L314 227Q301 211 285 228L243 278Q229 296 204 286L157 263Q144 256 128 266L112 276Q96 283 86 269L78 257"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinejoin="round"
      />
      <path
        className="sr-track-apex"
        d="m275 54 1-2q15-21 49-15l165 39q28 9 12 36l-54 63"
        stroke="currentColor"
        strokeWidth="17"
        strokeLinecap="square"
      />
      <path
        d="m70 234 43 31m-49-22 43 31"
        stroke="currentColor"
        strokeWidth="5"
      />
    </svg>
  );
}
