import Image from "next/image";
import { Plus } from "lucide-react";

const games = [
  {
    id: "forza-horizon-6",
    name: "Forza Horizon 6",
    mode: "Уже в Новокосино",
    text: "Новая глава фестиваля. Выбирай машину, открывай новые дороги и гоняй в своё удовольствие.",
    alt: "Спортивные автомобили и логотип Forza Horizon 6",
  },
  {
    id: "carx-street",
    name: "CarX Street",
    mode: "Уличные гонки",
    text: "Ночной город, тюнинг и борьба за каждый поворот. Собери машину под свой стиль.",
    alt: "Автомобиль на улицах города в CarX Street",
  },
  {
    id: "carx-drift",
    name: "CarX Drift Racing",
    mode: "Парный дрифт",
    text: "Дым, угол и близкий соперник. Лови занос и держи красивую дугу от входа до выхода.",
    alt: "Дрифт на спортивном автомобиле в CarX Drift Racing",
  },
  {
    id: "assetto-rally",
    name: "Assetto Rally",
    mode: "Раллийные спецучастки",
    text: "Узкая дорога и смена покрытия. Работай рулём, чувствуй сцепление и атакуй следующий поворот.",
    alt: "Раллийный автомобиль на спецучастке в Assetto Rally",
  },
  {
    id: "forza-horizon-5",
    name: "Forza Horizon 5",
    mode: "Открытый мир",
    text: "Солнечная Мексика, огромный автопарк и свобода маршрута. От асфальта до бездорожья за один заезд.",
    alt: "Гонки в открытом мире Forza Horizon 5",
  },
  {
    id: "dirt-wrc",
    name: "DiRT Rally 2.0 / WRC 9",
    mode: "Гонка на время",
    text: "Гравий, грязь и подсказки штурмана. Здесь каждое торможение решает, сколько секунд останется на финише.",
    alt: "Автомобиль на раллийной трассе",
  },
  {
    id: "euro-truck",
    name: "Euro Truck Simulator 2",
    mode: "Дальние рейсы",
    text: "Большой тягач, дороги Европы и груз за спиной. Смени гоночный ритм на дальнюю поездку.",
    alt: "Грузовик в Euro Truck Simulator 2",
  },
  {
    id: "city-car-driving-2",
    name: "City Car Driving 2",
    mode: "Городское вождение",
    text: "Трафик, перекрёстки и знакомство с управлением. Почувствуй работу руля и педалей в виртуальном городе.",
    alt: "Городской автомобиль в City Car Driving 2",
  },
];

function GameCard({ game }: { game: (typeof games)[number] }) {
  return (
    <article
      className={`sr-game-card ${game.id === "forza-horizon-6" ? "sr-game-new" : ""}`}
    >
      <div className="sr-game-image">
        <Image
          src={`/racing/games/${game.id}.webp`}
          alt={game.alt}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="sr-game-copy">
        <p className="sr-game-mode">{game.mode}</p>
        <h3>{game.name}</h3>
        <p className="sr-game-description">{game.text}</p>
      </div>
    </article>
  );
}

export default function SimracingGames() {
  return (
    <div className="sr-container pb-14 md:pb-20">
      <div className="sr-game-grid">
        {games.slice(0, 4).map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <details className="sr-more-games">
        <summary>
          <span>Ещё 4 игры: от Мексики до дорог Европы</span>
          <Plus size={22} aria-hidden="true" />
        </summary>
        <div className="sr-game-grid">
          {games.slice(4).map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </details>
    </div>
  );
}
