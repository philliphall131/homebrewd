import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import "../pages.css"
import ChangePassword from "../../components/Account/ChangePassword";
import ChangeEmail from "../../components/Account/ChangeEmail";
import ChangeName from "../../components/Account/ChangeName";


function EditUserPage(props) {


    return (
        <Container>
            <Row className="justify-content-md-center">
            <Col className="login p-3" sm={11} md={9} lg={6} xl={5}>
                    <h3>Edit Account Details</h3>
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Email: {props.user.email}</Accordion.Header>
                            <Accordion.Body>
                                <ChangeEmail user={props.user} setUser={props.setUser} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Name: {props.user.first_name} {props.user.last_name}</Accordion.Header>
                            <Accordion.Body>
                                <ChangeName user={props.user} setUser={props.setUser} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Change Password</Accordion.Header>
                            <Accordion.Body>
                                <ChangePassword user={props.user} setUser={props.setUser} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default EditUserPage;