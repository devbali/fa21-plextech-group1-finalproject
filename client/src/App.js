import './App.css';

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import Home from './pages/home';
import LoginPage from './pages/login';
// import NewUser from './pages/usersetup';
// import Dashboard from './pages/dashboard';
import Schedule from './pages/schedule';
//import { FormDemo } from './pages/meeting';
import NavBar from './components/NavBar';
import Register from './pages/register';
// import LoginPage from './components/Login';

export default function App() {
  return (
    
    <Router>

      <div>
        {/*<ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />*/}

        {/*
          A <Routes> looks through all its children <Routes>
          elements and renders the first one whose path
          matches the current URL. Use a <Routes> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/schedule" element={<Schedule/>}/> 
          {/* <Route path="/meeting" element={<FormDemo/>}/> */}
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}