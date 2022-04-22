import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import './pages.css';
import BarAPI from "../utils/bar_utils";
import AuthAPI from "../utils/auth_utils";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


function NewBar(props) {
    const formSchema = Yup.object().shape({
        name: Yup.string()
          .required('A Bar Name is required'),
        num_taps: Yup.number()
          .required('Specify an number of taps for your bar')
          .integer('Number of taps must be an integer (no decimals yall)')
    })

    const navigate = useNavigate()
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);

    useEffect(()=>{
        if (props.user.bar){
            navigate('/')
        }
    },[])
    

    const submitBarForm = async (data)=>{
        let response = await BarAPI.newBar(data)
        if (response) {
            let updatedUser = await AuthAPI.updateUser(props.user.id)
            if (updatedUser){
                props.setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            navigate('/account')
            } else {
                console.log('Problem creating bar')
            }
            
        }
    }
      
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="login p-3" md="5">
                    <h3 className="text-center">Make a new bar</h3>
                    <Form onSubmit={handleSubmit(submitBarForm)}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Bar Name:</Form.Label>
                            <Form.Control {...register("name")} type="text" placeholder="eg. Bill's Bar" />
                            {errors.name && <small className="form-error">{errors.name?.message}</small>}
                        </Form.Group>
                        <Form.Group controlId="formTaps">
                            <Form.Label>Number of taps:</Form.Label>
                            <Form.Select  {...register("num_taps")}>
                                {Array.from({ length: 12 }).map((_, idx) => (
                                    <option key={idx}>{idx+1}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button className="my-4" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default NewBar;