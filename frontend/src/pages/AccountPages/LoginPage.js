import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import '../pages.css';
import AuthAPI from "../../utils/auth_utils";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


function LoginPage(props) {
    const formSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Not a valid email'),
        password: Yup.string()
          .required('Password is required')
    })

    const navigate = useNavigate()
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);

    useEffect(()=>{
        if (props.user){
            navigate('/')
        }
    },[])
    

    const submitLogin = async (data)=>{
        let response = await AuthAPI.logIn(data)
        if (response) {
            props.setUser(response)
            localStorage.setItem('user', JSON.stringify(response))
            navigate('/')
        }
    }
      
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="login p-3" md="5">
                    <h3 className="text-center">Login</h3>
                    <Form onSubmit={handleSubmit(submitLogin)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                            {errors.email && <small className="form-error">{errors.email?.message}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control {...register("password")} type="password" placeholder="Password" />
                            {errors.password && <small className="form-error">{errors.password?.message}</small>}
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default LoginPage;