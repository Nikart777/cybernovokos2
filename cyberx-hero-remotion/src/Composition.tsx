import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const colors = {
  bg: "#050505",
  red: "#FF2E63",
  cyan: "#00F0FF",
  purple: "#B900FF",
  green: "#51F0AD",
  white: "#FFFFFF",
};

const zoneCards = [
  {
    title: "Соло",
    subtitle: "мощный ПК и фокус",
    image: "site-assets/solo-premium.webp",
    accent: colors.cyan,
  },
  {
    title: "Компания",
    subtitle: "bootcamp и общие зоны",
    image: "site-assets/bootcamp.webp",
    accent: colors.red,
  },
  {
    title: "PS5",
    subtitle: "лаунж для отдыха",
    image: "site-assets/ps5.webp",
    accent: colors.purple,
  },
  {
    title: "Симрейсинг",
    subtitle: "кокпит, руль, скорость",
    image: "site-assets/sim.webp",
    accent: colors.green,
  },
];

const specs = [
  ["RTX 5070", "топовая графика"],
  ["400 Гц", "мониторы для точной игры"],
  ["24/7", "можно прийти ночью"],
  ["400 бонусов", "на первый визит"],
];

const smooth = (
  frame: number,
  input: [number, number],
  output: [number, number],
) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const lineStyle = (frame: number, top: number, delay: number) => {
  const x = interpolate((frame + delay) % 160, [0, 160], [-420, 2140]);

  return {
    top,
    transform: `translateX(${x}px)`,
  };
};

function GridAndSignals() {
  const frame = useCurrentFrame();
  const rows = [
    lineStyle(frame, 142, 0),
    lineStyle(frame, 314, 42),
    lineStyle(frame, 518, 96),
    lineStyle(frame, 760, 22),
    lineStyle(frame, 910, 70),
  ];

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.09,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.55) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: 0,
            width: 420 + index * 70,
            height: 2,
            background:
              index % 2 === 0
                ? "linear-gradient(90deg, transparent, rgba(0,240,255,0.65), transparent)"
                : "linear-gradient(90deg, transparent, rgba(255,46,99,0.55), transparent)",
            ...row,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

function ZoneCard({
  card,
  index,
}: {
  card: (typeof zoneCards)[number];
  index: number;
}) {
  const frame = useCurrentFrame();
  const appear = smooth(frame, [74 + index * 10, 108 + index * 10], [0, 1]);
  const exit = smooth(frame, [208, 242], [1, 0]);
  const y = interpolate(appear, [0, 1], [90, 0]);
  const rotate = interpolate(appear, [0, 1], [-5, 0]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: 310,
        opacity: appear * exit,
        transform: `translateY(${y}px) rotate(${rotate}deg)`,
        border: "1px solid rgba(255,255,255,0.13)",
        background: "rgba(255,255,255,0.055)",
        boxShadow: "0 34px 90px rgba(0,0,0,0.34)",
      }}
    >
      <Img
        src={staticFile(card.image)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.72,
          transform: `scale(${1.08 + index * 0.015})`,
          filter: "saturate(1.24) contrast(1.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.08), rgba(5,5,5,0.82))",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 22,
          right: 22,
          bottom: 22,
        }}
      >
        <div
          style={{
            width: 64,
            height: 4,
            marginBottom: 16,
            backgroundColor: card.accent,
            boxShadow: `0 0 22px ${card.accent}`,
          }}
        />
        <div
          style={{
            fontFamily: "Tactic Sans, Arial, sans-serif",
            fontSize: 36,
            lineHeight: 0.92,
            textTransform: "uppercase",
            fontWeight: 900,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            marginTop: 9,
            fontSize: 18,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          {card.subtitle}
        </div>
      </div>
    </div>
  );
}

function FinalSpec({
  label,
  sub,
  index,
}: {
  label: string;
  sub: string;
  index: number;
}) {
  const frame = useCurrentFrame();
  const appear = smooth(frame, [226 + index * 8, 260 + index * 8], [0, 1]);

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.055)",
        padding: "23px 24px",
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [38, 0])}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "Tactic Sans, Arial, sans-serif",
          fontSize: 34,
          lineHeight: 1,
          fontWeight: 900,
          color: index % 2 === 0 ? colors.cyan : colors.red,
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 16,
          color: "rgba(255,255,255,0.58)",
        }}
      >
        {sub}
      </div>
    </div>
  );
}

