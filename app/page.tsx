import clientPromise from "@/lib/mongodb";
import { Movie, UserMovie } from "@/types/movie";
import AddMovieForm from "./components/AddMovieForm";

export default async function Home() {
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  console.log("Connected to MongoDB, fetching movies...", db.databaseName);

  const rawMovies = await db.collection("movies").find({}).limit(10).toArray();

  const movies: Movie[] = rawMovies.map((movie) => ({
    ...movie,
    _id: movie._id.toString()
  })) as Movie[];

  const rawUserMovies = await db.collection("user_movies").find({}).toArray();
  const userMovies: UserMovie[] = rawUserMovies.map((m) => ({
    _id: m._id.toString(),
    title: m.title,
    createdAt: m.createdAt?.toString() ?? ""
  }));

  return (
    <main>
      <h1>Filmovi</h1>
      <AddMovieForm />

      <h2>Moji dodati filmovi</h2>
      <ul>
        {userMovies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>

      <h2>Sample filmovi</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </main>
  );
}
