import { Button, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import BarAPI from "../../utils/bar_utils.js";
import './Account.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DeleteModal from "../DeleteModal/DeleteModal.js";
import AddBFModal from "../AddBFModal/AddBFModal.js";

function Owner(props) {
    const [bar, setBar] = useState(null)
    const [beersOnTap, setBeersOnTap] = useState([])
    let navigate = useNavigate()

    useEffect(()=>{
        getBar()
    },[props.user])

    useEffect(()=>{
        if (bar){
            getBeers()
        }
    },[bar])

    const getBar = async ()=>{
        setBar(await BarAPI.fetchBar(props.user.bar))
    }

    const deleteBar = ()=>{
        let response = BarAPI.deleteBar(bar.id)
        if (response){
            setBar(null)
            let newUser = props.user
            newUser.bar = null
            props.setUser(newUser)
            navigate("/account")
        } 
    }

    const getBeers = async ()=>{
        let beers = []
        for (let i=0; i<bar.taps.length; i++){
            if (bar.taps[i]){
                let beer = await BarAPI.fetchBeer(bar.taps[i])
                beers.push(beer)
            } else {
                beers.push(null)
            }
        }
        setBeersOnTap(beers)
    }

    const renderTaps = ()=>{
        let tapsRender = []
        for (let i=0; i<beersOnTap.length; i++){
            if (beersOnTap[i]){
                tapsRender.push(
                    <tr key={i}>
                        <td className="cell1">{`Tap${i+1}`}</td>
                        <td className="cell2">{`${beersOnTap[i].name}`}</td>
                        <td className="cell3">{`${beersOnTap[i].quantity_start}`}</td>
                        <td className="cell4">{`${beersOnTap[i].quantity_remaining}`}</td>
                        <td className="cell5">
                            <Link to={`/bar/${bar.id}/tap/${i+1}/edit`}>
                                <Button className="edit-beer-button" variant="secondary">Edit Tap</Button>
                            </Link>
                        </td>
                    </tr>
                    )
            } else {
                tapsRender.push(
                    <tr key={i}>
                        <td className="cell1">{`Tap${i+1}`}</td>
                        <td className="cell2">No Beer on Tap</td>
                        <td className="cell3"></td>
                        <td className="cell4"></td>
                        <td className="cell5">
                            <Link to={`/bar/${bar.id}/tap/${i+1}/edit`}>
                                <Button className="edit-beer-button" variant="secondary">Edit Tap</Button>
                            </Link>
                        </td>
                    </tr>)
            }
        }
        return (
            <Table>
                <thead>
                    <tr>
                    <th className="cell1">Tap</th>
                    <th className="cell2">Beer</th>
                    <th className="cell3">Initial Quantity</th>
                    <th className="cell4">Remaining</th>
                    <th className="cell5">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tapsRender}
                </tbody>
            </Table>
        )
    }

    return (
        <div>
            <h4 className="text-center">{bar && bar.name} Settings</h4>
            { bar && renderTaps() }
            <div className="text-center">
                <DeleteModal type={'Bar'} deleteAction={deleteBar}/>
                <AddBFModal user={props.user} setUser={props.setUser}/>
            </div>
        </div>
    );
}

export default Owner;