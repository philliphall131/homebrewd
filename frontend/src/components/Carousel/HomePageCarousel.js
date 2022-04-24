import { Carousel, Container, Col } from "react-bootstrap";
import "./Carousel.css";
import barpic1 from '../../img/homebrew1.jpg';
import barpic2 from '../../img/homebrew2.jpg';
import barpic3 from '../../img/homebrew3.jpg';
import barpic4 from '../../img/homebrew4.jpg';

function HomePageCarousel(props) {

  return (
        <Col className="p-0 carousel-container">
            <div className="homepage-title">
                <h1>Homebrewd</h1>
                <h5>Interactive bar menus and tools for Homebrewers</h5>
            </div>
            <Carousel className="homepage-carousel" fade controls={false} indicators={false}>
                <Carousel.Item>
                    <img
                    className="d-block w-100 homepage-img"
                    src={barpic1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100 homepage-img"
                    src={barpic2}
                    alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100 homepage-img"
                    src={barpic3}
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Col>
  );
}

export default HomePageCarousel;