import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  const movies = await db.collection("movies").find({}).limit(10).toArray();

  return Response.json({ movies });
}
