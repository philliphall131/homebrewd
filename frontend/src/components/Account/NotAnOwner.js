import { Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotAnOwner() {

    return (
        <Container >
            <Row>
                <div >Looks like you dont have a homebrew bar set up. Click below to get started</div>
                <span><Link to="/bar/new"><Button style={{ width: '8rem' }} variant="success">Setup a Bar</Button></Link></span>
            </Row>
        </Container>
  );
}

export default NotAnOwner;