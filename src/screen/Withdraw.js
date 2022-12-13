import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import { initialState, withdrawReducer } from '../reducers/withdrawReducer';

function Withdraw() {
  const [state, dispatch] = useReducer(withdrawReducer, initialState);
  // console.log(state.allWithdraws);
  const current = new Date();
  const formatedDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [withdara, setWithdraw] = useState({
    date: formatedDate,
    by: '',
    reason: '',
    amount: '',
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!withdara.date) {
      return dispatch({
        type: 'WITHDRAW_FAIL',
        payload: 'Date of Withdraw is required',
      });
    }
    if (!withdara.by) {
      return dispatch({
        type: 'WITHDRAW_FAIL',
        payload: 'name of Withdrawer is required',
      });
    }
    if (!withdara.reason) {
      return dispatch({
        type: 'WITHDRAW_FAIL',
        payload: 'Reason of Withdraw is required',
      });
    }
    if (!withdara.amount) {
      return dispatch({
        type: 'WITHDRAW_FAIL',
        payload: 'Amount of Withdraw is required',
      });
    }

    e.preventDefault();
    if (withdara._id) {
      try {
        dispatch({ type: 'UPDATE_WITHDRAW_REQUEST' });
        const { data } = await axios.patch(
          `/withdraw/${withdara._id}`,
          withdara
        );
        dispatch({
          type: 'UPDATE_WITHDRAW_SUCCESS',
          payload: data,
        });
        clearAllFields();
      } catch (error) {
        dispatch({
          type: 'UPDATE_WITHDRAW_FAIL',
          payload: error.response.data,
        });
      }
    } else {
      try {
        dispatch({ type: 'WITHDRAW_REQUEST' });
        const { data } = await axios.post('/withdraw', withdara);

        dispatch({
          type: 'WITHDRAW_SUCCESS',
          payload: data,
        });
        clearAllFields();
      } catch (error) {
        dispatch({ type: 'WITHDRAW_FAIL', payload: error.response.data });
      }
    }
  };

  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const clearAllFields = () => {
    setWithdraw({ date: formatedDate, by: '', reason: '', amount: '' });
  };

  useEffect(() => {
    getAllWithdraw();
  }, []);
  const getAllWithdraw = async () => {
    try {
      const { data } = await axios.get('/withdraw');
      data.map((item) => {
        item.date = item.date = item.date.toString().slice(0, 10);
        return item;
      });
      dispatch({ type: 'GET_WITHDRAW_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_WITHDRAW_FAIL', payload: error.response.data });
    }
  };

  const updateTriger = (id) => {
    const currentWithdraw = state.allWithdraws.find((x) => x._id === id);
    setWithdraw(currentWithdraw);
  };
  return (
    <div className="container mb-2 mt-3 ">
      <div className="xp">
        <Link
          className="btn btn-primary "
          to="/accounting#totalAccount"
          style={{
            marginLeft: '150px',
            color: 'white',
            backgroundColor: 'black',
            border: '1px solid black',
          }}
        >
          <i className="bi bi-arrow-left"> </i>
          back
        </Link>
      </div>
      <h2 className="text-center mb-4">Withdraw Cash </h2>

      {state.error && (
        <div className="row">
          <MessageBox
            showMessage={showMessage}
            color="danger"
            message={state.message}
          />
        </div>
      )}
      {state.success && (
        <div className="row">
          <MessageBox
            showMessage={showMessage}
            color="success"
            message={state.message}
          />
        </div>
      )}

      <form onSubmit={submitHandler} className="inp">
        <div className="row  mb-3">
          <div className="form-group col-md-3" style={{ marginLeft: '150px' }}>
            <label htmlFor="inputEmail4">Date</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="date"
              value={withdara.date}
              disabled
            />
          </div>
          <div className="form-group col-md-3 ">
            <label htmlFor="inputPassword4">By</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="By"
              value={withdara.by}
              onChange={(e) => setWithdraw({ ...withdara, by: e.target.value })}
            />
          </div>
          <div className="form-group col-md-3 " style={{ marginLeft: '' }}>
            <label htmlFor="inputEmail4">Reason</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Reason"
              value={withdara.reason}
              onChange={(e) =>
                setWithdraw({ ...withdara, reason: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row  mb-3">
          <div
            className="form-group col-md-3 xp"
            style={{ marginLeft: '150px' }}
          >
            <label htmlFor="inputEmail4">Amount</label>
            <input
              type="number"
              className="form-control"
              id="inputEmail4"
              placeholder="Amount"
              value={withdara.amount}
              onChange={(e) =>
                setWithdraw({ ...withdara, amount: e.target.value })
              }
            />
          </div>

          <div className="form-group col-md-3 ">
            <button
              type="submit"
              className="btn btn-primary "
              style={{
                marginTop: '23px',
                width: '260px',
                backgroundColor: '#009000',
                borderColor: '#009000',
              }}
            >
              {withdara._id ? 'UPDATE WITHARAW' : 'CREATE WITHDRAW'}
            </button>
          </div>
        </div>
      </form>

      {state.loading && <Loader />}

      {state.allWithdraws && (
        <>
          <h2 className="mt-5 mb-3 text-center">All Withdraw History</h2>

          <table
            className="table align-middle  table-hover"
            style={{ backgroundColor: '#eee', marginBottom: '80px' }}
          >
            <thead className="bg-dark text-white ">
              <tr className="text-center">
                <th>#</th>
                <th>Date</th>
                <th>AMOUNT</th>
                <th>By</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.allWithdraws.map((item, index) => (
                <tr className="text-center" key={item._id}>
                  <td>{index}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.by}</td>
                  <td>{item.reason}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => updateTriger(item._id)}
                    >
                      <i
                        className="bi bi-pencil-fill"
                        style={{ color: 'green' }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Withdraw;
