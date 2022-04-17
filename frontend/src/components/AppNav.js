import { Navbar, Container, Nav } from 'react-bootstrap';

function AppNav() {

  return (
    
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
      <Container fluid>
        <Navbar.Brand href="#/">HomeBrewD</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              <Nav.Link href="#/">Sign Up</Nav.Link>
              <Nav.Link href="#/">Log In</Nav.Link>
              <Nav.Link href="#/">Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    
  )
}

export default AppNav;