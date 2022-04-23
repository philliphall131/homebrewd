import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthAPI from "../../utils/auth_utils";
import * as Yup from 'yup'
import { Formik } from 'formik';
import "../../pages/pages.css";


function ChangePassword(props) {
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is required')
          .min(4, 'Password length should be at least 4 characters'),
        password2: Yup.string()
          .required('Confirm Password is required')
          .oneOf([Yup.ref('password')], 'Passwords must match'),
    })

    const initialValues = {
        password:'',
        password2:''
    };

    const onSubmit = async (values, { setSubmitting, resetForm })=> {
        let response = await AuthAPI.updateUserInfo(props.user.id, values)
        if (response) {
            props.setUser(null);
            localStorage.clear();
            navigate('/login')
            setSubmitting(false)
            resetForm({values:''})
            alert('Password changed. Please log back in')
        }
    }

    return (
        <Formik validateOnBlur={true}
        validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
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
  
  export default ChangePassword;