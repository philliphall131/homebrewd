import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from '../DeleteModal/DeleteModal';
import AuthAPI from '../../utils/auth_utils';

function UserSection(props) {
    const navigate = useNavigate

    const deleteUser = ()=>{
        let response = AuthAPI.deleteAccount(props.user.id)
        if (response){
            props.setUser(null);
            localStorage.clear();
            navigate("/")
        } 
    }

    return (
        <Row className="text-center">
            <Col>
                <Link to={`/account/edit`}>
                    <Button variant="warning">Edit My Account Details</Button>
                </Link>
            </Col>
            <Col>
                <DeleteModal type={'Account'} deleteAction={deleteUser}/>
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