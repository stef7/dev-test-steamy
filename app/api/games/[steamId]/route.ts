import { getOwnedGamesInfo } from "@/util/steam/api";
import { NextRequest, NextResponse } from "next/server";

export type GamesResponse = {
  totalCount: number;
  totalHours: number;
  gamesMostPlayed: {
    name: string;
    hours: number;
  }[];
};

export async function GET(
  _req: NextRequest,
  { params: { steamId } }: { params: { steamId: string } },
) {
  const games = await getOwnedGamesInfo(steamId);

  const response: GamesResponse = {
    totalCount: games.length,
    totalHours: games.reduce((result, game) => result + game.minutes, 0) / 60,
    gamesMostPlayed: games
      .map(({ game: { name }, minutes }) => ({
        name,
        hours: minutes / 60,
      }))
      .sort((a, b) => b.hours - a.hours),
  };

  return NextResponse.json(response);
}
