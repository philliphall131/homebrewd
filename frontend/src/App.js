import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// components and pages
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BarPage from './pages/BarPage';
import SignUpPage from './pages/SignUpPage';
import BeerInfoPage from './pages/BeerInfoPage';
import Account from './pages/Account';
import CheckLoginPage from './pages/CheckLoginPage';
import NewBar from './pages/NewBar';
import EditTapPage from './pages/EditTapPage';
// styling
import { Container } from 'react-bootstrap';
import background from "./img/chalkboard.jpg";

function App() {

  const [user, setUser] = useState(null)
  const [barNameNav, setBarNameNav] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className="main-body" style={{ backgroundImage: `url(${background})` }}>
      <NavBar user={user} setUser={setUser} barNameNav={barNameNav} />
      <Container id="main-content" className="my-0 p-3">
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
          <Route path="/signup" element={<SignUpPage user={user} setUser={setUser}/>} />
          <Route path="/account" element={ <CheckLoginPage user={ user } actualPage={ () => <Account user={user} setUser={setUser}/> }/>}/>
          <Route path="/bar/new" element={ <CheckLoginPage user={ user } actualPage={ () => <NewBar user={user} setUser={setUser}/>} />}/>
          <Route path="/bar/:barID" element={<BarPage setBarNameNav={setBarNameNav}/>} />
          <Route path="/bar/:barID/tap/:tapID/edit" element={ <CheckLoginPage user={ user } actualPage={ () => <EditTapPage user={user}/> }/>}/>
          <Route path="/bar/:barID/beer/:beerID" element={<BeerInfoPage setBarNameNav={setBarNameNav}/>} />
        </Routes>
      </Container>  
    </div>
  );
}

export default App;
