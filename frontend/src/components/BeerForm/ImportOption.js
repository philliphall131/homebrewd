import { useState } from "react";
import { Nav } from "react-bootstrap";
import BeerForm from "./BeerForm.js";
import ImportBeer from "./ImportBeer";
import "./BeerForm.css";

function ImportOption(props) {
    const [isImport, setIsImport] = useState(false)

    const flipImport = ()=>{
        setIsImport(!isImport)
    }

    return (
        <>
            <div className="import-nav">
                <h4 className="text-center">Import Option</h4>
                <Nav className="import-nav-bar" justify variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item>
                        <Nav.Link onClick={flipImport} eventKey="link-0">Blank</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={flipImport} eventKey="link-1">Import</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <br/>
            <div>
                { !isImport && <BeerForm beer={null} tapId={props.tapId} barId={props.barId}/>}
                { isImport && <ImportBeer beer={null} tapId={props.tapId} barId={props.barId}/>}
            </div>
        </>
    );
  }
  
  export default ImportOption;