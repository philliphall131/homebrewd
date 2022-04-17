import './NavBar.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import beerMug from "./beermug.png"

function NavBar() {

  return (
    
    <Navbar variant="dark" sticky="top" expand="md">
      <Container>
      <Navbar.Brand href="#">
        <img alt="" src={beerMug} width="30" height="30" className="d-inline-block align-top"/>{' '}
        <span className="nav-bar-text">HomeBrewD | Phil's Bar</span>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              <Nav.Link href="#/"><span className="nav-bar-text">Sign Up</span></Nav.Link>
              <Nav.Link href="#/"><span className="nav-bar-text">Log In</span></Nav.Link>
              <Nav.Link href="#/"><span className="nav-bar-text">Log Out</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    
  )
}

export default NavBar;