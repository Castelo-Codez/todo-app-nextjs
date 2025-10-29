import StartConnection from "../../../../lib/db/dbConnection";

export async function DELETE() {
  try {
    let collection = await StartConnection();
    //@ts-expect-error
    let statusOfProcedure = await collection.deleteMany({ completed: true });

    return Response.json(statusOfProcedure);
  } catch (err) {
    return Response.json({
      errorCode: 500,
    });
  }
}
