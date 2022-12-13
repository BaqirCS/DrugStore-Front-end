import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AppContext';
function Navbar() {
  const data = localStorage.getItem('AuthUser')
    ? JSON.parse(localStorage.getItem('AuthUser'))
    : null;
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);
  const logoutHandler = async () => {
    await axios.get('/users/logout');
    setValue(null);
    localStorage.removeItem('AuthUser');
    navigate('/');
  };

  return (
    value && (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark  p-3">
        <div className="container">
          <Link className="navbar-brand" to="/drugs">
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
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="DrugDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  DRUGS
                </Link>
                <div className="dropdown-menu " aria-labelledby="DrugDropDown">
                  <Link className="dropdown-item " to="/drugs">
                    All Drugs
                  </Link>
                  <Link className="dropdown-item " to="/singleDrug">
                    Add Drug
                  </Link>
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="AccountingDropDown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  ACCOUNTING
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="AccountingDropDown"
                >
                  <Link className="dropdown-item" to="/accounting">
                    All Financials
                  </Link>
                  <Link className="dropdown-item" to="/sellDrugPage">
                    Sell Drug
                  </Link>
                  <Link className="dropdown-item" to="/withdraw">
                    Withdraw
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/expirationList">
                  EXPIRATION LIST
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/deficiency">
                  DEFICIENCY
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="profileOne"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {data ? data.name : 'user'}
                </Link>
                <div className="dropdown-menu " aria-labelledby="profileOne">
                  <Link className="dropdown-item " to="/profile">
                    PROFILE
                  </Link>
                  {data && data.status === 'admin' && (
                    <Link className="dropdown-item " to="/users">
                      ALL USERS
                    </Link>
                  )}
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logoutHandler}>
                  LOG OUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
}

export default Navbar;
