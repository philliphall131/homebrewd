import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotAnOwner() {

    return (
        <Container >
            <Row className="text-center justify-content-center">
                <div >Looks like you dont own a homebrew bar. Click below to set one Up</div>
                <span><Link to="/bar/new"><Button style={{ width: '8rem' }} variant="success">Setup a Bar</Button></Link></span>
            </Row>
        </Container>
  );
}

export default NotAnOwner;