import { Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from '../DeleteModal/DeleteModal';
import AuthAPI from '../../utils/auth_utils';
import SavedBarsDropdown from './SavedBarsDropdown';
import UserBeerStatTable from './UserBeerStatTable';
import UserBeerStatChart from './UserBeerStatChart';

function UserSection(props) {
    const navigate = useNavigate

    const deleteUser = ()=>{
        let response = AuthAPI.deleteAccount(props.user.id)
        if (response){
            props.setUser(null);
            // localStorage.clear();
            navigate("/")
        } 
    }

    return (
        <>
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
                {(props.user.favorite_bars.length > 0) && <SavedBarsDropdown user={props.user}  userFavBars={props.userFavBars}/>}
            </Col>
        </Row>
        {props.user.beer_stats.length > 0 &&
        <>
            <hr/>
            <Row className="stat-row">
                <h3 className="text-center">User Beer Stats</h3>
                <Col>
                    <UserBeerStatTable userStats={props.user.beer_stats}/>
                </Col>
                <Col>
                    <UserBeerStatChart userStats={props.user.beer_stats}/>
                </Col>
            </Row> 
        </>
        }
        </>
  );
}

export default UserSection;