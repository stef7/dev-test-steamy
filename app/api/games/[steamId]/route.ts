import { steamApi } from "@/util/steam/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params: { steamId } }: { params: { steamId: string } },
) {
  const info = await steamApi.getUserOwnedGames(steamId, {
    includeExtendedAppInfo: true,
  });

  return NextResponse.json(info);
}
