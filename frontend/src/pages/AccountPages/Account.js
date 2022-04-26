import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from  "react-router-dom";
import OwnerSection from "../../components/Account/OwnerSection";
import UserSection from "../../components/Account/UserSection";
import BarAPI from "../../utils/bar_utils";

function Account(props) {
    let navigate = useNavigate();

    useEffect(()=>{
        if (props.user === null){
            navigate("/")
        }
    }, [])

    return (
        <Container className="account-content p-5 justify-content-center">
            <h2 className="text-center">{props.user.first_name}'s Account</h2>
            <hr />
            <UserSection user={props.user}  userFavBars={props.userFavBars}/>
            <hr />
            <OwnerSection user={props.user} setUser={props.setUser}/>            
        </Container>
  );
}

export default Account;