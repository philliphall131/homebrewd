import './NavBar.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import beerMug from "../../img/beermug.png"
import AuthAPI from '../../utils/auth_utils.js';
import { useNavigate } from "react-router-dom";


function NavBar(props) {
  let navigate = useNavigate()

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

  const renderDropdown = ()=>{
    return(
      <NavDropdown align="end" title={getLetter()} id="basic-nav-dropdown" className="user-letter">
        {props.user.bar && <NavDropdown.Item href={`#/bar/${props.user.bar}`} className="nav-bar-text">My Bar</NavDropdown.Item> }
        <NavDropdown.Item href={`#/account`} className="nav-bar-text">My Account</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item className="nav-bar-text" onClick={ handleLogout }>Log Out</NavDropdown.Item>
      </NavDropdown>
    )
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
              {props.user && renderDropdown()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default NavBar;