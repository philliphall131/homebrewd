import './App.css';
import {  Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// components and pages
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/AccountPages/LoginPage'
import BarPage from './pages/BarPages/BarPage';
import SignUpPage from './pages/AccountPages/SignUpPage';
import BeerInfoPage from './pages/BarPages/BeerInfoPage';
import Account from './pages/AccountPages/Account';
import CheckLoginPage from './pages/CheckLoginPage';
import NewBar from './pages/AccountPages/NewBar';
import EditTapPage from './pages/AccountPages/EditTapPage';
import EditUserPage from './pages/AccountPages/EditUserPage';
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
          <Route path="/account/edit" element={ <CheckLoginPage user={ user } actualPage={ () => <EditUserPage user={user} setUser={setUser}/>} />}/>
          <Route path="/bar/new" element={ <CheckLoginPage user={ user } actualPage={ () => <NewBar user={user} setUser={setUser}/>} />}/>
          <Route path="/bar/:barID" element={<BarPage user={user} setBarNameNav={setBarNameNav}/>} />
          <Route path="/bar/:barID/tap/:tapID/edit" element={ <CheckLoginPage user={ user } actualPage={ () => <EditTapPage user={user}/> }/>}/>
          <Route path="/bar/:barID/beer/:beerID" element={<BeerInfoPage setBarNameNav={setBarNameNav}/>} />
        </Routes>
      </Container>  
    </div>
  );
}

export default App;
