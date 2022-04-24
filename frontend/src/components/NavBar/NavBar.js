import './NavBar.css';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import beerMug from "../../img/beermug.png"
import AuthAPI from '../../utils/auth_utils.js';
import { useNavigate } from "react-router-dom";
import BarAPI from '../../utils/bar_utils';


function NavBar(props) {
  const [favBars, setfavBars] = useState([])
  let navigate = useNavigate()

  useEffect(()=>{
    if (props.user && props.user.favorite_bars.length > 0){
      loadFavoriteBars()
    }
    
  },[props.user])

  const loadFavoriteBars = async ()=>{
    let bars = []
    for (let i=0; i<props.user.favorite_bars.length;i++){
      let response = await BarAPI.fetchBar(props.user.favorite_bars[i])
      if(response && props.user.bar != response.id){
        bars.push(response)
      }
    }
    setfavBars(bars)
  }

  const handleLogout = ()=>{
    props.setUser(null);
    localStorage.clear();
    AuthAPI.logOut()
    navigate("/")
  }

  const renderBar = ()=>{
    if (props.barNameNav) {
      return <span>&emsp;|&emsp;{props.barNameNav}</span>
    } else {
      return ""
    }
  }

  const renderUserDropdown = ()=>{
    return(
      <NavDropdown align="end" title={getLetter()} id="basic-nav-dropdown" className="user-letter">
        {props.user.bar && <NavDropdown.Item href={`#/bar/${props.user.bar}`} className="nav-bar-text">My Bar</NavDropdown.Item> }
        <NavDropdown.Item href={`#/account`} className="nav-bar-text">My Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item className="nav-bar-text" onClick={ handleLogout }>Log Out</NavDropdown.Item>
      </NavDropdown>
    )
  }

  const renderSavedBarsDropdown = ()=>{
    if (favBars){
      return(
        <NavDropdown align="end" title='My Bars' id="basic-nav-dropdown" className="saved-bars">
          {props.user.bar && <NavDropdown.Item href={`#/bar/${props.user.bar}`} className="nav-bar-text">My Bar</NavDropdown.Item> }
          <NavDropdown.Divider />
          {favBars.map((bar, idx)=>(
            <NavDropdown.Item key={idx} className="nav-bar-text" href={`#/bar/${bar.id}`}>{bar.name}</NavDropdown.Item>
          ))}
          
        </NavDropdown>
    )
    }
    
  }

  const getLetter = ()=>{
    if (props.user) {
      return props.user.first_name.charAt(0)
    }
  }

  return (
    
    <Navbar variant="dark" sticky="top" expand="md">
      <Container>
      <Navbar.Brand href="#">
        <img alt="" src={beerMug} width="30" height="30" className="d-inline-block align-top"/>{' '}
        <span className="nav-bar-text">HomeBrewd</span>
        <span id="sub-brand">{renderBar()}</span>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {!props.user && <Nav.Link href="#/signup"><span className="nav-bar-text">Sign Up</span></Nav.Link>}
              {!props.user && <Nav.Link href="#/login"><span className="nav-bar-text">Log In</span></Nav.Link>}
              {props.user && renderSavedBarsDropdown()}
              {props.user && renderUserDropdown()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default NavBar;