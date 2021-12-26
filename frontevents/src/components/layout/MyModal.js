import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function MyModal({ show, handleClose, message, icon }) {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ops!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontWeight: 'bold'}}>{message} <FontAwesomeIcon icon={icon} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}