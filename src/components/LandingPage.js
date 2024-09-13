import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

const LandingPage = () => {
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const handleContinueAsGuest = () => {
    navigate("/home"); // Use navigate for programmatic routing
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm">
        <div className="container">
          <button className="navbar-brand" style={{ cursor: "pointer" }}>
            <img
              src="/images/C.png"
              alt="Logo"
              style={{ height: "30px", marginRight: "10px" }}
            />
            Connor's Webpage
          </button>
          <div className="ml-auto">
            <a href="/signup" className="btn btn-primary mr-2">
              Sign Up
            </a>
            <a href="/login" className="btn btn-outline-primary">
              Log In
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center bg-primary text-white py-5">
        <div className="container">
          <h1 className="display-4 font-weight-bold">
            Become a Pioneer in Productivity
          </h1>
          <p className="lead">
            Organize your tasks, prioritize what's important, and achieve more
            with Connor's Webpage.
          </p>
          <button
            onClick={handleContinueAsGuest}
            className="btn btn-light btn-lg mx-2"
          >
            Continue as Guest
          </button>
          <a href="/signup" className="btn btn-outline-light btn-lg mx-2">
            Get Started
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="mb-4">Explore Features Built for Pioneers</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="fas fa-map-signs fa-3x text-primary mb-3"></i>
              <h4>Create & Navigate Tasks</h4>
              <p>
                Stay organized by creating tasks and navigating through your
                priorities seamlessly.
              </p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-compass fa-3x text-primary mb-3"></i>
              <h4>Track Your Progress</h4>
              <p>
                Mark tasks as complete and visualize your achievements with
                dynamic progress tracking.
              </p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-rocket fa-3x text-primary mb-3"></i>
              <h4>Prioritize Like a Pioneer</h4>
              <p>
                Set clear priorities and take charge of your journey to
                productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h2>Join the Journey</h2>
          <p className="lead">
            Become a part of Connor's Webpage and start pioneering your path to
            success.
          </p>
          <a href="/signup" className="btn btn-primary btn-lg mx-2">
            Sign Up Now
          </a>
          <a href="/login" className="btn btn-outline-light btn-lg mx-2">
            Log In
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-light text-dark py-4 text-center">
        <div className="container">
          <p className="mb-0">
            &copy; 2024 Connor's Webpage. All rights reserved. | Pioneering
            Productivity
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
