import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import BarAPI from "../../utils/bar_utils";
import { useNavigate } from "react-router-dom";
import './BeerForm.css'


function RemoveBeerModal(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const removeBeer = async ()=>{
        let response = await props.delete
            ? BarAPI.deleteBeer(props.beerId)
            : BarAPI.updateBeer({'tap':null}, props.beerId)
        if (response) { navigate("/account")}
    }

    const getTextBody = ()=>{
        if (props.delete){
            return "You've chosen to remove this beer from the tap and completly erase the beer's data from the database. This will permanently remove the beer and any associated data. "
        } else {
            return "You've chosen to remove the beer from the tap, but the its data will still be accessible in your beer archive"
        }
    }

    return (
        <>
            <Button id={props.delete ? 'delete-beer-button':'archive-beer-button'} className="mx-3" variant="secondary" onClick={handleShow}>{props.text}</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Remove from tap</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ getTextBody() }</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={removeBeer}>
                    {props.delete ? 'Delete':'Archive'}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RemoveBeerModal;