import type { NextRequest } from "next/server";
import StartConnection from "../../../../../lib/db/dbConnection";

export async function POST(
  _req: NextRequest,
  _ctx: RouteContext<"/api/toggle-todo/[id]">
) {
  const { completed } = await _req.json();
  const { id } = await _ctx.params;
  try {
    let collection = await StartConnection(); //@ts-expect-error
    let toggledTodo = await collection.updateOne(
      {
        id,
      },
      {
        $set: {
          completed: !completed,
        },
      }
    );
    if (toggledTodo) {
      return Response.json({
        id,
        completed,
      });
    }
  } catch (err) {
    return Response.json({
      errorCode: 500,
    });
  }
}
