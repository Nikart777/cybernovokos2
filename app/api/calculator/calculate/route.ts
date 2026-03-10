import { CLUBS, langameGet } from "@/lib/calculator";
import {
    getTodayTariffGroup,
    TARIFF_TYPE_MAP,
    findPerMinutePrice,
    findPackagePrice,
    findNightPrice,
} from "@/lib/calculator-helpers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { club, zone, tariff_type, minutes_spent, is_booking = false } = body;

        const clubConfig = CLUBS[club];
        if (!clubConfig) {
            return Response.json({ error: "Клуб не найден" }, { status: 404 });
        }

        if (!clubConfig.zones[zone]) {
            return Response.json({ error: `Зона ${zone} не найдена в клубе` }, { status: 400 });
        }

        const zoneName = clubConfig.zones[zone];
        const minutes = Number(minutes_spent);
        if (isNaN(minutes) || minutes < 1) {
            return Response.json({ error: "Минимум 1 минута" }, { status: 400 });
        }

        const tariffGroup = await getTodayTariffGroup(club);

        const [tariffs, typesGroups, groups] = await Promise.all([
            langameGet(club, "tariffs/time_period/list"),
            langameGet(club, "tariffs/types_groups/list"),
            langameGet(club, "tariffs/groups/list"),
        ]);

        // Format current time HH:MM:SS
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");
        const currentTime = `${hh}:${mm}:${ss}`;

        let groupName = "";
        for (const g of groups) {
            if (g.id === tariffGroup) {
                groupName = g.name;
                break;
            }
        }

        const tariffInfo = TARIFF_TYPE_MAP[tariff_type];
        if (!tariffInfo) {
            return Response.json({ error: `Неизвестный тип тарифа: ${tariff_type}` }, { status: 400 });
        }

        let compensation = 0.0;
        let calculationDetails = "";

        if (tariff_type === "minute") {
            const pricePerHour = findPerMinutePrice(tariffs, zone, tariffGroup, currentTime);
            if (pricePerHour === 0) {
                return Response.json({ error: "Не найден поминутный тариф для текущего времени и зоны" }, { status: 404 });
            }
            const pricePerMin = pricePerHour / 60;
            compensation = pricePerMin * minutes;
            calculationDetails = `${pricePerHour}₽/час ÷ 60 = ${pricePerMin.toFixed(2)}₽/мин × ${minutes} мин = ${Math.round(compensation)}₽`;
        } else if (tariff_type === "3h" || tariff_type === "5h") {
            const packetId = tariffInfo.packet_id!;
            const durationMin = tariffInfo.duration_min!;
            const [packagePrice] = findPackagePrice(tariffs, zone, tariffGroup, currentTime, packetId);
            if (packagePrice === 0) {
                return Response.json({ error: "Не найден тариф пакета для текущего времени и зоны" }, { status: 404 });
            }
            const pricePerMinute = packagePrice / durationMin;
            compensation = pricePerMinute * minutes;
            calculationDetails = `Пакет ${Math.floor(durationMin / 60)}ч = ${packagePrice}₽ → ${pricePerMinute.toFixed(2)}₽/мин × ${minutes} мин = ${Math.round(compensation)}₽`;
        } else if (tariff_type === "night") {
            const [nightPrice, nightPacketId] = findNightPrice(tariffs, zone, tariffGroup, typesGroups);
            if (nightPrice === 0) {
                return Response.json({ error: "Не найден ночной тариф для текущей зоны" }, { status: 404 });
            }

            let nightDuration = 0;
            for (const tg of typesGroups) {
                if (tg.id === nightPacketId) {
                    nightDuration = tg.duration || 480;
                    break;
                }
            }
            if (nightDuration === 0) {
                nightDuration = 480;
            }
            const pricePerMinute = nightPrice / nightDuration;
            compensation = pricePerMinute * minutes;
            calculationDetails = `Ночной = ${nightPrice}₽ (${nightDuration} мин) → ${pricePerMinute.toFixed(2)}₽/мин × ${minutes} мин = ${Math.round(compensation)}₽`;
        }

        let isBooking = is_booking;
        let bookingDiscount = 0;
        if (isBooking) {
            bookingDiscount = Math.round(compensation * 0.05);
            compensation = compensation - compensation * 0.05;
            calculationDetails += ` (бронь −5%: −${bookingDiscount}₽)`;
        }

        return Response.json({
            club: clubConfig.name,
            zone: zoneName,
            tariff_type: tariffInfo.label,
            day_type: groupName,
            minutes,
            is_booking: isBooking,
            compensation: Math.round(compensation),
            details: calculationDetails,
            current_time: currentTime,
        });
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
