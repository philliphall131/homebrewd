import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthAPI from "../../utils/auth_utils";
import * as Yup from 'yup'
import { Formik } from 'formik';
import "../../pages/pages.css";


function ChangeEmail(props) {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .email('Not a valid email'),
    })

    const initialValues = {
        email: props.user.email,
    };

    const onSubmit = async (values, { setSubmitting, resetForm })=> {
        let response = await AuthAPI.updateUserInfo(props.user.id, values)
        if (response) {
            props.setUser(response)
            localStorage.setItem('user', JSON.stringify(response))
            // navigate('/login')
            setSubmitting(false)
            resetForm({values:''})
            alert('Email changed')
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
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
  }
  
  export default ChangeEmail;