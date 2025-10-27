import { NextRequest } from "next/server";
import StartConnection from "../../../../../lib/db/dbConnection";

export async function DELETE(
  _req: NextRequest,
  _ctx: RouteContext<"/api/deleteTodo/[id]">
) {
  const { id } = await _ctx.params;

  try {
    let collection = await StartConnection(); //@ts-expect-error
    let toggledTodo = await collection.deleteOne({
      id,
    });
    if (toggledTodo) {
      return Response.json({
        id,
      });
    }
  } catch (err) {
    throw new Error("error happend");
  }
}
