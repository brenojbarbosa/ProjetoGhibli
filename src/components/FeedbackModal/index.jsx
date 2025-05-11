import React from "react";
import { Modal, Button } from "react-bootstrap";

const FeedbackModal = ({ show, onClose, title, message, color }) => (
  <Modal show={show} onHide={onClose} centered>
    <Modal.Header style={{ backgroundColor: color }} closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default FeedbackModal;
