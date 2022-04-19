import './NavBar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import beerMug from "../../img/beermug.png"
import AuthAPI from '../../utils/auth_utils.js';

function NavBar(props) {

  const handleLogout = ()=>{
    props.setUser(null);
    localStorage.clear();
    AuthAPI.logOut()
  }

  const renderBar = ()=>{
    if (props.bar) {
      return <span>|&emsp;Phil's Bar</span>
    } else {
      return ""
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
        <span className="nav-bar-text">HomeBrewD</span>
      </Navbar.Brand>
      <Navbar.Text id="sub-brand">{renderBar()}</Navbar.Text>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {!props.user && <Nav.Link href="#/signup"><span className="nav-bar-text">Sign Up</span></Nav.Link>}
              {!props.user && <Nav.Link href="#/login"><span className="nav-bar-text">Log In</span></Nav.Link>}
              {props.user && <div id="user-letter">{getLetter()}</div>}
              {props.user && <Nav.Link onClick={ handleLogout }><span className="nav-bar-text">Log Out</span></Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  )
}

export default NavBar;