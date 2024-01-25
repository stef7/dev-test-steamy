import { getOwnedGamesInfo } from "@/util/steam/api";
import { NextRequest, NextResponse } from "next/server";

export type GamesResponse = Awaited<ReturnType<typeof getGames>>;

export const getGames = async (steamId: string) => {
  const games = await getOwnedGamesInfo(steamId);
  return {
    totalCount: games.length,
    totalHours: games.reduce((result, game) => result + game.minutes, 0) / 60,
    gamesMostPlayed: games
      .toSorted((a, b) => b.minutes - a.minutes)
      // .slice(0, 10) // to get first X most played. assuming all for now
      .map(({ game: { name }, minutes }) => ({ name, hours: minutes / 60 })),
  };
};

export async function GET(
  _req: NextRequest,
  { params: { steamId } }: { params: { steamId: string } },
) {
  return NextResponse.json(await getGames(steamId));
}
