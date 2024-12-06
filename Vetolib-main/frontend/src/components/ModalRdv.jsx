import { useState } from "react";
import { Button, Modal } from "react-bootstrap";


function ModalRdv({ veterinaire, onConfirm }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirm = () => {
      onConfirm(); 
      handleClose();
    };
  
    return (
      <>
        <Button variant={!veterinaire || !veterinaire.nom || !veterinaire.prenom ? 'danger' : "success"} onClick={handleShow} className="btn-md">
        <i className="bi bi-calendar-heart"></i> {!veterinaire  || !veterinaire.nom || !veterinaire.prenom ? "Pas de vétérinaire pour ce cabinet": "Prendre RDV avec "+veterinaire.nom+" "+veterinaire.prenom}
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmation de RDV</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>  Êtes-vous sûr de vouloir prendre un RDV avec le vétérinaire <strong>{veterinaire ? `${veterinaire.nom} ${veterinaire.prenom}` : 'ce vétérinaire'} </strong> ?</div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Non
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default ModalRdv;