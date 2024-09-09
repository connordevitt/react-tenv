// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';  // Landing page component
import HomePage from './components/HomePage';        // Home (main working page) component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  {/* Default landing page */}
        <Route path="/home" element={<HomePage />} /> {/* Main working page */}
      </Routes>
    </Router>
  );
}

export default App;
