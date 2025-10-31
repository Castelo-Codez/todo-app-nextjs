import { NextRequest } from "next/server";
import StartConnection from "../../../../lib/db/dbConnection";
type RE_Or = { id: string | number; order: number | number }[];
export async function POST(_req: NextRequest) {
  const { activeElId, overElId, newPosOfActiveEl, newPosOfOverEl } =
    await _req.json();
  try {
    const collection = await StartConnection();
    let re_order_pos: RE_Or = [
      {
        id: activeElId,
        order: newPosOfActiveEl,
      },
      {
        id: overElId,
        order: newPosOfOverEl,
      },
    ];
    const operations = re_order_pos.map((pos) => ({
      updateOne: {
        filter: { id: pos.id },
        update: { $set: { order: pos.order + 1 } },
      },
    }));
    //@ts-expect-error
    const updateAllPos = await collection.bulkWrite(operations);

    return Response.json(updateAllPos);
  } catch (err) {
    return Response.json({
      errorCode: 500,
    });
  }
}
