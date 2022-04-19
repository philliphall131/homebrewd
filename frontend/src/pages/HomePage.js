import { Col, Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

function HomePage(props) {

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="homepage-content p-3 text-center" md="10">
          <h1>HomebrewD HomePage</h1>
          <h1>{props.user ? `${props.user.first_name} Logged In`:'Not logged in'}</h1>
          <p>Lets find you a bar to drink at</p>
          <p>Log in to see your saved bars <br/>or scan the bar QR to add a bar to your saved bars <br/>or search for a bar<br/>or explore bars near you</p>
          <h4>Your Saved Bars:</h4>
          <Link to="/bar/1">Phils Bar</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;