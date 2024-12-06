import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation } from 'react-router-dom';

function CustomModal({ title, body, onMainAction, mainActionButtonText, show, onHide }) {
  const url = useLocation();
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        {mainActionButtonText !== 'Enregistrer les changements' &&  (
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={onMainAction}>
              {mainActionButtonText}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default CustomModal;
