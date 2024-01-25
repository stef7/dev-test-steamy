import SteamAPI from "steamapi";

import { steamWebApiKey } from "@/util/environment";

if (!steamWebApiKey) throw new Error('missing steamWebApiKey');

export const steamApi = new SteamAPI(steamWebApiKey);