export const HeroStoryboard = () => {
  const frame = useCurrentFrame();

  const introOpacity =
    smooth(frame, [0, 24], [0, 1]) * smooth(frame, [70, 98], [1, 0]);
  const introY = smooth(frame, [0, 42], [58, 0]);
  const choiceOpacity =
    smooth(frame, [64, 98], [0, 1]) * smooth(frame, [202, 238], [1, 0]);
  const finalOpacity = smooth(frame, [218, 258], [0, 1]);

  const bgScale = interpolate(frame, [0, 360], [1.16, 1.02], clamp);
  const bgX = interpolate(frame, [0, 360], [-46, 22], clamp);
  const shutterTop = smooth(frame, [36, 88], [0, -455]);
  const shutterBottom = smooth(frame, [36, 88], [0, 455]);
  const ctaPulse = Math.sin(frame / 10) * 0.5 + 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        color: colors.white,
        fontFamily: "Inter, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("site-assets/main.webp")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.38,
          transform: `translateX(${bgX}px) scale(${bgScale})`,
          filter: "saturate(1.2) contrast(1.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.9) 38%, rgba(5,5,5,0.44) 100%), linear-gradient(180deg, rgba(5,5,5,0.76) 0%, rgba(5,5,5,0.2) 48%, #050505 100%)",
        }}
      />
      <GridAndSignals />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 540,
          backgroundColor: colors.bg,
          borderBottom: "1px solid rgba(0,240,255,0.35)",
          transform: `translateY(${shutterTop}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 540,
          backgroundColor: colors.bg,
          borderTop: "1px solid rgba(255,46,99,0.35)",
          transform: `translateY(${shutterBottom}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 72,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Img
          src={staticFile("site-assets/logo-new.png")}
          style={{
            width: 62,
            height: 62,
            objectFit: "contain",
            scale: 8.51,
            translate: "735px 0px",
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "Tactic Sans, Arial",
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            CYBERX НОВОКОСИНО
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              color: "rgba(255,255,255,0.52)",
              letterSpacing: 2.8,
              textTransform: "uppercase",
            }}
          >
            компьютерный клуб 24/7
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 238,
          width: 1040,
          opacity: introOpacity,
          transform: `translateY(${introY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "Tactic Sans, Arial, sans-serif",
            fontSize: 112,
            lineHeight: 0.88,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 0,
          }}
        >
          Твой вечер
          <br />
          <span style={{ color: colors.cyan }}>начинается здесь.</span>
        </div>
        <div
          style={{
            marginTop: 32,
            width: 680,
            fontSize: 28,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Мощные ПК, VIP-комнаты, PS5-зона и автосимуляторы рядом с метро
          Новокосино.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 86,
          top: 178,
          right: 86,
          opacity: choiceOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                letterSpacing: 4.5,
                textTransform: "uppercase",
                color: colors.red,
                fontWeight: 800,
              }}
            >
              выбери свой формат
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "Tactic Sans, Arial, sans-serif",
                fontSize: 74,
                lineHeight: 0.95,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Выбери формат вечера
            </div>
          </div>
          <div
            style={{
              width: 420,
              fontSize: 24,
              lineHeight: 1.28,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            Приходи один, собирай команду или бронируй отдельную зону под
            компанию.
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
          }}
        >
          {zoneCards.map((card, index) => (
            <ZoneCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: "178px 86px 86px",
          opacity: finalOpacity,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            height: "100%",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.055)",
                marginBottom: 34,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: colors.cyan,
                  boxShadow: `0 0 ${18 + ctaPulse * 20}px ${colors.cyan}`,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 3.2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.64)",
                }}
              >
                Новокосинская, 32 · работаем 24/7
              </span>
            </div>
            <div
              style={{
                fontFamily: "Tactic Sans, Arial, sans-serif",
                fontSize: 116,
                lineHeight: 0.86,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              Бронируй
              <br />
              <span style={{ color: colors.red }}>место заранее</span>
            </div>
            <div
              style={{
                marginTop: 30,
                width: 760,
                fontSize: 28,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              Забронируй ПК, VIP-комнату, PS5-зону или автосимулятор заранее и
              приходи играть без ожидания.
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
              <div
                style={{
                  padding: "24px 34px",
                  background: colors.red,
                  color: colors.white,
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  boxShadow: `0 0 ${34 + ctaPulse * 24}px rgba(255,46,99,0.45)`,
                }}
              >
                Забронировать место
              </div>
              <div
                style={{
                  padding: "23px 34px",
                  border: "1px solid rgba(0,240,255,0.42)",
                  background: "rgba(0,240,255,0.08)",
                  color: colors.white,
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                Смотреть цены
              </div>
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {specs.map(([label, sub], index) => (
              <FinalSpec key={label} label={label} sub={sub} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Img
        src={staticFile("logo-new.png")}
        style={{
          position: "absolute",
        }}
        width={505}
        height={97}
        hidden
      />
    </AbsoluteFill>
  );
};
