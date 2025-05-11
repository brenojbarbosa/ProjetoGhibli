
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ReviewModal({ show, handleClose, movieId, onSave, existingReview }) {
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (existingReview) {
      setNote(existingReview.note);
      setRating(existingReview.rating);
    } else {
      setNote("");
      setRating(0);
    }
  }, [existingReview, show]);

  const handleSubmit = () => {
    onSave(movieId, { note, rating });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Make a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">Your Note</label>
          <textarea
            className="form-control"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Your Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
                style={{ cursor: "pointer", color: "#ffc107", fontSize: "1.5rem" }}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
