import React, { useEffect, useReducer, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { initialState, singleSellReducer } from '../reducers/singeSellReducer';
import InfoMessage from '../component/InfoMessage';
import Loader from '../component/Loader';
import {} from 'react-router-dom';
import MessageBox from '../component/MessageBox';
import axios from 'axios';
function SingleSell() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(singleSellReducer, initialState);
  const [drug, setDrug] = useState({
    amount: 1,
    discount: '',
    total: '',
    date: '',
    methodOfPay: '',
  });

  useEffect(() => {
    fetchDrug();
  }, []);
  const fetchDrug = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get(`/drugs/${id}`);
      dispatch({ type: 'GET_D_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_D_FAIL', payload: error.response.data });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!drug.amount) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'please provide the selling amount',
      });
    }
    if (!drug.discount) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'please provide the selling discount',
      });
    }
    if (!drug.date) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'please provide the selling date',
      });
    }
    if (!drug.methodOfPay) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'please provide the selling method of Pay',
      });
    }
    const sellDrug = {
      name: state.drug.name,
      category: state.drug.category,
      sellingPrice: parseInt(drug.total / drug.amount),
      total: drug.total,
      amount: drug.amount,
      date: drug.date,
      methodOfPay: drug.methodOfPay,
      drugId: state.drug._id,
    };
    try {
      dispatch({ type: 'SEND_D_REQUEST' });
      await axios.post('/accounts', sellDrug);
      dispatch({ type: 'SEND_D_SUCCESS' });
      navigate('/sellDrugPage');
    } catch (error) {
      dispatch({ type: 'SEND_D_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  return state.loading ? (
    <Loader />
  ) : (
    <div className="container mb-2 mt-3  ">
      <div className="xp">
        <Link
          to="/sellDrugPage"
          className="btn btn-primary "
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
      <h2 className="text-center mb-4">ADD SELLING </h2>
      <>
        {state.errorForm && (
          <div className="row">
            <MessageBox
              showMessage={showMessage}
              message={state.message}
              color="danger"
            />
          </div>
        )}
      </>
      {state.error ? (
        <div className="text-center">
          <InfoMessage message={state.message} color="red" />
        </div>
      ) : (
        <form className="inp">
          {state.drug && (
            <>
              {' '}
              <div className="row  mb-3">
                <div
                  className="form-group col-md-3"
                  style={{ marginLeft: '150px' }}
                >
                  <label htmlFor="inputEmail4">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Name"
                    value={state.drug.name}
                    disabled
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="form-group col-md-3 ">
                  <label htmlFor="inputPassword4">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Category"
                    value={state.drug.category}
                    disabled
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div
                  className="form-group col-md-3"
                  style={{ marginLeft: '150px' }}
                >
                  <label htmlFor="inputEmail4">Selling Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Selling Price"
                    value={state.drug.sellingPrice}
                    disabled
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="form-group col-md-3 ">
                  <label htmlFor="inputPassword4">Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Amount"
                    value={drug.amount}
                    onChange={(e) =>
                      setDrug({
                        ...drug,
                        amount: e.target.value,
                        total:
                          state.drug.sellingPrice * e.target.value -
                          drug.discount,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div
                  className="form-group col-md-3"
                  style={{ marginLeft: '150px' }}
                >
                  <label htmlFor="inputEmail4">Discount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="Discount"
                    value={drug.discount}
                    onChange={(e) =>
                      setDrug({
                        ...drug,
                        discount: e.target.value,
                        total:
                          state.drug.sellingPrice * drug.amount -
                          e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="form-group col-md-3 ">
                  <label htmlFor="inputPassword4">Total</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Total"
                    value={drug.total ? drug.total : state.drug.sellingPrice}
                    disabled
                  />
                </div>
              </div>
              <div className="row  mb-3">
                <div
                  className="form-group col-md-3"
                  style={{ marginLeft: '150px' }}
                >
                  <label htmlFor="inputEmail4">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputEmail4"
                    value={drug.date}
                    onChange={(e) => setDrug({ ...drug, date: e.target.value })}
                  />
                </div>
                <div className="col-md-2"></div>
                <div className="form-group col-md-3 ">
                  <label htmlFor="inputPassword4">Method Of Pay</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setDrug({ ...drug, methodOfPay: e.target.value })
                    }
                  >
                    <option value="cash">cash</option>
                    <option value="card">card</option>
                  </select>
                </div>
              </div>
              <div
                className="row  mb-3 mt-4 text-center align-items-center justify-content-center"
                style={{ marginLeft: '-90px' }}
              >
                <button
                  type="submit"
                  onClick={submitHandler}
                  className="btn btn-primary"
                  style={{
                    width: '225px',
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    marginBottom: '70px',
                  }}
                >
                  ADD SELL
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </div>
  );
}

export default SingleSell;
