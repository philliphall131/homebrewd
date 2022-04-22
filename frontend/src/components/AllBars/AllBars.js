import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import BarAPI from "../../utils/bar_utils.js";
import { useNavigate } from "react-router-dom";

function AllBars(props) {
    const [bars, setBars] = useState([])
    let navigate = useNavigate()

    useEffect(()=>{
        getAllBars()
    }, [])

    const getAllBars = async ()=>{
        let result = await BarAPI.fetchAllBars()
        if (result){
            setBars(result)
        }
    }

    const selectBar = (evt)=>{
        navigate(`/bar/${evt.target.value}`)
        console.log(evt.target.value)
    }

    return (
        <Form.Select onChange={(e)=>selectBar(e)} aria-label="Default select example">
            <option>Select a bar:</option>
            {bars.map((bar, idx) => (
                <option key={idx} value={bar.id}>{bar.name}</option>
            ))}
        </Form.Select>
    )
}

export default AllBars