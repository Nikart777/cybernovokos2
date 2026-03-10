import { CLUBS, langameGet } from "@/lib/calculator";

export async function GET() {
    const clubsResponse = Object.entries(CLUBS).map(([id, config]) => ({
        id,
        name: config.name,
        zones: config.zones,
    }));

    return Response.json(clubsResponse);
}
