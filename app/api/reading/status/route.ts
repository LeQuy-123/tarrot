import { connection } from "next/server";
import { aiStatus } from "@/lib/ai/engine";

/** Reports whether AI readings are configured. Evaluated per request so a newly added key is picked up. */
export async function GET() {
  await connection();
  return Response.json(aiStatus(), { headers: { "Cache-Control": "no-store" } });
}
