import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../component/Loader';
import { Store } from '../context/Store';
import {
  singleAccountReducer,
  initialState,
} from '../reducers/singleAccountReducer';
function SingleAccount() {
  const [state, dispatch] = useReducer(singleAccountReducer, initialState);
  const { state: ctxState } = useContext(Store);
  const { search } = useLocation();
  const date = search.split('=')[1];
  const gotDate = new Date(date).toString();
  const getDay = (con) => {
    switch (con) {
      case 'Sat':
        return 'Saturday';
      case 'Sun':
        return 'Sunday';
      case 'Mon':
        return 'Monday';
      case 'Tue':
        return 'Tuesday';
      case 'Wed':
        return 'Wednessday';
      case 'Thu':
        return 'Thursday';
      default:
        return 'Friday';
    }
  };
  const day = getDay(gotDate.split(' ')[0]);

  useEffect(() => {
    fetchDailyData();
    // eslint-disable-next-line
  }, [date]);

  const fetchDailyData = async () => {
    try {
      dispatch({ type: 'SINGLE_ACCOUNT_REQUEST' });
      const { data } = await axios.get(
        `${ctxState.baseUrl}/accounts/getDailyAccounts?date=${date}`,
        {
          headers: { authorization: `Bearer ${ctxState.userInfo.token}` },
        }
      );
      dispatch({ type: 'SINGLE_ACCOUNT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SINGLE_ACCOUNT_FAIL', payload: error.response.data });
    }
  };

  return (
    <div className="container mt-4">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          <Link
            to="/accounting"
            className="btn btn-primary "
            style={{
              color: 'white',
              backgroundColor: 'black',
              border: '1px solid black',
            }}
          >
            <i className="bi bi-arrow-left"> </i>
            back
          </Link>
          <h2 className="text-center mb-4">Daily Financial Details</h2>
          {state.singleAccounts.accounts &&
          state.singleAccounts.accounts.length <= 0 ? (
            <h3 className="text-center" style={{ color: 'red' }}>
              There is no selling in this date
            </h3>
          ) : (
            <>
              <p className="display-6">
                {date} ,<b style={{ color: 'red' }}> {day}</b>
              </p>

              {state.singleAccounts.accounts &&
                state.singleAccounts.accounts.length > 0 && (
                  <table
                    className="table align-middle mb-0 table-hover"
                    style={{ backgroundColor: '#eee' }}
                  >
                    <thead className="bg-dark text-white ">
                      <tr className="text-center">
                        <th>#</th>
                        <th>NAME</th>
                        <th>SELLING PRICE</th>
                        <th>AMOUNT</th>
                        <th>CATEGORY</th>
                        <th>MATHOD OF PAY</th>
                        <th> TOTAL </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.singleAccounts.accounts.map((item, index) => (
                        <tr className="text-center" key={item._id}>
                          <td>{index}</td>
                          <td>{item.name} </td>
                          <td>{item.sellingPrice} </td>
                          <td>{item.amount} </td>
                          <td>{item.category}</td>
                          <td>{item.methodOfPay} </td>
                          <td>{item.total} </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              <h2 className="text-center mt-5 mb-3">Total Result Of Day</h2>
              {state.singleAccounts.dayResult && (
                <table
                  className="table align-middle table-hover"
                  style={{ backgroundColor: '#eee', marginBottom: '80px' }}
                >
                  <thead className="bg-dark text-white ">
                    <tr className="text-center">
                      <th>Total Sell</th>
                      <th> Cash</th>
                      <th> Cart </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>{state.singleAccounts.dayResult.totalSell}</td>
                      <td>{state.singleAccounts.dayResult.cash}</td>
                      <td>{state.singleAccounts.dayResult.card}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SingleAccount;
