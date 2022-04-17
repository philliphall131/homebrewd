import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// components and pages
import AppNav from './components/AppNav.js'
import HomePage from './pages/HomePage';
// styling
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="main-body App">
      <AppNav />
      <Container id="main-content App-header" className="my-0 p-3">
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
