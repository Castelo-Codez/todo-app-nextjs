import StartConnection from "../../../../lib/db/dbConnection";

export async function GET() {
  const collection = await StartConnection();
  const todos = await collection.find().toArray();
  return Response.json(todos);
}
