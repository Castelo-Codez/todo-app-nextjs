import StartConnection from "../../../../lib/db/dbConnection";

export async function GET() {
  const collection = await StartConnection();    //@ts-expect-error
  const todos = await collection.find().toArray();
  return Response.json(todos);
}
