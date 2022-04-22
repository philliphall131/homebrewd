import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Tap from '../components/Tap/Tap.js';
import BarAPI from '../utils/bar_utils.js';

function BarPage(props) {
  const params = useParams()
  let barId = params.barID

  const [bar, setBar] = useState(null)

  useEffect(() => {
    getBarInfo()
    return () => props.setBarNameNav(null)
  }, [barId]);

  const getBarInfo = async ()=>{
    let bar = await BarAPI.fetchBar(barId)
    if (bar){
      setBar(bar)
      props.setBarNameNav(bar.name)
      console.log(bar)
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="homepage-content p-3 text-center" md="12">
          <h1>Welcome to {bar && bar.name}</h1>
          <Row xs={1} md={2} lg={2} xl={4} xxl={4} className="g-3">
              {bar && bar.taps.map((tap, idx) => (
                <Col key={idx} className="tap-content">
                  <Tap beerId={tap}/>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BarPage;