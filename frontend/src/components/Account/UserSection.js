import { Row, Col } from 'react-bootstrap';

function UserSection(props) {

    return (
        <Row className="text-center">
            <Col>
                <div>User Saved/Favorite Bars</div>
            </Col>
            <Col>
                <div>User Beer Stats</div>
            </Col>
        </Row>
  );
}

export default UserSection;