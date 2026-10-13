export interface CarItem {
    id: string;
    name: string;
    image: string;
    note?: string;
    role?: string;
}

export interface FactItem {
    label: string;
    value: string;
}

export interface RoomItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    cover: string;
    tags: string[];
    facts: FactItem[];
    rules: string[];
    cars: CarItem[];
}

export interface GameCatalogItem {
    id: 'assetto' | 'beamng';
    name: string;
    description: string;
    rooms: RoomItem[];
}

export const CYBERX_SERVER_GAMES: GameCatalogItem[] = [
    {
        "id": "assetto",
        "name": "Assetto Corsa",
        "description": "Токийские эстакады, МКАД, серпантины и автодромы. Погони, шашки, дрифт и свободные заезды — с отдельными правилами и автопарком каждой комнаты.",
        "rooms": [
            {
                "id": "shutoko-chase",
                "title": "Токио · Перехват",
                "subtitle": "Полиция против беглецов",
                "description": "Погоня по токийским эстакадам. Полицейские перехватывают беглецов, а городский поток добавляет неожиданностей. Выбирай сторону: служебная Skoda или дерзкий Mustang.\n\nКасание приносит очко полиции. После поимки беглец получает временную защиту и продолжает заезд. Подключайся к погоне в любой момент; дорожный трафик не участвует в поимках.",
                "cover": "/racing/assets/covers/assetto-shutoko-chase.webp",
                "tags": [
                    "Токио",
                    "Перехват"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "16"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "2"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Погоня по токийским эстакадам.",
                    "Полицейские перехватывают беглецов, а городский поток добавляет неожиданностей.",
                    "Выбирай сторону: служебная Skoda или дерзкий Mustang.",
                    "Касание приносит очко полиции.",
                    "После поимки беглец получает временную защиту и продолжает заезд.",
                    "Подключайся к погоне в любой момент; дорожный трафик не участвует в поимках."
                ],
                "cars": [
                    {
                        "id": "mlgz_skoda_octavia_2019_police",
                        "name": "Skoda Octavia RS 2019 BE Police",
                        "image": "/racing/assets/cars/assetto-mlgz_skoda_octavia_2019_police-685bc1b8.webp",
                        "note": "8 мест в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ford_mustang_2014_enginecrane",
                        "name": "Ford Mustang 302",
                        "image": "/racing/assets/cars/assetto-ford_mustang_2014_enginecrane-c53abb41.webp",
                        "note": "8 мест в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko-tag",
                "title": "Токио · Заражение",
                "subtitle": "Раунды 5 мин",
                "description": "Автомобильные догонялки на улицах Токио. Одинаковые спортивные BMW, командный азарт и всё меньше места для побега. Белые машины спасаются, красные ловят; пойманный переходит на сторону заражённых.\n\nСобирайтесь на парковке Tatsumi. Раунды запускаются автоматически, когда есть соперники. Дорожный трафик создаёт помехи, но не участвует в заражении.",
                "cover": "/racing/assets/covers/assetto-shutoko-tag.webp",
                "tags": [
                    "Токио",
                    "Заражение"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "16"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "1"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Автомобильные догонялки на улицах Токио.",
                    "Одинаковые спортивные BMW, командный азарт и всё меньше места для побега.",
                    "Белые машины спасаются, красные ловят; пойманный переходит на сторону заражённых.",
                    "Собирайтесь на парковке Tatsumi.",
                    "Раунды запускаются автоматически, когда есть соперники.",
                    "Дорожный трафик создаёт помехи, но не участвует в заражении."
                ],
                "cars": [
                    {
                        "id": "ks_bmw_m4",
                        "name": "BMW M4",
                        "image": "/racing/assets/cars/assetto-ks_bmw_m4-9d7c6766.webp",
                        "note": "16 мест в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko-shashki",
                "title": "Токио · Шашки с очками",
                "subtitle": "Средний трафик",
                "description": "Поймай ритм токийского потока. Дорожные спорткары, эстакады Shutoko и шашки с очками: ищи свободный коридор, обгоняй аккуратно и собирай серию.\n\nСчёт и серия отображаются в игровом интерфейсе. Столкновение завершает текущую попытку; сохранённый рекорд остаётся.",
                "cover": "/racing/assets/covers/assetto-shutoko-shashki.webp",
                "tags": [
                    "Токио",
                    "Шашки с очками"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "23"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "15"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Поймай ритм токийского потока.",
                    "Дорожные спорткары, эстакады Shutoko и шашки с очками: ищи свободный коридор, обгоняй аккуратно и собирай серию.",
                    "Счёт и серия отображаются в игровом интерфейсе.",
                    "Столкновение завершает текущую попытку; сохранённый рекорд остаётся."
                ],
                "cars": [
                    {
                        "id": "ks_porsche_panamera",
                        "name": "Porsche Panamera Turbo",
                        "image": "/racing/assets/cars/assetto-ks_porsche_panamera-c55e01b4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ste_m3_cs_touring",
                        "name": "BMW M3 CS Touring ( G81 )",
                        "image": "/racing/assets/cars/assetto-ste_m3_cs_touring-f97bae71.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_bmw_m4",
                        "name": "BMW M4",
                        "image": "/racing/assets/cars/assetto-ks_bmw_m4-9d7c6766.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ford_rs_18",
                        "name": "Ford Focus RS",
                        "image": "/racing/assets/cars/assetto-ford_rs_18-9341bac5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "no_o4rs",
                        "name": "Skoda Octavia (MK4) RS",
                        "image": "/racing/assets/cars/assetto-no_o4rs-4c245e67.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_aston_martin_victor",
                        "name": "Aston Martin Victor",
                        "image": "/racing/assets/cars/assetto-as_aston_martin_victor-2add1291.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_ford_mustang_2015",
                        "name": "Ford Mustang 2015",
                        "image": "/racing/assets/cars/assetto-ks_ford_mustang_2015-8f2c48db.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_jaguar_f_type_svr",
                        "name": "Jaguar F-Type SVR",
                        "image": "/racing/assets/cars/assetto-as_jaguar_f_type_svr-0bcb62d4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_lamborghini_huracan_performante",
                        "name": "Lamborghini Huracan Performante",
                        "image": "/racing/assets/cars/assetto-ks_lamborghini_huracan_performante-95a51388.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bg_mercedes_amg_hammer_w",
                        "name": "Mercedes-Benz AMG Hammer Wagon",
                        "image": "/racing/assets/cars/assetto-bg_mercedes_amg_hammer_w-35e345f9.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_mercedes_amg_e63s",
                        "name": "Mercedes-Benz E63S AMG",
                        "image": "/racing/assets/cars/assetto-as_mercedes_amg_e63s-1d2b4b22.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bg_nissan_400z",
                        "name": "Nissan 400z",
                        "image": "/racing/assets/cars/assetto-bg_nissan_400z-58094f13.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_pagani_huayra_bc",
                        "name": "Pagani Huayra BC",
                        "image": "/racing/assets/cars/assetto-ks_pagani_huayra_bc-d40bb0c9.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_porsche_911_gt3_992",
                        "name": "Porsche 911 GT3 (992) PDK",
                        "image": "/racing/assets/cars/assetto-as_porsche_911_gt3_992-9852db1a.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "tgn_brabus_g900_2020",
                        "name": "TGN Mercedes-Benz G900 Brabus 2020",
                        "image": "/racing/assets/cars/assetto-tgn_brabus_g900_2020-f0650cdb.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "mkad-ru",
                "title": "МКАД · Шашки с очками",
                "subtitle": "Ночь · Средний трафик",
                "description": "Ночной МКАД, свет фар и знакомые отечественные машины. Выбирай автомобиль с характером, вливайся в спокойный дорожный поток и набирай очки за чистые обгоны.\n\nШашки с подсчётом очков и серий. Столкновение завершает текущую попытку; сохранённый рекорд остаётся.",
                "cover": "/racing/assets/covers/assetto-mkad-ru.webp",
                "tags": [
                    "МКАД",
                    "Шашки с очками"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "28"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "14"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Ночной МКАД, свет фар и знакомые отечественные машины.",
                    "Выбирай автомобиль с характером, вливайся в спокойный дорожный поток и набирай очки за чистые обгоны.",
                    "Шашки с подсчётом очков и серий.",
                    "Столкновение завершает текущую попытку; сохранённый рекорд остаётся."
                ],
                "cars": [
                    {
                        "id": "lada2101street",
                        "name": "lada 2101 streetracing",
                        "image": "/racing/assets/cars/assetto-lada2101street-4f63df51.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "amgeshnik_granta_buhminka001",
                        "name": "Lada Granta @buhminka001",
                        "image": "/racing/assets/cars/assetto-amgeshnik_granta_buhminka001-23c4a08d.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "Vaz_2109_kanjo",
                        "name": "Vaz_2109_kanjo",
                        "image": "/racing/assets/cars/assetto-Vaz_2109_kanjo-60b26eaf.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wa_vaz2107",
                        "name": "VAZ 2107",
                        "image": "/racing/assets/cars/assetto-wa_vaz2107-8bddecec.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_gaz2410",
                        "name": "GAZ 24-10 Volga SMP Historic Cup",
                        "image": "/racing/assets/cars/assetto-smp_gaz2410-c42be832.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "vaz2114 razyeb",
                        "name": "Vaz 2114",
                        "image": "/racing/assets/cars/assetto-vaz2114 razyeb-2dbbc5c0.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_lada_2121",
                        "name": "Lada Niva 2121",
                        "image": "/racing/assets/cars/assetto-cis_lada_2121-feaeed26.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_lada_kalina2_sport",
                        "name": "Lada Kalina 2 Sport",
                        "image": "/racing/assets/cars/assetto-cis_lada_kalina2_sport-3bd89120.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "aazg_lada_2113",
                        "name": "Lada 2113",
                        "image": "/racing/assets/cars/assetto-aazg_lada_2113-b2eb5fca.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "amgeshnik_granta_sportline",
                        "name": "Lada Granta Sportline",
                        "image": "/racing/assets/cars/assetto-amgeshnik_granta_sportline-39c05643.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_vaz_2114",
                        "name": "Lada Samara 2114",
                        "image": "/racing/assets/cars/assetto-cis_vaz_2114-64657e15.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "v1sp_vaz_2114",
                        "name": "VAZ LADA 2114",
                        "image": "/racing/assets/cars/assetto-v1sp_vaz_2114-13050ccd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mby_lada_sputnik_09_kuizand_penguin",
                        "name": "Lada 2109 \"Sputnik\"",
                        "image": "/racing/assets/cars/assetto-mby_lada_sputnik_09_kuizand_penguin-e28f69ac.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "v1sp_vaz_2107_street",
                        "name": "VAZ 2107 Street",
                        "image": "/racing/assets/cars/assetto-v1sp_vaz_2107_street-0a466bbf.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "mkad-lite",
                "title": "МКАД · Шашки с очками",
                "subtitle": "Закат · Трафик ×3",
                "description": "МКАД в закатном свете и плотный поток для тех, кто любит быстрый темп. Мощные дорожные машины и отечественные проекты — выбирай свой стиль и находи путь между рядами.\n\nНабирай очки за чистые обгоны и собирай серию. Столкновение завершает текущую попытку; сохранённый рекорд остаётся.",
                "cover": "/racing/assets/covers/assetto-mkad-lite.webp",
                "tags": [
                    "МКАД",
                    "Шашки с очками"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "23"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "17"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "МКАД в закатном свете и плотный поток для тех, кто любит быстрый темп.",
                    "Мощные дорожные машины и отечественные проекты — выбирай свой стиль и находи путь между рядами.",
                    "Набирай очки за чистые обгоны и собирай серию.",
                    "Столкновение завершает текущую попытку; сохранённый рекорд остаётся."
                ],
                "cars": [
                    {
                        "id": "exmods_audi_rs6gt_avant",
                        "name": "Audi RS6 Avant GT",
                        "image": "/racing/assets/cars/assetto-exmods_audi_rs6gt_avant-4183d8de.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bksy_nissan_skyline_r34_vspec_ii_nur",
                        "name": "BANKSY.Nissan Skyline GTR R34 V-Spec II nür",
                        "image": "/racing/assets/cars/assetto-bksy_nissan_skyline_r34_vspec_ii_nur-36d83075.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "tgn_brabus_g900_2020",
                        "name": "TGN Mercedes-Benz G900 Brabus 2020",
                        "image": "/racing/assets/cars/assetto-tgn_brabus_g900_2020-f0650cdb.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ste_m3_cs_touring",
                        "name": "BMW M3 CS Touring ( G81 )",
                        "image": "/racing/assets/cars/assetto-ste_m3_cs_touring-f97bae71.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "swrvn_bmw_m4_kith_v2",
                        "name": "BMW M4 G82 KITH V3 | SWRVN '21",
                        "image": "/racing/assets/cars/assetto-swrvn_bmw_m4_kith_v2-e51dcfc1.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_ferrari_roma",
                        "name": "Ferrari Roma",
                        "image": "/racing/assets/cars/assetto-as_ferrari_roma-c3b3c9c0.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_jaguar_f_type_svr",
                        "name": "Jaguar F-Type SVR",
                        "image": "/racing/assets/cars/assetto-as_jaguar_f_type_svr-0bcb62d4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_porsche_cayenne",
                        "name": "Porsche Cayenne Turbo S",
                        "image": "/racing/assets/cars/assetto-ks_porsche_cayenne-dad7f956.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_porsche_911_gt3_992",
                        "name": "Porsche 911 GT3 (992) PDK",
                        "image": "/racing/assets/cars/assetto-as_porsche_911_gt3_992-9852db1a.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mercedes_amg_c63s_2017",
                        "name": "Mercedes-Benz C63 S AMG Coupe",
                        "image": "/racing/assets/cars/assetto-mercedes_amg_c63s_2017-58120af4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bg_mercedes_c63_amg_bs",
                        "name": "Mercedes-Benz C63 AMG Black Series",
                        "image": "/racing/assets/cars/assetto-bg_mercedes_c63_amg_bs-9dfc026f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "lada_niva_urban_armenia_spec",
                        "name": "LADA Niva Urban 2021",
                        "image": "/racing/assets/cars/assetto-lada_niva_urban_armenia_spec-7c2b9cf2.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_ferrari_sf15t",
                        "name": "Ferrari SF15-T",
                        "image": "/racing/assets/cars/assetto-ks_ferrari_sf15t-057ecca8.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "amgeshnik_granta_sportline",
                        "name": "Lada Granta Sportline",
                        "image": "/racing/assets/cars/assetto-amgeshnik_granta_sportline-39c05643.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "v1sp_vaz_2114",
                        "name": "VAZ LADA 2114",
                        "image": "/racing/assets/cars/assetto-v1sp_vaz_2114-13050ccd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mby_lada_sputnik_09_kuizand_penguin",
                        "name": "Lada 2109 \"Sputnik\"",
                        "image": "/racing/assets/cars/assetto-mby_lada_sputnik_09_kuizand_penguin-e28f69ac.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "kft_bmw_m8_f93_lci_xas_ru",
                        "name": "xas.ru BMW M8 F93 lci",
                        "image": "/racing/assets/cars/assetto-kft_bmw_m8_f93_lci_xas_ru-26daa685.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "sochi-new",
                "title": "Сочи · Свободная езда и дрифт",
                "subtitle": "Южные серпантины",
                "description": "Из Новороссийска в Сочи: море, серпантины и дорога, на которой хочется задержаться. Прокатись вдоль побережья, найди любимые связки поворотов или собери друзей для совместного заезда.\n\nОтечественные машины, дорожная классика, спортивные седаны и большие внедорожники. Свободная езда, дрифт и лёгкий дорожный трафик — каждый выбирает свой ритм.\n\nДрифт с очками: держи машину в скольжении и связывай повороты в серию. Скорость, угол и длительность заноса увеличивают счёт. Чисто завершённая серия сохраняется в результатах; удар, разворот или выезд с дороги сбрасывает текущую серию. Слева — твой счёт, справа — участники и рекорды Сочи.",
                "cover": "/racing/assets/covers/assetto-sochi-new.webp",
                "tags": [
                    "Сочи",
                    "Свободная езда и дрифт"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "28"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "14"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Из Новороссийска в Сочи: море, серпантины и дорога, на которой хочется задержаться.",
                    "Прокатись вдоль побережья, найди любимые связки поворотов или собери друзей для совместного заезда.",
                    "Отечественные машины, дорожная классика, спортивные седаны и большие внедорожники.",
                    "Свободная езда, дрифт и лёгкий дорожный трафик — каждый выбирает свой ритм.",
                    "Дрифт с очками: держи машину в скольжении и связывай повороты в серию.",
                    "Скорость, угол и длительность заноса увеличивают счёт.",
                    "Чисто завершённая серия сохраняется в результатах; удар, разворот или выезд с дороги сбрасывает текущую серию.",
                    "Слева — твой счёт, справа — участники и рекорды Сочи."
                ],
                "cars": [
                    {
                        "id": "amgeshnik_granta_sportline",
                        "name": "Lada Granta Sportline",
                        "image": "/racing/assets/cars/assetto-amgeshnik_granta_sportline-39c05643.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ms_bmw_f30_320d",
                        "name": "BMW 3 Series F30 320d",
                        "image": "/racing/assets/cars/assetto-ms_bmw_f30_320d-4180c62a.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "v1sp_vaz_2114",
                        "name": "VAZ LADA 2114",
                        "image": "/racing/assets/cars/assetto-v1sp_vaz_2114-13050ccd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "j8_honda_civic_ek9_type_r_98",
                        "name": "Honda Civic Type R EK9",
                        "image": "/racing/assets/cars/assetto-j8_honda_civic_ek9_type_r_98-947734df.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "aazg_lada_2113",
                        "name": "Lada 2113",
                        "image": "/racing/assets/cars/assetto-aazg_lada_2113-b2eb5fca.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mby_lada_sputnik_09_kuizand_penguin",
                        "name": "Lada 2109 \"Sputnik\"",
                        "image": "/racing/assets/cars/assetto-mby_lada_sputnik_09_kuizand_penguin-e28f69ac.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "faz_e34_520i",
                        "name": "BMW E34 520i",
                        "image": "/racing/assets/cars/assetto-faz_e34_520i-0cac73f5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "2017_suzuki_swift",
                        "name": "Suzuki Swift Sport  2017",
                        "image": "/racing/assets/cars/assetto-2017_suzuki_swift-2982c085.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ksk_ford_focus_st",
                        "name": "Ford Focus ST '15 Rework",
                        "image": "/racing/assets/cars/assetto-ksk_ford_focus_st-0e10d232.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "samer_mercedes_benz_w222_maybach_sinner",
                        "name": "CIS Mercedes-Benz S400 X222 Maybach",
                        "image": "/racing/assets/cars/assetto-samer_mercedes_benz_w222_maybach_sinner-00e313dc.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ddm_honda_civic_fd2",
                        "name": "Honda Civic type R (FD2)",
                        "image": "/racing/assets/cars/assetto-ddm_honda_civic_fd2-9f243726.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bmw_z4_30i_2003",
                        "name": "BMW Z4 Convertible 3.0i 2003",
                        "image": "/racing/assets/cars/assetto-bmw_z4_30i_2003-ce92c528.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "toyota_camry_8_a25a",
                        "name": "Toyota Camry 8 2.5",
                        "image": "/racing/assets/cars/assetto-toyota_camry_8_a25a-6981a692.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "emae_200_dorest_enc",
                        "name": "Toyota Land Cruiser 200 REST",
                        "image": "/racing/assets/cars/assetto-emae_200_dorest_enc-9971a6bf.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "spb-cis-test",
                "title": "Санкт-Петербург · ЗСД",
                "subtitle": "Свободная езда · Трафик",
                "description": "Петербургские эстакады, простор ЗСД и поток под колёсами. Мощные седаны, спорткары и внедорожники для свободной поездки через город. Можно ехать вместе, менять темп и просто наслаждаться дорогой.\n\nТрафик встречается на подготовленном участке рядом со стартом. Выезжай с парковки на основную дорогу; остальная карта открыта для прогулок.",
                "cover": "/racing/assets/covers/assetto-spb-cis-test.webp",
                "tags": [
                    "Санкт-Петербург",
                    "ЗСД"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "52"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "26"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Петербургские эстакады, простор ЗСД и поток под колёсами.",
                    "Мощные седаны, спорткары и внедорожники для свободной поездки через город.",
                    "Можно ехать вместе, менять темп и просто наслаждаться дорогой.",
                    "Трафик встречается на подготовленном участке рядом со стартом.",
                    "Выезжай с парковки на основную дорогу; остальная карта открыта для прогулок."
                ],
                "cars": [
                    {
                        "id": "adil_audi_rs6_c7",
                        "name": "Audi RS6 C7",
                        "image": "/racing/assets/cars/assetto-adil_audi_rs6_c7-e1054d09.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_bmw_m3_e92",
                        "name": "CIS BMW M3 E92",
                        "image": "/racing/assets/cars/assetto-cis_bmw_m3_e92-164f673b.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_bmw_m5_e60",
                        "name": "CIS BMW M5 E60",
                        "image": "/racing/assets/cars/assetto-cis_bmw_m5_e60-3df93257.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_bmw_x5m_e70",
                        "name": "CIS BMW X5M E70",
                        "image": "/racing/assets/cars/assetto-cis_bmw_x5m_e70-800179fd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_camaro_ss",
                        "name": "Chevrolet Camaro SS",
                        "image": "/racing/assets/cars/assetto-cis_camaro_ss-2e6f567a.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_e63_w212",
                        "name": "Mercedes-Benz E63 AMG W212",
                        "image": "/racing/assets/cars/assetto-cis_e63_w212-7ddbc79d.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_emae_golf_r7_5",
                        "name": "Volkswagen Golf R 7.5 (5G1)",
                        "image": "/racing/assets/cars/assetto-cis_emae_golf_r7_5-a0df87b0.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_emae_jeep_srt",
                        "name": "CIS Jeep Grand Cherokee SRT",
                        "image": "/racing/assets/cars/assetto-cis_emae_jeep_srt-7b50b342.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_emae_m6_convertible",
                        "name": "BMW M6 F12",
                        "image": "/racing/assets/cars/assetto-cis_emae_m6_convertible-657f59f7.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_faz_m5_f10",
                        "name": "BMW M5 F10 2016",
                        "image": "/racing/assets/cars/assetto-cis_faz_m5_f10-677c7e3c.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_jzx100_chaser",
                        "name": "CIS Toyota Chaser JZX100",
                        "image": "/racing/assets/cars/assetto-cis_jzx100_chaser-f77f4642.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_jzx90_stock",
                        "name": "CIS Toyota Mark 2 JZX90",
                        "image": "/racing/assets/cars/assetto-cis_jzx90_stock-ffe2deac.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_k36s_gtr_07",
                        "name": "Nissan GT-R 07'",
                        "image": "/racing/assets/cars/assetto-cis_k36s_gtr_07-3407f1c9.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_lexus_isf_dorest",
                        "name": "CIS Lexus IS-F pre-facelift",
                        "image": "/racing/assets/cars/assetto-cis_lexus_isf_dorest-b11f57f4.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cis_lr_rr_supercharged",
                        "name": "Land Rover Range Rover Supercharged",
                        "image": "/racing/assets/cars/assetto-cis_lr_rr_supercharged-bb862371.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "duks_cls_w219",
                        "name": "Mercedes Benz CLS63 AMG W219",
                        "image": "/racing/assets/cars/assetto-duks_cls_w219-170926b8.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "emae204morelive",
                        "name": "Mercedes-Benz C63 AMG PRE-LCI",
                        "image": "/racing/assets/cars/assetto-emae204morelive-a2a62c95.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "faz_audi_s8_plus",
                        "name": "CIS Audi S8",
                        "image": "/racing/assets/cars/assetto-faz_audi_s8_plus-ff3f00ac.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "faz_cls63",
                        "name": "Mercedes-Benz CLS 63S AMG",
                        "image": "/racing/assets/cars/assetto-faz_cls63-55b369a3.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gk_bmw_x5m_f85",
                        "name": "BMW X5M F85",
                        "image": "/racing/assets/cars/assetto-gk_bmw_x5m_f85-4e2ea7e8.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "samer_bmw_m5_f90_lci_x011xx",
                        "name": "BMW M5 F90 LCI x011xx93",
                        "image": "/racing/assets/cars/assetto-samer_bmw_m5_f90_lci_x011xx-43849154.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "xasru_m3g80_xzlu1s_25x",
                        "name": "BMW M3 G80 2025 xDrive Rework",
                        "image": "/racing/assets/cars/assetto-xasru_m3g80_xzlu1s_25x-233fd4c4.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "toyota_camry_8_a25a",
                        "name": "Toyota Camry 8 2.5",
                        "image": "/racing/assets/cars/assetto-toyota_camry_8_a25a-6981a692.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "emae_200_dorest_enc",
                        "name": "Toyota Land Cruiser 200 REST",
                        "image": "/racing/assets/cars/assetto-emae_200_dorest_enc-9971a6bf.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "kft_bmw_m8_f93_lci_xas_ru",
                        "name": "xas.ru BMW M8 F93 lci",
                        "image": "/racing/assets/cars/assetto-kft_bmw_m8_f93_lci_xas_ru-26daa685.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "exmods_bentley_gt_speed",
                        "name": "Bentley Continental (IV) GT Speed",
                        "image": "/racing/assets/cars/assetto-exmods_bentley_gt_speed-3c1c8bf5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko-japan",
                "title": "Токио · Японские спорткары",
                "subtitle": "Лёгкий трафик",
                "description": "Японская автомобильная культура на дорогах Токио. Культовые купе и спорткары, ночной дух уличных встреч и свободные заезды по эстакадам Shutoko. Выбирай любимую легенду и отправляйся в поток.",
                "cover": "/racing/assets/covers/assetto-shutoko-japan.webp",
                "tags": [
                    "Токио",
                    "Японские спорткары"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "14"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "7"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Японская автомобильная культура на дорогах Токио.",
                    "Культовые купе и спорткары, ночной дух уличных встреч и свободные заезды по эстакадам Shutoko.",
                    "Выбирай любимую легенду и отправляйся в поток."
                ],
                "cars": [
                    {
                        "id": "ks_mazda_rx7_tuned",
                        "name": "Mazda RX-7 Tuned",
                        "image": "/racing/assets/cars/assetto-ks_mazda_rx7_tuned-ec35ef29.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_nissan_370z",
                        "name": "Nissan 370z Nismo",
                        "image": "/racing/assets/cars/assetto-ks_nissan_370z-15304cab.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_nissan_gtr",
                        "name": "Nissan GT-R NISMO",
                        "image": "/racing/assets/cars/assetto-ks_nissan_gtr-9a0104ef.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bw_toyota_chaser",
                        "name": "Toyota Chaser (JZX100)",
                        "image": "/racing/assets/cars/assetto-bw_toyota_chaser-16969edc.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "sl_toyota_supra_mkiv_ridox",
                        "name": "Toyota Supra MKIV Ridox Body Kit",
                        "image": "/racing/assets/cars/assetto-sl_toyota_supra_mkiv_ridox-af0cb83e.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bksy_nissan_skyline_r34_vspec_ii_nur",
                        "name": "BANKSY.Nissan Skyline GTR R34 V-Spec II nür",
                        "image": "/racing/assets/cars/assetto-bksy_nissan_skyline_r34_vspec_ii_nur-36d83075.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "jr_nissan_r34_vspec2_n1_nismo",
                        "name": "Nissan Skyline GTR R34 V-Spec II N1 NISMO",
                        "image": "/racing/assets/cars/assetto-jr_nissan_r34_vspec2_n1_nismo-b9173914.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko",
                "title": "Токио · Суперкары и SUV",
                "subtitle": "Лёгкий трафик",
                "description": "Яркие суперкары, быстрые SUV и большое токийское шоссе. Сравни характер необычных машин, прокатись с друзьями и найди автомобиль под своё настроение. Свободная езда с лёгким трафиком без общего гоночного зачёта.",
                "cover": "/racing/assets/covers/assetto-shutoko.webp",
                "tags": [
                    "Токио",
                    "Суперкары и SUV"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "28"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "14"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Яркие суперкары, быстрые SUV и большое токийское шоссе.",
                    "Сравни характер необычных машин, прокатись с друзьями и найди автомобиль под своё настроение.",
                    "Свободная езда с лёгким трафиком без общего гоночного зачёта."
                ],
                "cars": [
                    {
                        "id": "as_aston_martin_victor",
                        "name": "Aston Martin Victor",
                        "image": "/racing/assets/cars/assetto-as_aston_martin_victor-2add1291.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ms_audi_etron_gt",
                        "name": "Audi Etron RS GT",
                        "image": "/racing/assets/cars/assetto-ms_audi_etron_gt-b0be44c1.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cd_bentley_continental",
                        "name": "Bentley Continental GT",
                        "image": "/racing/assets/cars/assetto-cd_bentley_continental-bc460250.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "swrvn_bmw_m4_kith_v2",
                        "name": "BMW M4 G82 KITH V3 | SWRVN '21",
                        "image": "/racing/assets/cars/assetto-swrvn_bmw_m4_kith_v2-e51dcfc1.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ms_bmw_x6m_2015_tune",
                        "name": "BMW X6M 2015 Tune",
                        "image": "/racing/assets/cars/assetto-ms_bmw_x6m_2015_tune-2c4a2799.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "PurSport",
                        "name": "Bugatti Chiron Pur Sport",
                        "image": "/racing/assets/cars/assetto-PurSport-a216be20.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_ferrari_daytona_sp3_2022",
                        "name": "Ferrari Daytona SP3",
                        "image": "/racing/assets/cars/assetto-as_ferrari_daytona_sp3_2022-c08b93bb.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_ferrari_fxx_k",
                        "name": "Ferrari FXX K",
                        "image": "/racing/assets/cars/assetto-ks_ferrari_fxx_k-12c46ddd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_ferrari_roma",
                        "name": "Ferrari Roma",
                        "image": "/racing/assets/cars/assetto-as_ferrari_roma-c3b3c9c0.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_lambo_countach_2022",
                        "name": "Lamborghini Countach LPI 800-4",
                        "image": "/racing/assets/cars/assetto-as_lambo_countach_2022-19192b0d.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mercedes_amg_c63s_2017_tuned",
                        "name": "Mercedes-Benz C63 S AMG Coupe tuned",
                        "image": "/racing/assets/cars/assetto-mercedes_amg_c63s_2017_tuned-1af5d1b3.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "cky_ferrari_purosangue_2024",
                        "name": "Ferrari Purosangue",
                        "image": "/racing/assets/cars/assetto-cky_ferrari_purosangue_2024-63825f61.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "exmods_bugatti_mistral_tech",
                        "name": "Bugatti Mistral TECH Special",
                        "image": "/racing/assets/cars/assetto-exmods_bugatti_mistral_tech-6ed901e5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "exmods_bentley_gt_speed",
                        "name": "Bentley Continental (IV) GT Speed",
                        "image": "/racing/assets/cars/assetto-exmods_bentley_gt_speed-3c1c8bf5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko-mix",
                "title": "Токио · Свободные заезды",
                "subtitle": "Смешанный автопарк",
                "description": "Токио для любой компании. Дорожные седаны, спортивные купе и машины на каждый день в одном автопарке. Собирайтесь вместе, исследуйте развязки Shutoko и катайтесь в своём темпе среди дорожного потока.",
                "cover": "/racing/assets/covers/assetto-shutoko-mix.webp",
                "tags": [
                    "Токио",
                    "Свободные заезды"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "25"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "16"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Токио для любой компании.",
                    "Дорожные седаны, спортивные купе и машины на каждый день в одном автопарке.",
                    "Собирайтесь вместе, исследуйте развязки Shutoko и катайтесь в своём темпе среди дорожного потока."
                ],
                "cars": [
                    {
                        "id": "ks_porsche_panamera",
                        "name": "Porsche Panamera Turbo",
                        "image": "/racing/assets/cars/assetto-ks_porsche_panamera-c55e01b4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ste_m3_cs_touring",
                        "name": "BMW M3 CS Touring ( G81 )",
                        "image": "/racing/assets/cars/assetto-ste_m3_cs_touring-f97bae71.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_bmw_m4",
                        "name": "BMW M4",
                        "image": "/racing/assets/cars/assetto-ks_bmw_m4-9d7c6766.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ford_rs_18",
                        "name": "Ford Focus RS",
                        "image": "/racing/assets/cars/assetto-ford_rs_18-9341bac5.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "no_o4rs",
                        "name": "Skoda Octavia (MK4) RS",
                        "image": "/racing/assets/cars/assetto-no_o4rs-4c245e67.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_aston_martin_victor",
                        "name": "Aston Martin Victor",
                        "image": "/racing/assets/cars/assetto-as_aston_martin_victor-2add1291.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_ford_mustang_2015",
                        "name": "Ford Mustang 2015",
                        "image": "/racing/assets/cars/assetto-ks_ford_mustang_2015-8f2c48db.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_jaguar_f_type_svr",
                        "name": "Jaguar F-Type SVR",
                        "image": "/racing/assets/cars/assetto-as_jaguar_f_type_svr-0bcb62d4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_lamborghini_huracan_performante",
                        "name": "Lamborghini Huracan Performante",
                        "image": "/racing/assets/cars/assetto-ks_lamborghini_huracan_performante-95a51388.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bg_mercedes_amg_hammer_w",
                        "name": "Mercedes-Benz AMG Hammer Wagon",
                        "image": "/racing/assets/cars/assetto-bg_mercedes_amg_hammer_w-35e345f9.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_mercedes_amg_e63s",
                        "name": "Mercedes-Benz E63S AMG",
                        "image": "/racing/assets/cars/assetto-as_mercedes_amg_e63s-1d2b4b22.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bg_nissan_400z",
                        "name": "Nissan 400z",
                        "image": "/racing/assets/cars/assetto-bg_nissan_400z-58094f13.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "ks_pagani_huayra_bc",
                        "name": "Pagani Huayra BC",
                        "image": "/racing/assets/cars/assetto-ks_pagani_huayra_bc-d40bb0c9.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "as_porsche_911_gt3_992",
                        "name": "Porsche 911 GT3 (992) PDK",
                        "image": "/racing/assets/cars/assetto-as_porsche_911_gt3_992-9852db1a.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "tgn_brabus_g900_2020",
                        "name": "TGN Mercedes-Benz G900 Brabus 2020",
                        "image": "/racing/assets/cars/assetto-tgn_brabus_g900_2020-f0650cdb.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "toyota_camry_8_a25a",
                        "name": "Toyota Camry 8 2.5",
                        "image": "/racing/assets/cars/assetto-toyota_camry_8_a25a-6981a692.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "shutoko-drift",
                "title": "Токио · Дрифт в трафике",
                "subtitle": "WDTS",
                "description": "Дрифт на токийских эстакадах. Подготовленные машины WDTS, длинные дуги и дорожный поток, который требует внимания. Тренируй перекладки, ищи чистую траекторию и собирай друзей для совместных проездов.",
                "cover": "/racing/assets/covers/assetto-shutoko-drift.webp",
                "tags": [
                    "Токио",
                    "Дрифт в трафике"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "8"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "8"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Дрифт на токийских эстакадах.",
                    "Подготовленные машины WDTS, длинные дуги и дорожный поток, который требует внимания.",
                    "Тренируй перекладки, ищи чистую траекторию и собирай друзей для совместных проездов."
                ],
                "cars": [
                    {
                        "id": "wdts2023_nissan_silvia_s14",
                        "name": "WDTS 2023 Nissan Silvia S14",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_silvia_s14-cca00502.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_silvia_s15",
                        "name": "WDTS 2023 Nissan Silvia S15",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_silvia_s15-c9941726.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_skyline_hr34",
                        "name": "WDTS 2023 Nissan Skyline HR34",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_skyline_hr34-d10bfb0d.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_skyline_r32",
                        "name": "WDTS 2023 Nissan Skyline R32",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_skyline_r32-e3922e33.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_ae86",
                        "name": "WDTS 2023 Toyota AE86",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_ae86-2880939f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_cresta_jzx100",
                        "name": "WDTS 2023 Toyota Cresta JZX100",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_cresta_jzx100-0eef916c.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_mark_ii_jzx90",
                        "name": "WDTS 2023 Toyota Mark II JZX90",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_mark_ii_jzx90-0ccc988d.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_soarer",
                        "name": "WDTS 2023 Toyota Soarer",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_soarer-9c3ad45f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "wdts-highlands",
                "title": "Highlands · Дрифт",
                "subtitle": "WDTS",
                "description": "Широкая дорога Highlands и дрифтовые машины WDTS. Пространство для длинных дуг, уверенных перекладок и тренировок в компании. Выезжай в свободную сессию, осваивай машину и находи свой ритм.",
                "cover": "/racing/assets/covers/assetto-wdts-highlands.webp",
                "tags": [
                    "Highlands",
                    "Дрифт"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "11"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "11"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Широкая дорога Highlands и дрифтовые машины WDTS.",
                    "Пространство для длинных дуг, уверенных перекладок и тренировок в компании.",
                    "Выезжай в свободную сессию, осваивай машину и находи свой ритм."
                ],
                "cars": [
                    {
                        "id": "wdts2023_nissan_180sx",
                        "name": "WDTS 2023 Nissan 180SX",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_180sx-87899b30.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_laurel_c33",
                        "name": "WDTS 2023 Nissan Laurel C33",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_laurel_c33-87ffc5a7.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_silvia_s13",
                        "name": "WDTS 2023 Nissan Silvia S13",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_silvia_s13-6d8606cd.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_silvia_s14",
                        "name": "WDTS 2023 Nissan Silvia S14",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_silvia_s14-cca00502.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_silvia_s15",
                        "name": "WDTS 2023 Nissan Silvia S15",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_silvia_s15-c9941726.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_skyline_hr34",
                        "name": "WDTS 2023 Nissan Skyline HR34",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_skyline_hr34-d10bfb0d.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_nissan_skyline_r32",
                        "name": "WDTS 2023 Nissan Skyline R32",
                        "image": "/racing/assets/cars/assetto-wdts2023_nissan_skyline_r32-e3922e33.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_ae86",
                        "name": "WDTS 2023 Toyota AE86",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_ae86-2880939f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_cresta_jzx100",
                        "name": "WDTS 2023 Toyota Cresta JZX100",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_cresta_jzx100-0eef916c.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_mark_ii_jzx90",
                        "name": "WDTS 2023 Toyota Mark II JZX90",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_mark_ii_jzx90-0ccc988d.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "wdts2023_toyota_soarer",
                        "name": "WDTS 2023 Toyota Soarer",
                        "image": "/racing/assets/cars/assetto-wdts2023_toyota_soarer-9c3ad45f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "f1-sochi",
                "title": "Сочи Автодром · Формула-1",
                "subtitle": "Свободная тренировка",
                "description": "Формульная скорость на Сочи Автодроме. Открытые колёса, резкие торможения и точные траектории: почувствуй, как работает гоночная машина. Свободная тренировка с AI на трассе — учись проходить повороты и улучшай собственный темп.",
                "cover": "/racing/assets/covers/assetto-f1-sochi.webp",
                "tags": [
                    "Сочи Автодром",
                    "Формула-1"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "12"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "3"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Формульная скорость на Сочи Автодроме.",
                    "Открытые колёса, резкие торможения и точные траектории: почувствуй, как работает гоночная машина.",
                    "Свободная тренировка с AI на трассе — учись проходить повороты и улучшай собственный темп."
                ],
                "cars": [
                    {
                        "id": "rtt_formula_2024_f1_w15",
                        "name": "RTT Formula 2024 F1 W15",
                        "image": "/racing/assets/cars/assetto-rtt_formula_2024_f1_w15-93e6b62c.webp",
                        "note": "4 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gp_2022_vf22",
                        "name": "F1 2022 VF-22 '22 (SDGP)",
                        "image": "/racing/assets/cars/assetto-gp_2022_vf22-4cdf6c66.webp",
                        "note": "4 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "syn_ferrari_f175",
                        "name": "Ferrari F1-75 S1",
                        "image": "/racing/assets/cars/assetto-syn_ferrari_f175-f3660c46.webp",
                        "note": "4 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "gt3-silverstone",
                "title": "Сильверстоун · GT3",
                "subtitle": "Свободная тренировка",
                "description": "Silverstone и гоночные автомобили GT3. Быстрые связки, стабильное сцепление и простор для точной работы рулём. Свободная тренировка с AI: привыкай к машине, отрабатывай торможения и собирай чистые круги.",
                "cover": "/racing/assets/covers/assetto-gt3-silverstone.webp",
                "tags": [
                    "Сильверстоун",
                    "GT3"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "10"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "3"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "100%"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "100%"
                    },
                    {
                        "label": "Износ шин",
                        "value": "100%"
                    }
                ],
                "rules": [
                    "Silverstone и гоночные автомобили GT3.",
                    "Быстрые связки, стабильное сцепление и простор для точной работы рулём.",
                    "Свободная тренировка с AI: привыкай к машине, отрабатывай торможения и собирай чистые круги."
                ],
                "cars": [
                    {
                        "id": "bmw_z4_gt3",
                        "name": "BMW Z4 GT3",
                        "image": "/racing/assets/cars/assetto-bmw_z4_gt3-94f6ab7a.webp",
                        "note": "3 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mclaren_mp412c_gt3",
                        "name": "McLaren MP4-12C GT3",
                        "image": "/racing/assets/cars/assetto-mclaren_mp412c_gt3-1a697190.webp",
                        "note": "4 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mercedes_sls_gt3",
                        "name": "Mercedes SLS AMG GT3",
                        "image": "/racing/assets/cars/assetto-mercedes_sls_gt3-e695314a.webp",
                        "note": "3 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "gt4-nurburgring",
                "title": "Нюрбургринг GP · GT4",
                "subtitle": "Свободная тренировка",
                "description": "Нюрбургринг GP за рулём GT4. Узнаваемые дорожные силуэты в гоночном исполнении и трасса, которая учит аккуратности. Выбирай любимую марку и оттачивай траектории в свободной тренировке с AI.",
                "cover": "/racing/assets/covers/assetto-gt4-nurburgring.webp",
                "tags": [
                    "Нюрбургринг GP",
                    "GT4"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "18"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "9"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Нюрбургринг GP за рулём GT4.",
                    "Узнаваемые дорожные силуэты в гоночном исполнении и трасса, которая учит аккуратности.",
                    "Выбирай любимую марку и оттачивай траектории в свободной тренировке с AI."
                ],
                "cars": [
                    {
                        "id": "gt4_aston_martin_vantage",
                        "name": "Aston Martin Vantage GT4",
                        "image": "/racing/assets/cars/assetto-gt4_aston_martin_vantage-f4b2889f.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_audi_r8",
                        "name": "Audi R8 LMS GT4",
                        "image": "/racing/assets/cars/assetto-gt4_audi_r8-dcdfef0f.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_bmw_m4",
                        "name": "BMW M4 GT4",
                        "image": "/racing/assets/cars/assetto-gt4_bmw_m4-cca7f1dd.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_bmw_m4_g82",
                        "name": "BMW M4 GT4 G82",
                        "image": "/racing/assets/cars/assetto-gt4_bmw_m4_g82-6bc222ee.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_ginetta_g55",
                        "name": "Ginetta G55 GT4",
                        "image": "/racing/assets/cars/assetto-gt4_ginetta_g55-fdac1561.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_mercedes_amg",
                        "name": "Mercedes AMG GT4",
                        "image": "/racing/assets/cars/assetto-gt4_mercedes_amg-8aed4ca0.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_porsche_cayman_718",
                        "name": "Porsche 718 Cayman GT4 Clubsport",
                        "image": "/racing/assets/cars/assetto-gt4_porsche_cayman_718-c8561c58.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_saleen_s1",
                        "name": "Saleen S1 GT4",
                        "image": "/racing/assets/cars/assetto-gt4_saleen_s1-dae056c4.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "gt4_toyota_supra",
                        "name": "Toyota Supra GT4",
                        "image": "/racing/assets/cars/assetto-gt4_toyota_supra-fca76e90.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "gt3-nordschleife",
                "title": "Нордшляйфе · Трек-день",
                "subtitle": "GT3 и российские машины",
                "description": "Трек-день на Северной петле. Гоночные GT3 и отечественные машины встречаются на легендарной трассе с перепадами высот и сложными связками. Изучай повороты, пропускай более быстрых и наслаждайся каждым чистым проездом.",
                "cover": "/racing/assets/covers/assetto-gt3-nordschleife.webp",
                "tags": [
                    "Нордшляйфе",
                    "Трек-день"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "10"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "8"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "100%"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "100%"
                    },
                    {
                        "label": "Износ шин",
                        "value": "100%"
                    }
                ],
                "rules": [
                    "Трек-день на Северной петле.",
                    "Гоночные GT3 и отечественные машины встречаются на легендарной трассе с перепадами высот и сложными связками.",
                    "Изучай повороты, пропускай более быстрых и наслаждайся каждым чистым проездом."
                ],
                "cars": [
                    {
                        "id": "mclaren_mp412c_gt3",
                        "name": "McLaren MP4-12C GT3",
                        "image": "/racing/assets/cars/assetto-mclaren_mp412c_gt3-1a697190.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "bmw_z4_gt3",
                        "name": "BMW Z4 GT3",
                        "image": "/racing/assets/cars/assetto-bmw_z4_gt3-94f6ab7a.webp",
                        "note": "2 места в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "mercedes_sls_gt3",
                        "name": "Mercedes SLS AMG GT3",
                        "image": "/racing/assets/cars/assetto-mercedes_sls_gt3-e695314a.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_lada_kalina_nfr_r1_winter",
                        "name": "LADA Kalina NFR R1 Winter",
                        "image": "/racing/assets/cars/assetto-smp_lada_kalina_nfr_r1_winter-7d4cc25f.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_lada_kalina_nfr_r1",
                        "name": "Lada Kalina NFR R1",
                        "image": "/racing/assets/cars/assetto-smp_lada_kalina_nfr_r1-77637041.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_lada_granta_tcl",
                        "name": "Lada Granta Touring-Light",
                        "image": "/racing/assets/cars/assetto-smp_lada_granta_tcl-fe31c566.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_lada_granta_s1600",
                        "name": "Lada Granta S1600",
                        "image": "/racing/assets/cars/assetto-smp_lada_granta_s1600-0f056ee4.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    },
                    {
                        "id": "smp_gaz2410",
                        "name": "GAZ 24-10 Volga SMP Historic Cup",
                        "image": "/racing/assets/cars/assetto-smp_gaz2410-c42be832.webp",
                        "note": "1 место в этой комнате",
                        "role": ""
                    }
                ]
            },
            {
                "id": "classik-e30",
                "title": "Монца 1966 · Классика",
                "subtitle": "BMW M3 E30",
                "description": "Классическая Монца и характер BMW M3 E30. Задний привод, честные реакции и историческая трасса для удовольствия от самого вождения. Свободная тренировка на одинаковых машинах: совершенствуй технику и находи свой темп.",
                "cover": "/racing/assets/covers/assetto-classik-e30.webp",
                "tags": [
                    "Монца 1966",
                    "Классика"
                ],
                "facts": [
                    {
                        "label": "Мест на сервере",
                        "value": "8"
                    },
                    {
                        "label": "Моделей на выбор",
                        "value": "1"
                    },
                    {
                        "label": "Трафик",
                        "value": "Есть"
                    },
                    {
                        "label": "Повреждения",
                        "value": "Выключены"
                    },
                    {
                        "label": "Расход топлива",
                        "value": "Выключен"
                    },
                    {
                        "label": "Износ шин",
                        "value": "Выключен"
                    }
                ],
                "rules": [
                    "Классическая Монца и характер BMW M3 E30.",
                    "Задний привод, честные реакции и историческая трасса для удовольствия от самого вождения.",
                    "Свободная тренировка на одинаковых машинах: совершенствуй технику и находи свой темп."
                ],
                "cars": [
                    {
                        "id": "bmw_m3_e30_s1",
                        "name": "BMW M3 E30 Step1",
                        "image": "/racing/assets/cars/assetto-bmw_m3_e30_s1-7e7d8b6d.webp",
                        "note": "8 мест в этой комнате",
                        "role": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "beamng",
        "name": "BeamNG.drive",
        "description": "Дерби, погони, наводнение и экстремальные спуски. Выбирайте маршрут и машину: физика повреждений делает каждый заезд своим.",
        "rooms": [
            {
                "id": "downhill",
                "title": "Остаться в живых",
                "subtitle": "Наводнение · Flood Escape",
                "description": "Вода поднимается в кратере Flood Escape Crater. Поднимайтесь выше и продержитесь до конца раунда.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-downhill.webp",
                "tags": [
                    "Наводнение",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "5"
                    }
                ],
                "rules": [
                    "Вода поднимается в кратере Flood Escape Crater. Поднимайтесь выше и продержитесь до конца раунда.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "pursuit",
                "title": "Погоня",
                "subtitle": "Беглец и перехватчики",
                "description": "Беглец против перехватчиков. Продержитесь 10 минут или остановите беглеца рядом с перехватчиком на 7 секунд. Роли меняются между раундами.\n\nБеглец: Gavril Grand Marshal (штатная), Lada Priora, Mercedes-AMG CLA45 S.\nПерехватчики: Gavril Grand Marshal — полиция (штатная), Mercedes-AMG CLA45 S.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-pursuit.webp",
                "tags": [
                    "Беглец и перехватчики",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "5"
                    }
                ],
                "rules": [
                    "Беглец против перехватчиков. Продержитесь 10 минут или остановите беглеца рядом с перехватчиком на 7 секунд. Роли меняются между раундами.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "runner-default",
                        "name": "Gavril Grand Marshal",
                        "image": "/racing/assets/cars/beamng-vehicle-fullsize-stock-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "runner"
                    },
                    {
                        "id": "runner-priora",
                        "name": "Lada Priora",
                        "image": "/racing/assets/cars/beamng-vehicle-priora-v030.webp",
                        "note": "На выбор",
                        "role": "runner"
                    },
                    {
                        "id": "runner-mercedes",
                        "name": "Mercedes-AMG CLA45 S",
                        "image": "/racing/assets/cars/beamng-vehicle-mercedes-v030.webp",
                        "note": "На выбор",
                        "role": "runner"
                    },
                    {
                        "id": "police-default",
                        "name": "Gavril Grand Marshal — полиция",
                        "image": "/racing/assets/cars/beamng-vehicle-fullsize-police-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "police"
                    },
                    {
                        "id": "police-mercedes",
                        "name": "Mercedes-AMG CLA45 S",
                        "image": "/racing/assets/cars/beamng-vehicle-mercedes-v030.webp",
                        "note": "На выбор",
                        "role": "police"
                    }
                ]
            },
            {
                "id": "derby",
                "title": "Дерби",
                "subtitle": "Арена столкновений",
                "description": "Дерби на арене: последний на ходу побеждает. 15 секунд без движения, выезд за границу арены или восстановление машины — сход. Новый раунд начинается автоматически.\n\nМашины для заезда: Gavril Grand Marshal (штатная), Lada Priora.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-derby.webp",
                "tags": [
                    "Арена столкновений",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "2"
                    }
                ],
                "rules": [
                    "Дерби на арене: последний на ходу побеждает. 15 секунд без движения, выезд за границу арены или восстановление машины — сход. Новый раунд начинается автоматически.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril Grand Marshal",
                        "image": "/racing/assets/cars/beamng-vehicle-fullsize-stock-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-priora",
                        "name": "Lada Priora",
                        "image": "/racing/assets/cars/beamng-vehicle-priora-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "bluff-derby",
                "title": "Bluff Bash",
                "subtitle": "Дерби · вся карта",
                "description": "Дерби на всей трассе Bluff Bash: выбирайте свой путь и оставайтесь на ходу. Последний участник побеждает. 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-bluff-derby.webp",
                "tags": [
                    "Дерби",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "5"
                    }
                ],
                "rules": [
                    "Дерби на всей трассе Bluff Bash: выбирайте свой путь и оставайтесь на ходу. Последний участник побеждает. 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "mayhem",
                "title": "Mayhem",
                "subtitle": "Спуск с препятствиями",
                "description": "Downhill Mayhem: экстремальный спуск с препятствиями. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), КамАЗ K5, RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-mayhem.webp",
                "tags": [
                    "Спуск с препятствиями",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "6"
                    }
                ],
                "rules": [
                    "Downhill Mayhem: экстремальный спуск с препятствиями. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-kamaz",
                        "name": "КамАЗ K5",
                        "image": "/racing/assets/cars/beamng-vehicle-kamaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "leap",
                "title": "Leap of Death",
                "subtitle": "Экстремальный спуск",
                "description": "Leap of Death: прыжки и экстремальный спуск. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), КамАЗ K5, RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-leap.webp",
                "tags": [
                    "Экстремальный спуск",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "6"
                    }
                ],
                "rules": [
                    "Leap of Death: прыжки и экстремальный спуск. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-kamaz",
                        "name": "КамАЗ K5",
                        "image": "/racing/assets/cars/beamng-vehicle-kamaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "dangerous-day",
                "title": "Горные дороги · день",
                "subtitle": "Узкие серпантины",
                "description": "Dangerous Roads: узкие горные дороги при дневном освещении. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), КамАЗ K5, RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-dangerous-day.webp",
                "tags": [
                    "Узкие серпантины",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "6"
                    }
                ],
                "rules": [
                    "Dangerous Roads: узкие горные дороги при дневном освещении. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-kamaz",
                        "name": "КамАЗ K5",
                        "image": "/racing/assets/cars/beamng-vehicle-kamaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "dangerous-rain",
                "title": "Горные дороги · дождь",
                "subtitle": "Скользкие серпантины",
                "description": "Dangerous Roads Rainy: узкие горные дороги в дождь. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), КамАЗ K5, RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-dangerous-rain.webp",
                "tags": [
                    "Скользкие серпантины",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "6"
                    }
                ],
                "rules": [
                    "Dangerous Roads Rainy: узкие горные дороги в дождь. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-kamaz",
                        "name": "КамАЗ K5",
                        "image": "/racing/assets/cars/beamng-vehicle-kamaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            },
            {
                "id": "endurance",
                "title": "Endurance",
                "subtitle": "Спуск на выносливость",
                "description": "Downhill Endurance: длинный спуск на выносливость. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.\n\nМашины для заезда: Gavril D-Series D15 V8 4WD (штатная), КамАЗ K5, RAM 2500, Toyota Hilux 4WD, Lada Niva Bronto, УАЗ Патриот Adventure.\n\nВыберите машину в панели режима перед стартом или между раундами. Фотографии и комплектации — во вкладке «Автомобили».",
                "cover": "/racing/assets/covers/beamng-endurance.webp",
                "tags": [
                    "Спуск на выносливость",
                    "Наш сервер"
                ],
                "facts": [
                    {
                        "label": "Игроков",
                        "value": "1–6"
                    },
                    {
                        "label": "Вариантов машин",
                        "value": "6"
                    }
                ],
                "rules": [
                    "Downhill Endurance: длинный спуск на выносливость. Раунд на выживание — последний на ходу побеждает. Зачёта финишного времени нет; 45 секунд без движения или восстановление машины — сход.",
                    "Выберите машину в панели режима перед стартом или между раундами."
                ],
                "cars": [
                    {
                        "id": "driver-default",
                        "name": "Gavril D-Series D15 V8 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-pickup-d15_4wd_A_facelift-v030.webp",
                        "note": "Штатная машина. На фото базовая версия; в заезде — цвет и номер симулятора.",
                        "role": "driver"
                    },
                    {
                        "id": "driver-kamaz",
                        "name": "КамАЗ K5",
                        "image": "/racing/assets/cars/beamng-vehicle-kamaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-ram",
                        "name": "RAM 2500",
                        "image": "/racing/assets/cars/beamng-vehicle-ram-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-hilux",
                        "name": "Toyota Hilux 4WD",
                        "image": "/racing/assets/cars/beamng-vehicle-hilux-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-niva",
                        "name": "Lada Niva Bronto",
                        "image": "/racing/assets/cars/beamng-vehicle-niva-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    },
                    {
                        "id": "driver-uaz",
                        "name": "УАЗ Патриот Adventure",
                        "image": "/racing/assets/cars/beamng-vehicle-uaz-v030.webp",
                        "note": "На выбор",
                        "role": "driver"
                    }
                ]
            }
        ]
    }
];
