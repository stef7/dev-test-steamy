import { NextRequest, NextResponse } from "next/server";

import { GetGamesPathParams, getGames } from "./route.api";

export async function GET(_req: NextRequest, { params }: { params: GetGamesPathParams }) {
  return NextResponse.json(await getGames(params));
}
