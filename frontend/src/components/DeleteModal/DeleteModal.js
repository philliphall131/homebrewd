import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

function DeleteModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const del = ()=>{
        props.deleteAction()
        handleClose()
    }

    return (
        <div className="content-center">
            <Button variant="danger" onClick={handleShow}>Delete {props.type}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>WARNING</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deleting your {props.type.toLowerCase()} will delete all associated data stored.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={del}>
                    Delete my {props.type.toLowerCase()}
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteModal;