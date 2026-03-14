import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);
attachDatabasePool(client);

const clientPromise: Promise<MongoClient> = client.connect();

export default clientPromise;
