import './Tap.css';
import tapImg from "../../img/tap2.png"; 
import { Button, Row, Col } from "react-bootstrap";
import beerMug from "../../img/beermug.png"

function BarPage(props) {

  return (
    <div className="tap">
        <img className="tap-img" src={tapImg}/>
        <h4>Breakfast Stout</h4>
        <p>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et.</p>
        <table>
            <tr>
                <td>ABV:</td>
                <td>4.8%</td>
            </tr>
            <tr>
                <td>Brewed On:</td>
                <td>7/7/77</td>
            </tr>
            <tr>
                <td>Kegged On:</td>
                <td>7/7/77</td>
            </tr>
            <tr>
                <td>Amount Left:</td>
                <td>36%</td>
            </tr>
        </table> 
        <Button className="more-info" variant="warning" size="lg">
            More Info
        </Button>
        <h5>Pick a size to drink:</h5>
        <Row>
            <Col className="drink-size-container">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F13495-200.png&f=1&nofb=1" className="drink-sizes" />
            </Col>
            <Col className="drink-size-container">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F13495-200.png&f=1&nofb=1" className="drink-sizes" />
            </Col>
            <Col className="drink-size-container">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fbeer-icons-2%2F512%2FGlassAFilled-512.png&f=1&nofb=1" className="drink-sizes" />
            </Col>
            <Col className="drink-size-container">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmagnoliascafe.com%2Fwp-content%2Fuploads%2F2015%2F08%2Fgrowler_icon.png&f=1&nofb=1" className="drink-sizes" />
            </Col>
        </Row>

    </div>
  );
}

export default BarPage;