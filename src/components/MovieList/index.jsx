
import MovieCard from "../MovieCard/index.tsx";

const MovieList = ({
  movies,
  watched,
  favorite,
  toggleWatched,
  toggleFavorite,
  truncateDescription,
  expandedMovie,
  setExpandedMovie,
}) => {
  return (
    <div className="row mt-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          watched={watched}
          favorite={favorite}
          toggleWatched={toggleWatched}
          toggleFavorite={toggleFavorite}
          truncateDescription={truncateDescription}
          expandedMovie={expandedMovie}
          setExpandedMovie={setExpandedMovie}
        />
      ))}
    </div>
  );
};

export default MovieList;
