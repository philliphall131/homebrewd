import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from  "react-router-dom";
import AuthAPI from "../utils/auth_utils";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import OwnerSection from "../components/Account/OwnerSection";

function Account(props) {
    let navigate = useNavigate();

    useEffect(()=>{
        if (props.user === null){
            navigate("/")
        }
    }, [])

    const deleteUser = ()=>{
        let response = AuthAPI.deleteAccount(props.user.id)
        if (response){
            props.setUser(null);
            localStorage.clear();
            navigate("/")
        } 
    }

    return (
        <Container className="account-content p-5 justify-content-center">
            <h2 className="text-center">{props.user.first_name}'s Account</h2>
            <hr />
            <Row className="text-center">
                <Col>
                    <div>User Saved/Favorite Bars</div>
                </Col>
                <Col>
                    <div>User Beer Stats</div>
                </Col>
            </Row>
            <hr />
            <OwnerSection user={props.user} setUser={props.setUser}/>
            <hr />
            <DeleteModal type={'Account'} deleteAction={deleteUser}/>
        </Container>
  );
}

export default Account;