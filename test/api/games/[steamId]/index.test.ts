import { getGames } from "@/pages/api/games/[steamId]";
import steamJson from "./fixtures/steam.json";
import resultJson from "./fixtures/result.json";

jest.mock("@/util/steam/api", () => ({
  getOwnedGamesInfo: async () => steamJson,
}));

describe("/api/games/[steamId] handler", () => {
  it("transforms Steam payload as expected", async () => {
    await expect(getGames({ steamId: "" })).resolves.toStrictEqual(resultJson);
  });
});
