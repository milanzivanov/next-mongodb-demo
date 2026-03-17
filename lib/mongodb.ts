import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.nextMongoDbTest_MONGODB_URI ?? process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Missing nextMongoDbTest_MONGODB_URI (or MONGODB_URI) in environment variables."
  );
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse client across HMR reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    attachDatabasePool(client);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Always create a fresh client in production/serverless runtime
  client = new MongoClient(uri, options);
  attachDatabasePool(client);
  clientPromise = client.connect();
}

export default clientPromise;
