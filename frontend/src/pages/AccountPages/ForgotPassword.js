import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import '../pages.css';
import AuthAPI from "../../utils/auth_utils";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


function ForgotPassword(props) {
    const formSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Not a valid email'),
    })

    const navigate = useNavigate()
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);

    useEffect(()=>{
        if (props.user){
            navigate('/')
        }
    },[])
    

    const submitReset = async (data)=>{
        let response = await AuthAPI.resetPassword(data)
        if (response) {
            navigate('/')
        }
    }
      
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="login p-3" md="5">
                    <h3 className="text-center">Login</h3>
                    <Form onSubmit={handleSubmit(submitReset)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Enter the email associated with your account:</Form.Label>
                            <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                            {errors.email && <small className="form-error">{errors.email?.message}</small>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br /> 
                    <Link to="password">Forgot my password</Link>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default ForgotPassword;