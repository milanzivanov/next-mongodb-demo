import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.nextMongoDbTest_MONGODB_URI;

if (!uri) {
  throw new Error(
    "Missing nextMongoDbTest_MONGODB_URI in environment variables."
  );
}

const client = new MongoClient(uri);
attachDatabasePool(client);

const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
