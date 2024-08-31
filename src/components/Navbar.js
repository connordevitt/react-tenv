// src/components/Navbar.js

import React from 'react';

function Navbar({ toggleDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-brand btn btn-link" onClick={() => window.location.href = '/'}>
          <img src="/images/connors-webpage.png" alt="Logo" height="30" />
          To-Do List
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="#patch-notes">Patch Notes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pioneer">Pioneer of the Month</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#bugs">Known Bugs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#uptime">Uptime</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#diagnostics">Diagnostics</a>
            </li>
          </ul>
          <div className="ms-auto">
            <button className="btn btn-primary me-2" onClick={() => alert('Sign Up clicked!')}>Sign Up</button>
            <button className="btn btn-primary me-2" onClick={() => alert('Login clicked!')}>Login</button>
            <button onClick={toggleDarkMode} className="btn btn-outline-light">
              Toggle Dark Mode
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
