import { Container, Row, Col, Form, Button, Collapse } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BarAPI from '../utils/bar_utils';
import BeerForm from '../components/BeerForm/BeerForm';
import ImportBeer from '../components/BeerForm/ImportBeer';
import ImportOption from '../components/BeerForm/ImportOption';

function EditTapPage(props) {
    const params = useParams()
    let tapId = params.tapID
    let barId = params.barID
    let navigate = useNavigate()

    const [tapInfo, setTapInfo] = useState(null)

    useEffect(()=>{
        if (barId !== props.user.bar.toString()){
            navigate("/account")
        }
        getTap()
    },[tapId, barId])

    const getTap = async ()=>{
        let bar = await BarAPI.fetchBar(props.user.bar)
        if (tapId > bar.num_taps || tapId < 1){
            navigate("/account")
        } else if (bar && bar.taps[tapId-1]) {
            let beer = await BarAPI.fetchBeer(bar.taps[tapId-1])
            setTapInfo(beer)
        } else {
            setTapInfo('empty')
        }
    }

    const renderTap = () =>{
        if (tapInfo) {
            if (tapInfo === 'empty' && !props.user.bf_user){
                return (<BeerForm beer={null} tapId={tapId} barId={barId}/>)
            } else if (tapInfo === 'empty' && props.user.bf_user){
                return (<ImportOption beer={null} tapId={tapId} barId={barId}/>)
            } else {
                console.log('tapinfo', tapInfo)
                return (<BeerForm beer={tapInfo} tapId={tapId} barId={barId}/>)
            }
        } else {
            return (<div>Loading...</div>)
        }
    }
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col className="login p-3" md="5">
                    <div>Edit Tap</div>
                    <br/>
                    { renderTap() }
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default EditTapPage;