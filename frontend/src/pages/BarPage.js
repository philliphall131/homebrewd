import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import Tap from '../components/Tap/Tap.js';

function BarPage(props) {
    // locals
  const params = useParams()
  let barId = params.barID

  useEffect(() => {
    props.setBar(barId)
    return () => props.setBar(null)
  }, [barId]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="homepage-content p-3 text-center" md="12">
          <h1>Welcome to Phil's Bar</h1>
          <Row>
            <Col className="tap-content">
              <Tap />
            </Col>
            <Col className="tap-content">
              <Tap />
            </Col>
            <Col className="tap-content">
              <Tap />
            </Col>
            <Col className="tap-content">
              <Tap />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BarPage;