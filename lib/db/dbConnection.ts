import { MongoClient } from "mongodb";

export default async function StartConnection() {
  let connection = new MongoClient(process.env.MONGO_DB_URL as string);
  let db = connection.db("TodoApp-Nextjs");
  if (db) {
    return db.collection("Todos");
  } else {
    return new Error("error in connection");
  }
}
