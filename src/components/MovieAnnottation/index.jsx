import React, { useState } from "react";

function MovieAnnotation({ movieId, annotations, setAnnotations }) {
  const [text, setText] = useState(annotations[movieId]?.text || "");
  const [rating, setRating] = useState(annotations[movieId]?.rating || 0);

  const handleSave = () => {
    setAnnotations((prev) => ({
      ...prev,
      [movieId]: { text, rating },
    }));
  };

  return (
    <div className="mt-3">
      <textarea
        className="form-control mb-2"
        rows="2"
        placeholder="Escreva uma anotação..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mb-2">
        Avaliação:{" "}
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
            style={{ cursor: "pointer", color: "#ffc107" }}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <button className="btn btn-primary btn-sm" onClick={handleSave}>
        Salvar Anotação
      </button>
    </div>
  );
}

export default MovieAnnotation;
