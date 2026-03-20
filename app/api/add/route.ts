import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body?.title?.trim();

    if (!title) {
      return Response.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const result = await db.collection("user_movies").insertOne({
      title,
      createdAt: new Date()
    });

    return Response.json({ success: true, id: result.insertedId });
  } catch {
    return Response.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
