import type { NextRequest } from "next/server";
import StartConnection from "../../../../lib/db/dbConnection";
export async function POST(_req: NextRequest) {
  const body = await _req.json();
  try {
    let collection = await StartConnection();
    //@ts-expect-error
    let newTodo = await collection.insertOne(body);
    if (newTodo) {
      return Response.json(body);
    }
  } catch (err) {
    throw new Error(`error`);
  }
}
