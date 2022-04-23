import { Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function UserSection(props) {

    return (
        <Row className="text-center">
            <Col>
                <Link to={`/account/edit`}>
                    <Button variant="warning">Edit My Account Details</Button>
                </Link>
            </Col>
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