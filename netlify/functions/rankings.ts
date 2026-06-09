import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { rankings } from "../../db/schema.js";
import { desc, eq } from "drizzle-orm";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export default async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method === "GET") {
    const top = await db
      .select()
      .from(rankings)
      .orderBy(desc(rankings.total_asset))
      .limit(100);

    return Response.json(top, { headers: CORS });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const { nickname, total_asset, return_rate } = body;

    if (!nickname || typeof total_asset !== "number" || typeof return_rate !== "number") {
      return new Response("Invalid body", { status: 400, headers: CORS });
    }

    const trimmed = String(nickname).trim().slice(0, 20);
    if (!trimmed) {
      return new Response("Nickname required", { status: 400, headers: CORS });
    }

    const [row] = await db
      .insert(rankings)
      .values({
        nickname: trimmed,
        total_asset: Math.round(total_asset),
        return_rate: Number(return_rate.toFixed(4)),
        updated_at: new Date(),
      })
      .returning();

    return Response.json(row, { status: 201, headers: CORS });
  }

  return new Response("Method not allowed", { status: 405, headers: CORS });
};

export const config: Config = {
  path: "/api/rankings",
};
