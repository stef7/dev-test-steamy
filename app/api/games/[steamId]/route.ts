import { NextRequest, NextResponse } from "next/server";

import { steamWebApiKey } from "@/util/environment";

export async function GET(
  _req: NextRequest,
  { params: { steamId } }: { params: { steamId: string } },
) {
  const resJson = await fetch(
    `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${steamWebApiKey}&steamid=${steamId}&format=json`,
  ).then((res) => res.json());

  return NextResponse.json(resJson);
}
