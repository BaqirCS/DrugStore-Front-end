import React from 'react';
import { Link } from 'react-router-dom';
function LandingPage() {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark  p-3">
        <div className="container">
          <Link className="navbar-brand" to="/login">
            Khadem DrugStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="landingPage"></div>
    </>
  );
}

export default LandingPage;
