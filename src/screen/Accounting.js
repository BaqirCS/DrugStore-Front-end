import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InfoMessage from '../component/InfoMessage';
import Loader from '../component/Loader';
import { Store } from '../context/Store';
import { accountReducer, initialState } from '../reducers/accountReducer';

function Accounting() {
  const { state: ctxState } = useContext(Store);
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchDailyData();
    fetchMonthlyData();
    fetchTotalData();
    // eslint-disable-next-line
  }, []);

  const searchHandler = () => {
    navigate(`/singleAccount?date=${search}`);
  };

  const fetchDailyData = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/accounts`, {
        headers: { authorization: `Bearer ${ctxState.userInfo.token}` },
      });
      dispatch({ type: 'GET_D_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_D_FAIL', payload: error.response.data });
    }
  };
  const fetchMonthlyData = async () => {
    try {
      dispatch({ type: 'GET_M_REQUEST' });

      const { data } = await axios.get(
        `${ctxState.baseUrl}/accounts/getAccountsByMonth`,
        {
          headers: { authorization: `Bearer ${ctxState.userInfo.token}` },
        }
      );
      dispatch({ type: 'GET_M_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_M_FAIL', payload: error.response.data });
    }
  };
  const fetchTotalData = async () => {
    try {
      dispatch({ type: 'GET_T_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/accounts/getTotalAccounts`,
        {
          headers: { authorization: `Bearer ${ctxState.userInfo.token}` },
        }
      );
      dispatch({ type: 'GET_T_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_T_FAIL', payload: error.response.data });
    }
  };

  const clickHandler = (date) => {
    const datex = new Date(date);
    const month = datex.getMonth() + 1;
    const result = date.split('-')[2] + '-' + month + '-' + date.split('-')[1];
    navigate(`/singleAccount?date=${result}`);
  };
  return (
    <div className="container mt-4">
      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <InfoMessage color="warning" message={state.message} />
      ) : (
        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active "
                id="nav-home-tab"
                data-bs-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="false"
              >
                Daily Account
              </a>

              <a
                className="nav-item nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                href="#nav-contact"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Monthly Account
              </a>
              <a
                className="nav-item nav-link "
                id="nav-all-tab"
                data-bs-toggle="tab"
                href="#nav-all"
                role="tab"
                aria-controls="nav-all"
                aria-selected="true"
              >
                Total Account
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            {/* start of total show all  */}
            {state.totalAcc && (
              <div
                className="tab-pane fade show "
                id="nav-all"
                role="tabpanel"
                aria-labelledby="nav-all-tab"
              >
                <h2 className="text-center mt-5 mb-3">
                  Total DrugStore Accounting
                </h2>

                <table
                  className="table align-middle mb-0 table-hover"
                  style={{ backgroundColor: '#eee' }}
                >
                  <thead className="bg-dark text-white ">
                    <tr className="text-center">
                      <th>Total Sell</th>
                      <th> Cash</th>
                      <th> Cart </th>
                      <th>Available Cash</th>
                      <th>Withdraw Cash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>{state.totalAcc.totalSell}</td>
                      <td>{state.totalAcc.cash}</td>
                      <td>{state.totalAcc.card}</td>
                      <td>{state.totalAcc.availableCash}</td>
                      <td>
                        {state.totalAcc.availableCash > 0 ? (
                          <Link
                            to="/withdraw"
                            className="btn"
                            style={{
                              backgroundColor: '#009000',
                              color: 'white',
                              borderColor: '#009000',
                            }}
                          >
                            Withdraw
                          </Link>
                        ) : (
                          <small>Lack Of Money</small>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* finish of total show */}

            {/* start of daily show */}
            {state.dailyAcc && state.dailyAcc.length > 0 && (
              <div
                className="tab-pane fade show active "
                id="nav-home"
                role="tabpanel"
                style={{ marginBottom: '80px' }}
                aria-labelledby="nav-home-tab"
              >
                <h2 className="text-center mb-4 mt-3">Daily Accounting </h2>
                <ul className=" d-flex mb-4 mt-4">
                  <li className=" me-5 listItem">
                    <input
                      type="date"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Expiration Date"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </li>
                  <li className=" me-5 listItem">
                    <button
                      onClick={searchHandler}
                      className=" btn "
                      style={{
                        backgroundColor: '#009000',
                        color: 'white',
                        borderColor: '#009000',
                      }}
                      href="#"
                    >
                      SEARCH
                    </button>
                  </li>
                </ul>

                <table
                  className="table align-middle mb-0 table-hover"
                  style={{ backgroundColor: '#eee' }}
                >
                  <thead className="bg-dark text-white ">
                    <tr className="text-center">
                      <th>Date</th>
                      <th>Day of Week</th>
                      <th>Total Sell</th>
                      <th>Cash</th>
                      <th>Card</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.dailyAcc.map((item, index) => (
                      <tr
                        className="text-center"
                        key={index}
                        onClick={() => clickHandler(item.date)}
                      >
                        <td>{item.date}</td>
                        <td>{item.dayOfWeek}</td>
                        <td>{item.totalSell}</td>
                        <td>{item.cash}</td>
                        <td>{item.card}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* above is the finish of daily show */}

            {/* start the mnonthly accounting show */}
            {state.monthlyAcc && state.monthlyAcc.length > 0 && (
              <div
                className="tab-pane fade"
                style={{ marginBottom: '80px' }}
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <h2 className="text-center mb-4 mt-3">Monthly Accounting </h2>
                <table
                  className="table align-middle mb-0 table-hover"
                  style={{ backgroundColor: '#eee' }}
                >
                  <thead className="bg-dark text-white ">
                    <tr className="text-center">
                      <th>Month</th>
                      <th>Total Sell</th>
                      <th>Total Cash</th>
                      <th>Total Card</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.monthlyAcc.map((item, index) => (
                      <tr className="text-center" key={index}>
                        <td>{item.month}</td>
                        <td>{item.totalSell}</td>
                        <td>{item.cash}</td>
                        <td>{item.card}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* above is the finish of monthly show */}
          </div>
        </div>
      )}
      {/* finish the error checking */}
    </div>
  );
}

export default Accounting;
