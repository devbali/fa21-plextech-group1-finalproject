import logo from './logo.svg';
import './App.css';
import Schedule from './pages/schedule';
/*import { FormDemo } from './pages/meeting';*/
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LoginPage from './pages/login';
import TopBar from './components/TopBar';

export default function App() {
  return (
    <Router>
      <div>
        <TopBar/>
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
          <Route exact path="/login" element={<LoginPage/>} />
          <Route path="/newuser" element={<NewUser/>}/>
         <Route path="/schedule" element={<Schedule/>}/> 
         { /*<Route path="/meeting" element={<FormDemo/>}/>*/}
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NewUser() {
  return (
    <div>
      <h2>Eugene's Page</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
