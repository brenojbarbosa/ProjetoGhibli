
const MovieCard = ({
  movie,
  watched,
  favorite,
  toggleWatched,
  toggleFavorite,
  truncateDescription,
  expandedMovie,
  setExpandedMovie,
}) => {
  const handleDescriptionToggle = () => {
    if (expandedMovie === movie.id) {
      setExpandedMovie(null);
    } else {
      setExpandedMovie(movie.id);
    }
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div
        className="card shadow-sm d-flex flex-column"
        style={{
          minHeight: "580px", 
          display: "flex", 
          flexDirection: "column", 
          height: "100%", 
        }}
      >
        <img
          src={movie.image}
          alt={movie.title}
          className="card-img-top"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
        <div className="card-body d-flex flex-column" style={{ flex: "1" }}>
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text" style={{ fontSize: "0.9rem" }}>
            {expandedMovie === movie.id ? (
              <span>{movie.description}</span>
            ) : (
              <>
                {truncateDescription(movie.description)}
                {movie.description.length > 150 && (
                  <button
                    onClick={handleDescriptionToggle}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007bff",
                      cursor: "pointer",
                    }}
                  >
                    Read More
                  </button>
                )}
              </>
            )}
          </p>
          <ul className="list-unstyled mt-2 mb-3" style={{ fontSize: "0.85rem" }}>
            <li><strong>Ano:</strong> {movie.release_date}</li>
            <li><strong>Duração:</strong> {movie.running_time} min</li>
            <li><strong>Diretor:</strong> {movie.director}</li>
            <li><strong>Produtor:</strong> {movie.producer}</li>
            <li><strong>Nota:</strong> {movie.rt_score}/100</li>
          </ul>
          <div className="d-flex flex-column mt-auto gap-2" style={{ marginTop: "auto" }}>
            <button
              className="btn w-100"
              style={{
                backgroundColor: watched[movie.id] ? "lightgreen" : "white",
                borderColor: watched[movie.id] ? "green" : "#ccc",
                color: watched[movie.id] ? "green" : "black",
              }}
              onClick={() => toggleWatched(movie.id, movie.title)}
            >
              {watched[movie.id] ? "Mark Unwatched" : "Mark Watched"}
            </button>
            <button
              className="btn w-100"
              style={{
                backgroundColor: favorite[movie.id] ? "#ff6f61" : "white",
                borderColor: favorite[movie.id] ? "#ff6f61" : "#ccc",
                color: favorite[movie.id] ? "white" : "black",
              }}
              onClick={() => toggleFavorite(movie.id, movie.title)}
            >
              <i
                className={`bi ${favorite[movie.id] ? "bi-heart-fill" : "bi-heart"}`}
                style={{ color: favorite[movie.id] ? "white" : "black" }}
              ></i>
              {favorite[movie.id] ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
