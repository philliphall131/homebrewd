import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthAPI from "../../utils/auth_utils";
import * as Yup from 'yup'
import { Formik } from 'formik';
import "../../pages/pages.css";


function ChangeName(props) {

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
          .required('First name is required')
          .max(50, 'First name length must be less than 50 characters'),
        last_name: Yup.string()
          .required('Last name is required')
          .max(50, 'Last name length must be less than 50 characters'),
    })

    const initialValues = {
        first_name: props.user.first_name,
        last_name: props.user.last_name,
    };

    const onSubmit = async (values, { setSubmitting, resetForm })=> {
        let response = await AuthAPI.updateUserInfo(props.user.id, values)
        if (response) {
            props.setUser(response)
            localStorage.setItem('user', JSON.stringify(response))
            setSubmitting(false)
            resetForm({values:''})
            alert('Name changed')
        }
    }

    return (
        <Formik validateOnBlur={true}
        validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
            {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
                <Form noValidate onSubmit={handleSubmit}>
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
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
  }
  
  export default ChangeName;