import './Tap.css';
import { useState, useEffect } from "react";
import tapImg from "../../img/tap2.png"; 
import { Button, Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import BarAPI from '../../utils/bar_utils';

function Tap(props) {
    const [beer, setBeer] = useState(null)
    const [ready, setReady]=useState(false)

    useEffect(() => {
        if (props.beerId)
            getBeerInfo()     
      }, []);

    useEffect(()=>{
        if (!props.beerId) {
            setReady(true)
        } else if (beer){
            setReady(true)
        }
    },[beer])

    const getBeerInfo = async ()=>{
        let response = await BarAPI.fetchBeer(props.beerId)
        if (response) {
            console.log(response)
            setBeer(response)
        }
    }

    if (!ready) {
        return (
            <Card className="tap" >
                <div className='spinner'><Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner></div>
            </Card>
        )
    }

    if (!beer) return (
        <Card className="tap" >
            <img className="tap-img" src={tapImg}/>
            <Card.Body>
                <Card.Title>No beer on tap</Card.Title>
                <Card.Text className='beer-info'>
                </Card.Text>
            </Card.Body>
            
        </Card>
    )

    const formatDate = (date) =>{
        if (date===null) return
        let d = new Date(date)
        return d.toLocaleDateString()
    }

    return (
        <Card className="tap" >
            <img className="tap-img" src={tapImg}/>
            <Card.Body>
                <Card.Title>{beer.name}</Card.Title>
                <Card.Text className='beer-info'>
                    A description of the beer
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem className="beer-stats">
                    <div className='beer-stat-item'>
                        <span>ABV:</span>
                        <span>{beer.abv}%</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="beer-stats">
                    <div className='beer-stat-item'>
                        <span>Brewed On:</span>
                        <span>{formatDate(beer.brew_date)}</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="beer-stats">
                    <div className='beer-stat-item'>
                        <span>Kegged On:</span>
                        <span>{formatDate(beer.keg_date)}</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="beer-stats">
                    <div className='beer-stat-item'>
                        <span>Amount Left:</span>
                        <span>{beer.fquantity_remaining} gal</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Link to={`beer/${beer.id}`}>
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