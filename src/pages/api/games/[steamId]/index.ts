import { getOwnedGamesInfo } from "@/util/steam/api";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetGamesPathParams = { steamId: string };

export type GetGamesResponse = Awaited<ReturnType<typeof getGames>>;

export const getGames = async ({ steamId }: GetGamesPathParams) => {
  const games = await getOwnedGamesInfo(steamId);
  return {
    totalCount: games.length,
    totalHours: games.reduce((result, game) => result + game.minutes, 0) / 60,
    gamesMostPlayed: games
      .toSorted((a, b) => b.minutes - a.minutes)
      // .slice(0, 10) // to get first X most played. assuming all for now
      .map(({ game: { name, id }, minutes }) => ({ id, name, hours: minutes / 60 })),
  };
};

const handler = async (
  { query }: NextApiRequest & { query: GetGamesPathParams },
  res: NextApiResponse<GetGamesResponse>,
) => {
  res.json(await getGames(query));
};
export default handler;
