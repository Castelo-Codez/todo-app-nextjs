import StartConnection from "../../../../lib/db/dbConnection";

export async function GET() {
  try {
    const collection = await StartConnection();
    //@ts-expect-error
    const todos = await collection.find().toArray();
    return Response.json(todos);
  } catch (err) {
    return Response.json({
      errorCode: 500,
      errorMsg: "Something Went Wrong. Please Try Again Later.",
    });
  }
}
