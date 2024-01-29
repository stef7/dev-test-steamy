import resultJson from "../../test/api/games/[steamId]/fixtures/result.json";

import { GamesList } from "./GamesList";
import { render, screen } from "@testing-library/react";

jest.mock("@/util/apis", () => ({
  defaultFetcher: async () => resultJson,
}));

describe(GamesList.name, () => {
  it("renders games results as expected", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("12345678901234567");

    render(<GamesList />);

    await expect(screen.findByText("Cities: Skylines")).resolves.toBeInTheDocument();
  });
});
