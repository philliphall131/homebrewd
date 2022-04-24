import { Col, Container, Row } from "react-bootstrap";
import AllBars from "../components/AllBars/AllBars";
import HomePageCarousel from "../components/Carousel/HomePageCarousel";

function HomePage(props) {

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="homepage-content p-0 text-center" md="10">
          <Row className="m-0">
            <HomePageCarousel />
          </Row>
          <br />
          <Row>
            <h3>Lets find you a bar to drink at!</h3>
            <h5>To get started, check out the options below</h5>
          </Row>
          <hr />
          <Row className="m-3 py-3">
            <Col>
              <h5>Find a Homebrew bar</h5>
              <AllBars />
            </Col>
            <div className="vr" />
            <Col>
              <h5>Create an account and save bars to your account</h5>
            </Col>
            <div className="vr" />
            <Col>
              <h5>Look for a QR code or link on your friends bar to see their menu</h5>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;