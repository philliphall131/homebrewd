import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Tap from '../components/Tap/Tap.js';
import BarAPI from '../utils/bar_utils.js';

function BarPage(props) {
  // get the bar id to load bar details (not logged in users bar)
  const params = useParams()
  let barId = params.barID

  //states
  const [bar, setBar] = useState(null)

  // effect: load bar info based on barId, reset bar name on unmounting (for navbar)
  useEffect(() => {
    getBarInfo()
    return () => props.setBarNameNav(null)
  }, [barId]);

  // API call to load in bar info and set the navbar bar name
  const getBarInfo = async ()=>{
    let bar = await BarAPI.fetchBar(barId)
    if (bar){
      setBar(bar)
      props.setBarNameNav(bar.name)
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="barpage-content p-0 text-center" md="12">
            <div className="bar-title"><h1>Welcome to {bar && bar.name}</h1></div>
            <Row xs={1} md={2} lg={2} xl={4} xxl={4} className="g-3 px-3 my-3">
              {bar && bar.taps.map((tap, idx) => (
                <Col key={idx} className="tap-content mt-0">
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