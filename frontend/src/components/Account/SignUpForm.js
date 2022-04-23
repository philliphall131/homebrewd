import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthAPI from "../../utils/auth_utils";
import * as Yup from 'yup'
import { Formik } from 'formik';
import "../../pages/pages.css";


function SignUpForm(props) {
    const navigate = useNavigate()

    useEffect(()=>{
        if (props.user){
            navigate('/')
        }
    },[])

    const validationSchema = Yup.object().shape({
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

    const initialValues = {
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        password2:''
    };

    const onSubmit = async (values, { setSubmitting })=> {
        let response = await AuthAPI.signUp(values)
        if (response) {
            props.setUser(response)
            localStorage.setItem('user', JSON.stringify(response))
            navigate('/')
            setSubmitting(false)
        }
    }

    return (
        <Formik validateOnBlur={true}
        validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="email"
                            value={values.email}
                            placeholder="Enter your email" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="first_name"
                            value={values.first_name}
                            placeholder="Enter your first name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.first_name && !!errors.first_name} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control  
                            type="text"
                            name="last_name" 
                            value={values.last_name}
                            placeholder="Enter your last name" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.last_name && !!errors.last_name} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password" 
                            name= "password"
                            value={values.password}
                            placeholder="Password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password" 
                            name="password2"
                            value={values.password2}
                            placeholder="Re-type password" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password2 && !!errors.password2}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password2}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
  }
  
  export default SignUpForm;