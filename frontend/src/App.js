import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// components and pages
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BarPage from './pages/BarPage';
import SignUpPage from './pages/SignUpPage';
// styling
import { Container } from 'react-bootstrap';
import background from "./img/chalkboard.jpg";

function App() {

  const [user, setUser] = useState(null)
  const [bar, setBar] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className="main-body" style={{ backgroundImage: `url(${background})` }}>
      <NavBar user={user} setUser={setUser} bar={bar} />
      <Container id="main-content" className="my-0 p-3">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
            <Route path="/bar/:barID" element={<BarPage setBar={setBar}/>} />
            <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>} />
          </Routes>
        </Router>
      </Container>  
    </div>
  );
}

export default App;
