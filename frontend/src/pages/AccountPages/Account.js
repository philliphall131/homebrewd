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

    const notify= async ()=>{
        let response= await BarAPI.notify(13)
        console.log(response)
    }

    return (
        <Container className="account-content p-5 justify-content-center">
            <h2 className="text-center">{props.user.first_name}'s Account</h2>
            <button onClick={notify()}>Notify</button>
            <hr />
            <UserSection user={props.user}/>
            <hr />
            <OwnerSection user={props.user} setUser={props.setUser}/>            
        </Container>
  );
}

export default Account;