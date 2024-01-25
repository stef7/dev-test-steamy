import { redirect } from "next/navigation";
import { getGames } from "./api/games/[steamId]/route.api";

export const metadata = {
  title: "Games",
};

export default async function Page({ searchParams: { steamId } }: { searchParams: { steamId?: string } }) {
  async function setSteamId(formData: FormData) {
    "use server";
    const value = formData.get("steamId")?.toString();
    redirect(value ? `/?steamId=${value}` : "/");
  }
  return (
    <>
      <form action={setSteamId}>
        <label htmlFor="steamId">Your Steam User ID:</label>
        <input id="steamId" name="steamId" />
        <button type="submit">Submit</button>
      </form>
      {steamId && (
        <ul>
          {(await getGames({ steamId })).gamesMostPlayed.map((game) => (
            <li key={game.id}>
              {game.name} {game.hours}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
