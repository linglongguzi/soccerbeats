
import React from 'react';
import { Link, NavLink } from "react-router-dom";

import AppRouting from './app-routing';
import logo from './assets/logobrand.png';


import './index.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Wallet from './components/Wallet';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const navMain = document.getElementById('navbarCollapse');
    if (navMain) {
      navMain.onclick = function onClick() {
        if (navMain) {
          navMain.classList.remove("show");
        }
      }
    }
  }

  render() {

    return (
      <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <div >
        <header className="navbar navbar-expand-md navbar-dark nga-navbar">
          <nav className="container" aria-label="Main navigation">
            <NavLink className="navbar-brand" to="/">
              <img src={logo} width="125" height="50" alt="Logo" />
            </NavLink>

            <div className="navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'black'})}>Accessories</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myassets" style={({ isActive }) => 
                      (isActive ? {color: 'blue'} : {color: 'black'})}>My Assets</NavLink>
                </li>
              </ul>
              <Wallet></Wallet>
            </div>
          </nav>
        </header>
        <main>
          <AppRouting />
        </main>
      </div>
      </ThirdwebProvider>
    )
  }

}

export default App;