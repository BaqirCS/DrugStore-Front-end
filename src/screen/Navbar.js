import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../context/Store';
function Navbar() {
  const { state: data, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch({ type: 'USER_SIGN_OUT' });
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark  p-3">
      {data.userInfo && (
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
                  {data.userInfo.user.name}
                </Link>
                <div className="dropdown-menu " aria-labelledby="profileOne">
                  <Link className="dropdown-item " to="/profile">
                    PROFILE
                  </Link>
                  {data.userInfo.user.status === 'admin' && (
                    <Link className="dropdown-item " to="/users">
                      ALL USERS
                    </Link>
                  )}
                </div>
              </li>
              <li className="nav-item" onClick={clickHandler}>
                <Link className="nav-link">LOG OUT</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
