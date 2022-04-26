import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import './DrinkModal.css'
import glass from '../../img/beerfill.png';

function DrinkModal(props) {

    return (
        <>
            <Modal className="drink-modal" show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false}>
                <Modal.Body className="drink-modal-body">
                    <div className="cup"></div>
                    <img className="glass-img" src={glass}/>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DrinkModal;