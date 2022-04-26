import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Alert } from "react-bootstrap";
import "../pages.css"
import SignUpForm from "../../components/Account/SignUpForm";


function SignUpPage(props) {

    const navigate = useNavigate()

    // useEffect(()=>{
    //     if (props.user){
    //         navigate('/')
            
    //     }
    // },[])

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="login p-3" md="5">
                    <h3 className="text-center">Signup</h3>
                    {props.user && <h5>You're already logged in</h5>}
                    {!props.user && <SignUpForm setUser={props.setUser}/>}
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default SignUpPage;