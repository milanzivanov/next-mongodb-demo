import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("test 2").insertOne({
    poruka: "Hello MongoDB!",
    vreme: new Date()
  });

  return Response.json({ success: true, id: result.insertedId });
}

// Ova funkcija POST je samo primer kako bi mogao da izgleda POST endpoint koji dodaje dokument u kolekciju "test 3 post". Trenutno je zakomentarisan, ali možeš ga otkomentarisati i prilagoditi po potrebi. Ovo moze da se testira samo u curl -X POST http://localhost:3001/api/add
// export async function POST() {
//   const client = await clientPromise;
//   const db = client.db();

//   const result = await db.collection("test 3 post").insertOne({
//     poruka: "Hello MongoDB!",
//     vreme: new Date()
//   });

//   return Response.json({ success: true, id: result.insertedId });
// }
