import { getOwnedGamesInfo } from "@/util/steam/api";

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
      .map(({ game: { name }, minutes }) => ({ name, hours: minutes / 60 })),
  };
};
