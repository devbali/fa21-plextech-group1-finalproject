import './App.css';

import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import Home from './pages/home';
import Dashboard from './pages/dashboard';
//import { FormDemo } from './pages/meeting';
import Register from './pages/register';

export default function App() {
  return (
    
    <Router>

      <div>
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
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/> 

          {/* <Route path="/meeting" element={<FormDemo/>}/> */}
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Routes>
      </div>
    </Router>
  );
}