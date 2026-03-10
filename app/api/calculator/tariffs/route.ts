import { langameGet } from "@/lib/calculator";
import { getTodayTariffGroup } from "@/lib/calculator-helpers";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const clubId = searchParams.get("club_id");

    if (!clubId) {
        return Response.json({ error: "club_id is required" }, { status: 400 });
    }

    try {
        const typesGroups = await langameGet(clubId, "tariffs/types_groups/list");
        const groups = await langameGet(clubId, "tariffs/groups/list");

        const tariffGroup = await getTodayTariffGroup(clubId);
        let groupName = "";
        for (const g of groups) {
            if (g.id === tariffGroup) {
                groupName = g.name;
                break;
            }
        }

        return Response.json({
            tariff_group: tariffGroup,
            group_name: groupName,
            types_groups: typesGroups.filter((t: any) => t.is_deleted === 0),
        });
    } catch (err: any) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
