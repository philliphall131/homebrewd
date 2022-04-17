import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// components and pages
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
// styling
import { Container } from 'react-bootstrap';
// import background from "./img/placeholder.png";

function App() {
  return (
    <div className="main-body" style={{ backgroundImage: "url(/chalkboard.jpg)" }}>
      <NavBar />
      <Container id="main-content" className="my-0 p-3">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </Container>  
    </div>
  );
}

export default App;
