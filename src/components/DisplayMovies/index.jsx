import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../SearchBar";
import ReviewModal from "../ReviewModal";
import { Modal, Button } from "react-bootstrap";
import { Img, MovieButtonsWrapper } from "./style";

export default function DisplayMovies() {
  const [search, setSearch] = useState("");
  const [listMovies, setListMovies] = useState([]);
  const [watched, setWatched] = useState({});
  const [favorite, setFavorite] = useState({});
  const [filters, setFilters] = useState({
    watched: false,
    favorite: false,
    hasAnnotation: false,
  });
  const [sortOption, setSortOption] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalColor, setModalColor] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [expandedMovie, setExpandedMovie] = useState(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("ghibliReviews")) || {};
    setReviews(storedReviews);
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("https://ghibliapi.vercel.app/films");
      setListMovies(response.data);
    } catch (error) {
      console.error("Erro ao buscar os filmes", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = listMovies
    .filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        (movie.description?.toLowerCase().includes(search.toLowerCase()));

      const matchesWatched = filters.watched ? watched[movie.id] : true;
      const matchesFavorite = filters.favorite ? favorite[movie.id] : true;
      const matchesAnnotation = filters.hasAnnotation
        ? reviews[movie.id] && reviews[movie.id].note
        : true;

      return matchesSearch && matchesWatched && matchesFavorite && matchesAnnotation;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (a[sortOption] < b[sortOption]) {
        comparison = -1;
      } else if (a[sortOption] > b[sortOption]) {
        comparison = 1;
      }

      if (sortOrder === "desc") {
        comparison = -comparison;
      }

      return comparison;
    });

  const toggleWatched = (id, title) => {
    setWatched((prevState) => {
      const updated = { ...prevState };
      if (updated[id]) {
        delete updated[id];
        showModalMessage(`Mark Unwatched`, `gray`, title);
      } else {
        updated[id] = true;
        showModalMessage(`Mark Watched`, `lightgreen`, title);
      }
      return updated;
    });
  };

  const toggleFavorite = (id, title) => {
    setFavorite((prevState) => {
      const updated = { ...prevState };
      if (updated[id]) {
        delete updated[id];
        showModalMessage(`Removed from Favorites`, `gray`, title);
      } else {
        updated[id] = true;
        showModalMessage(`Added to Favorites`, `#ff6f61`, title);
      }
      return updated;
    });
  };

  const showModalMessage = (message, color, title) => {
    setModalMessage(message);
    setModalColor(color);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleOpenReview = (id) => {
    setCurrentMovieId(id);
    setReviewModalOpen(true);
  };

  const handleSaveReview = (id, review) => {
    const updated = { ...reviews, [id]: review };
    setReviews(updated);
    localStorage.setItem("ghibliReviews", JSON.stringify(updated));
  };

  const truncateDescription = (text, limit = 150) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="container py-4">
      <SearchBar
        search={search}
        setSearch={setSearch}
        includeSynopsis={filters.includeSynopsis}
        setIncludeSynopsis={(val) => setFilters((prev) => ({ ...prev, includeSynopsis: val }))} 
      />

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-2 ">
        <div>
          <label>Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="form-select"
          >
            <option value="title">Title</option>
            <option value="running_time">Duration</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div>
          <label>Sort Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div>
          <label>Filters:</label>
          <div>
            <input
              type="checkbox"
              checked={filters.watched}
              onChange={(e) => setFilters({ ...filters, watched: e.target.checked })}
           />
            <label  style={{marginLeft:"5px"}}>Watched</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={filters.favorite}
              onChange={(e) => setFilters({ ...filters, favorite: e.target.checked })}
            />
            <label  style={{marginLeft:"5px"}}>Favorite</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={filters.hasAnnotation}
              onChange={(e) => setFilters({ ...filters, hasAnnotation: e.target.checked })}
            />
            <label style={{marginLeft:"5px"}}>Has Annotation</label>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm d-flex flex-column" style={{ minHeight: "600px" }}>
              <Img
                src={movie.image}
                alt={movie.title}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  {expandedMovie === movie.id ? (
                    <span>{movie.description}</span>
                  ) : (
                    <>
                      {truncateDescription(movie.description)}
                      {movie.description.length > 150 && (
                        <button
                          onClick={() => setExpandedMovie(movie.id)}
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
                <ul className="list-unstyled mt-2 mb-1" style={{ fontSize: "0.85rem" }}>
                  <li><strong>Ano:</strong> {movie.release_date}</li>
                  <li><strong>Duração:</strong> {movie.running_time} min</li>
                  <li><strong>Diretor:</strong> {movie.director}</li>
                  <li><strong>Produtor:</strong> {movie.producer}</li>
                </ul>

                {reviews[movie.id] && (
                  <div style={{ fontSize: "0.8rem", color: "#6c757d" }}>
                    <p className="mb-1"><strong>Review:</strong> {reviews[movie.id].note}</p>
                    <p className="mb-2">
                      {[...Array(reviews[movie.id].rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill" style={{ color: "#ffc107" }} />
                      ))}
                    </p>
                  </div>
                )}

                <MovieButtonsWrapper>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => handleOpenReview(movie.id)}
                    style={{ backgroundColor: "#9fc0eb" }}
                  >
                    Make a Review
                  </button>

                  <button
                    className="btn w-100"
                    style={{
                      backgroundColor: watched[movie.id] ? "lightgreen" : "#639e7e",
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
                      backgroundColor: favorite[movie.id] ? "#ff6f61" : "#f892a5",
                      borderColor: favorite[movie.id] ? "#ff6f61" : "#ccc",
                      color: favorite[movie.id] ? "white" : "black",
                    }}
                    onClick={() => toggleFavorite(movie.id, movie.title)}
                  >
                    <i
                      className={`bi ${favorite[movie.id] ? "bi-heart-fill" : "bi-heart"}`}
                      style={{ color: favorite[movie.id] ? "white" : "black" }}
                    />
                    {favorite[movie.id] ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </MovieButtonsWrapper>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header style={{ backgroundColor: modalColor }} closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <ReviewModal
        show={reviewModalOpen}
        handleClose={() => setReviewModalOpen(false)}
        movieId={currentMovieId}
        onSave={handleSaveReview}
      />
    </div>
  );
}
