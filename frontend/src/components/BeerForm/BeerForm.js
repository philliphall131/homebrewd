import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import BarAPI from "../../utils/bar_utils";
import "./BeerForm.css";
import * as yup from 'yup'
import { Formik } from 'formik';

function BeerForm(props) {
    const navigate = useNavigate();
    const validationSchema = yup.object().shape({
        name:           yup.string().required('A beer name required'),
        brew_date:    yup.date(),
        keg_date:    yup.date(),
        quantity_start: yup.string().required('Quantity required'),
        abv:            yup.number().positive(),
    });

    const initialValues = {
        name:           props.beer ? props.beer.name : '',
        brew_date:      props.beer ? props.beer.brew_date : '',
        keg_date:       props.beer ? props.beer.keg_date : '',
        quantity_start: props.beer ? props.beer.quantity_start : '',
        abv:            props.beer ? props.beer.abv : '',
    };
    const onSubmit = async (values, { setSubmitting })=> {
        values['bar'] = props.barId
        values['tap'] = props.tapId
        console.log()
        if (props.beer){
            //send patch/put request
            alert('patch request')
        } else {
            let response = await BarAPI.newBeer(values)
            if (response) {
                navigate('/account')
        }
        }
        setSubmitting(false);
    }

    return (
        <Formik {...{initialValues, onSubmit, validationSchema }}>
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBeerName">
                        <Form.Label><span className="required">*</span>Beer Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={values.name}
                            placeholder="e.g. Bill's Favorite Oatmeal Stout"
                            onChange={handleChange}
                            isInvalid={errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBrewDate">
                        <Form.Label>Date Brewed:</Form.Label>
                        <Form.Control 
                            type="date"
                            name="brew_date"
                            value={values.brew_date}
                            onChange={handleChange}
                            isInvalid={errors.brew_date}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.brew_date}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formKegDate">
                        <Form.Label>Date Kegged:</Form.Label>
                        <Form.Control 
                            type="date"
                            name="keg_date"
                            value={values.keg_date}
                            onChange={handleChange}
                            isInvalid={errors.keg_date}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.keg_date}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formQuantityStart">
                        <Form.Label><span className="required">*</span>Quantity in keg (in floz.):</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="quantity_start"
                            value={values.quantity_start}
                            placeholder="Enter a quantity, e.g. 640oz (640 is 5gal)"
                            onChange={handleChange}
                            isInvalid={errors.quantity_start}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.quantity_start}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formABV">
                        <Form.Label>ABV:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="abv"
                            value={values.abv}
                            placeholder="Enter beer's alcohol by volume"
                            onChange={handleChange}
                            isInvalid={errors.abv}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.abv}
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
  
  export default BeerForm;