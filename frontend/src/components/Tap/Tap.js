import './Tap.css';
import { useState, useEffect } from "react";
import tapImg from "../../img/tap2.png"; 
import { Button, Card, ListGroup, ListGroupItem, Spinner, Popover, OverlayTrigger, ButtonGroup, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import BarAPI from '../../utils/bar_utils';
import shot from '../../img/Shot.png';
import half from '../../img/half_full.png';
import full from '../../img/full.png';
import growler from '../../img/growler.png';

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

    const drinkSome = async (amount)=>{
        let d = document.getElementById(`drink-it-${props.tap}`)
        let b = document.getElementsByClassName('drinks-button')
        for (let i = 0; i < b.length; i++) {
            b[i].disabled=true
        }
        let response = await BarAPI.updateBeer({'quantity_remaining':amount}, beer.id)
        if (response){
            setBeer(response)
            d.click()
        }
    }

    const percent_remaining = ()=>{
        let n = Number(beer.fquantity_remaining)/Number(beer.fquantity_start)
        return n * 100
    }

    const popover = (
        <Popover id="popover">
            <Popover.Header as="h3" className="text-center">Pick a size to drink</Popover.Header>
            <Popover.Body>
            <ButtonGroup className="me-2" aria-label="First group">
                <Button className="drinks-button"  onClick={()=>drinkSome(2)}><img className="drink-sizes-img" src={shot}/></Button> 
                <Button className="drinks-button" onClick={()=>drinkSome(6)} ><img className="drink-sizes-img" src={half}/></Button> 
                <Button className="drinks-button" onClick={()=>drinkSome(12)}><img className="drink-sizes-img" src={full}/></Button> 
                <Button className="drinks-button" onClick={()=>drinkSome(32)}><img className="drink-sizes-img" src={growler}/></Button> 
            </ButtonGroup>
          </Popover.Body>
        </Popover>
        );

    const drinkItButton = ()=>{
        let buttonOff = false
        let buttonText = 'Drink it!'
        if (beer.fquantity_remaining <= 0){
            buttonOff = true
            buttonText = 'Empty'
        }
        return (
            <Button id={`drink-it-${props.tap}`} className="more-info-button my-3" variant="warning" size="lg" disabled={buttonOff}>
                {buttonText}
            </Button>
        )
    }

    return (
        <Card className="tap" >
            <img className="tap-img" src={tapImg}/>
            <Card.Body>
                <Card.Title>{beer.name}</Card.Title>
                <Card.Text className='beer-info'>
                    {beer.description}
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
                    <ProgressBar animated variant="warning" now={percent_remaining()} />
                </ListGroupItem>
            </ListGroup>
            <Card.Body>
                <OverlayTrigger trigger="click" rootClose placement="top" overlay={popover}>
                    {drinkItButton()}
                </OverlayTrigger>
                <Link to={`beer/${beer.id}`}>
                    <Button className="more-info-button" variant="warning" size="lg">
                        More Info
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Tap;