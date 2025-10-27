import StartConnection from "../../../../lib/db/dbConnection";

export async function DELETE() {
  let collection = await StartConnection();
  //@ts-expect-error
  let statusOfProcedure = await collection.deleteMany({ completed: true });
  if (statusOfProcedure) {
    return Response.json(statusOfProcedure);
  } else {
    throw new Error("error Happend");
  }
}
