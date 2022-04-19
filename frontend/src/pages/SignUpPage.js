import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import AuthAPI from "../utils/auth_utils";
import { useForm } from "react-hook-form";
import "./pages.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


function SignUpPage(props) {
    const formSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Not a valid email'),
        first_name: Yup.string()
          .required('First name is required')
          .max(50, 'First name length must be less than 50 characters'),
        last_name: Yup.string()
          .required('Last name is required')
          .max(50, 'Last name length must be less than 50 characters'),
        password: Yup.string()
          .required('Password is required')
          .min(4, 'Password length should be at least 4 characters'),
        password2: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
    })

    const navigate = useNavigate()
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);

    useEffect(()=>{
        if (props.user){
            navigate('/')
        }
    },[])

    const submitSignup = async (data)=>{
        let response = await AuthAPI.signUp(data)
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
                    <h3>Signup Page</h3>
                    <Form onSubmit={handleSubmit(submitSignup)}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control {...register("email")} type="text" placeholder="Enter your email" />
                            {errors.email && <small className="form-error">{errors.email?.message}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFirstName">
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control {...register("first_name")} type="text" placeholder="Enter your first name" />
                            {errors.first_name && <small className="form-error">{errors.first_name?.message}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control {...register("last_name")} type="text" placeholder="Enter your last name" />
                            {errors.last_name && <small className="form-error">{errors.last_name?.message}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control {...register("password")} type="password" placeholder="Password" />
                            {errors.password && <small className="form-error">{errors.password?.message}</small>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control {...register("password2")} type="password" placeholder="Re-type password" />
                            {errors.password2 && <small className="form-error">{errors.password2?.message}</small>}
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
  
  export default SignUpPage;