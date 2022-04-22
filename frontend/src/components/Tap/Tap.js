import './Tap.css';
import tapImg from "../../img/tap2.png"; 
import { Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from "react-router-dom";

function Tap(props) {

    const renderText = ()=>{
        if (props.inx == 1){
            return (
                'Sed ut perspiciatis'
            )
        } else {
            return (
                'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et.'
            )
        }
    }

  return (
    <Card className="tap" >
        <img className="tap-img" src={tapImg}/>
        <Card.Body>
            <Card.Title>Breakfast Stout</Card.Title>
            <Card.Text className='beer-info'>
                { renderText() }
            </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem className="beer-stats">
                <div className='beer-stat-item'>
                    <span>ABV:</span>
                    <span>4.8%</span>
                </div>
            </ListGroupItem>
            <ListGroupItem className="beer-stats">
                <div className='beer-stat-item'>
                    <span>Brewed On:</span>
                    <span>7/7/77</span>
                </div>
            </ListGroupItem>
            <ListGroupItem className="beer-stats">
                <div className='beer-stat-item'>
                    <span>Kegged On:</span>
                    <span>7/7/77</span>
                </div>
            </ListGroupItem>
            <ListGroupItem className="beer-stats">
                <div className='beer-stat-item'>
                    <span>Amount Left:</span>
                    <span>36%</span>
                </div>
            </ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Link to={`beer/${props.inx}`}>
                <Button className="more-info-button" variant="warning" size="lg">
                    More Info
                </Button>
            </Link>
        </Card.Body>
        <h5>Pick a size to drink:</h5>
        <div className="drink-button-row">
            <Button className="drinks-button" variant="warning">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F13495-200.png&f=1&nofb=1" className="drink-sizes-img" />
            </Button>
            <Button className="drinks-button" variant="warning">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd30y9cdsu7xlg0.cloudfront.net%2Fpng%2F13495-200.png&f=1&nofb=1" className="drink-sizes-img" />
            </Button>
            <Button className="drinks-button" variant="warning">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fbeer-icons-2%2F512%2FGlassAFilled-512.png&f=1&nofb=1" className="drink-sizes-img" />
            </Button>
            <Button className="drinks-button" variant="warning">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmagnoliascafe.com%2Fwp-content%2Fuploads%2F2015%2F08%2Fgrowler_icon.png&f=1&nofb=1" className="drink-sizes-img" />
            </Button>
        </div>
    </Card>
  );
}

export default Tap;