import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import BarAPI from "../../utils/bar_utils";
import { useForm } from "react-hook-form";
import "../../pages/pages.css"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


function ImportBeerForm(props) {
    const [beerInfo, setBeerInfo] = useState(null)

    const params = useParams()
    let tapId = params.tapID
    let barId = params.barID

    useEffect(() => {
        if(props.beerId)
            getBeerInfo(props.beerId)
      }, [props.beerId]);

    const getBeerInfo = async (id)=>{
        let response = await BarAPI.fetchBFBeer(id)
        if (response){
            setBeerInfo(response)
        }
    }

    const formSchema = Yup.object().shape({
        name: Yup.string()
          .required('Beer name is required'),
        quantity_start: Yup.number()
          .required('You must enter the quantity of beer being added')
          .integer('The quantity must be an integer (no decimals yall)'),
    })

    const navigate = useNavigate()
    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);

    const submitNewBeer = async (data)=>{
        data['bar'] = barId
        data['tap'] = tapId
        let response = await BarAPI.newBeer(data)
        if (response) {
            navigate('/account')
        }
    }

    const beerForm = ()=>{
        return (
            <Form onSubmit={handleSubmit(submitNewBeer)}>
                <Form.Group className="mb-3" controlId="formBeerName">
                    <Form.Label>Beer Name:</Form.Label>
                    <Form.Control {...register("name")} type="text" placeholder="e.g. Bill's Favorite Oatmeal Stout" value={beerInfo ? beerInfo.recipe.name : ''}/>
                    {errors.name && <small className="form-error">{errors.name?.message}</small>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity (in floz.):</Form.Label>
                    <Form.Control {...register("quantity_start")} type="text" placeholder="Enter a quantity, e.g. 640oz (640 is 5gal)" value={beerInfo ? Math.round(beerInfo.measuredBatchSize * 35.19) : ''}/>
                    {errors.quantit_start && <small className="form-error">{errors.quantity?.message}</small>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
    return (<>{ beerForm() }</>);
  }
  
  export default ImportBeerForm;