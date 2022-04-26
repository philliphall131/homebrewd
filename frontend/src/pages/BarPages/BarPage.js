import { useParams } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Tap from '../../components/Tap/Tap.js';
import BarAPI from '../../utils/bar_utils.js';
import AuthAPI from "../../utils/auth_utils.js";

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
      console.log(bar.taps)
      props.setBarNameNav(bar.name)
    }
  }

  const saveBar = async ()=>{
    let new_favorites = props.user.favorite_bars.map((bar)=>bar)
    new_favorites.push(bar.id)
    let response = await AuthAPI.updateUserInfo(props.user.id, {'favorite_bars': new_favorites})
    if (response){
      props.setUser(response)
    }
  }

  const saveBarButton = ()=>{
    if (!props.user.favorite_bars.includes(bar.id) && props.user.bar != bar.id){
      return (
        <Button id="save-bar-btn" variant="outline-warning" onClick={()=>saveBar()}>Save to my Favorite Bars</Button>
      )
    }
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="barpage-content p-0 text-center" md="12">
            <div className="bar-title">
              <Col></Col>
              <Col md={9}><h1>Welcome to {bar && bar.name}</h1></Col>
              <Col>
                {props.user && bar && saveBarButton()}
              </Col>
            </div>
            <Row xs={1} md={2} lg={2} xl={4} xxl={4} className="g-3 px-3 mt-0 mb-5 justify-content-center">
              {bar && bar.taps.map((tap, idx) => (
                <Col key={`tap-${tap}-${idx}`} className="tap-content mt-0">
                  <Tap beerId={tap} tap={idx+1} user={props.user}/>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BarPage;