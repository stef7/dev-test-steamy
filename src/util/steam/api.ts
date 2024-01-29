import SteamAPI from "steamapi";
import type { UserPlaytime, GameInfo } from "steamapi";

import { steamWebApiKey } from "@/util/environment";

if (!steamWebApiKey) throw new Error("missing steamWebApiKey");

export const steamApi = new SteamAPI(steamWebApiKey);

export const getOwnedGamesInfo = (steamId: string) =>
  steamApi.getUserOwnedGames(steamId, {
    includeAppInfo: true,
  }) as Promise<UserPlaytime<GameInfo>[]>;
