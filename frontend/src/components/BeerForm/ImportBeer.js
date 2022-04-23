import { Form, Collapse, Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import BarAPI from '../../utils/bar_utils';
import BeerForm from './BeerForm';
import './BeerForm.css'


function ImportBeer(props) {
    const [bfBeers, setBfBeers] = useState([])
    const [beerPicked, setBeerPicked] = useState(null)
    const [open, setOpen] = useState(false);
    const [ready, setReady]=useState(false)

    useEffect(()=>{
        getBfBeers()
    },[])

    useEffect(()=>{
        if (beerPicked) {
            setReady(true)
        }
    },[beerPicked])

    const getBfBeers = async ()=>{
        let response = await BarAPI.getAllBfBeers()
        if (response) {
            setBfBeers(response)
        }
    }

    const getBfBeer = async (id)=>{
        let response = await BarAPI.getOneBfBeer(id)
        if (response) {
            let newBeer = {
                'name':response.recipe.name,
                'brew_date':formatDate4Form(response.brewDate),
                'keg_date':formatDate4Form(response.bottlingDate),
                'quantity_start':response.measuredBatchSize,
                'abv':response.measuredAbv
            }
            console.log('newBeer', newBeer)
            setBeerPicked(newBeer)
        }
    }

    const formatDate4Reading = (date) =>{
        if (date===null) return
        let d = new Date(date)
        return d.toLocaleDateString()
    }

    const formatDate4Form = (date) =>{
        if (date===null) return
        let d = new Date(date)
        return d.toISOString().split('T')[0]
    }

    const openForm = (evt)=>{
        if (evt.target.value == 0) {
            setOpen(false)
        } else {
            setReady(false)
            setOpen(false)
            getBfBeer(evt.target.value)
            setOpen(true) 
        }
    }

    const renderImportsSelect = () =>{
        return (
            <Form.Select onChange={(e)=>openForm(e)} aria-label="Default select example">
                <option value={0}>Select an imported beer</option>
                {bfBeers.map((beer, idx)=>(
                    <option key={idx} value={beer._id}>{beer.recipe.name} {formatDate4Reading(beer.brewDate)}</option>
                ))}
            </Form.Select>
        )
    }

    return (
        <>
            { renderImportsSelect() }
            <br />
            <Collapse in={open}>
                <div id="example-collapse-text">
                    { !ready && <div className='spinner'><Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner></div>}
                    { ready && <BeerForm beer={beerPicked} tapId={props.tapId} barId={props.barId}/>}
                </div>
            </Collapse>
        </>
    );
  }
  
  export default ImportBeer;