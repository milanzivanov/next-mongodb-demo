import clientPromise from "@/lib/mongodb";
import { Movie } from "@/types/movie";

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  console.log("Connected to MongoDB, fetching movies...", db.databaseName);

  const rawMovies = await db.collection("movies").find({}).limit(10).toArray();

  const movies: Movie[] = rawMovies.map((movie) => ({
    ...movie,
    _id: movie._id.toString()
  })) as Movie[];

  return (
    <main>
      <h1>Filmovi</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  );
}
