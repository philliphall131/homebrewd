import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import BarAPI from "../../utils/bar_utils";
import * as Yup from 'yup'
import { Formik } from 'formik';
import "../../pages/pages.css";

function EditModal(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
          .required('Bar name is required'),
        num_taps: Yup.number()
          .required('Last name is required')
          .positive('Must be a positive number')
          .max(12, 'Max number of taps is 12'),
    })

    const initialValues = {
        name:       props.bar ? props.bar.name : '',
        num_taps:   props.bar ? props.bar.num_taps : '',
    };

    const onSubmit = async (values, { setSubmitting, resetForm })=> {
        let response = await BarAPI.updateBar(values, props.bar.id)
        if (response) {
            props.setBar(response)
            setSubmitting(false)
            resetForm({values:''})
            handleClose()
        }
    }

    const editBarForm = ()=>{
        return(
            <Formik validateOnBlur={true}
                validateOnChange={false} {...{initialValues, onSubmit, validationSchema }}>
                    {({ handleSubmit, handleBlur, handleChange, values, errors, isSubmitting, touched }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Bar Name:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="name"
                                    value={values.name}
                                    placeholder="Give your bar a name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.name && !!errors.name} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formNumTaps">
                                <Form.Label>Number of Taps:</Form.Label>
                                <Form.Control  
                                    type="text"
                                    name="num_taps" 
                                    value={values.num_taps}
                                    placeholder="Number of taps" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.num_taps && !!errors.num_taps} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.num_taps}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="warning" type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
        )
    }



    return (
        <>
            <Button className="mx-3" variant="warning" onClick={handleShow}>Edit Bar</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your bar info</Modal.Title>
                </Modal.Header>
                <Modal.Body>{editBarForm()}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal;