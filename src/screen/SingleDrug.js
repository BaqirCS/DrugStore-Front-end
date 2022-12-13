import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import axios from 'axios';
import { addDrugReducer, initialState } from '../reducers/addDrugReducer';
import MessageBox from '../component/MessageBox';
function SingleDrug() {
  const [state, dispatch] = useReducer(addDrugReducer, initialState);
  const [drug, setDrug] = useState({
    name: '',
    category: '',
    basePrice: '',
    sellingPrice: '',
    countInStock: '',
    company: '',
    productionDate: '',
    expirationDate: '',
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!drug.name) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'name of drug is required',
      });
    }
    if (!drug.category) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'category of drug is required',
      });
    }
    if (!drug.basePrice) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'purchace price of drug is required',
      });
    }
    if (!drug.company) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'company of drug is required',
      });
    }
    if (!drug.productionDate) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'production date of drug is required',
      });
    }
    if (!drug.expirationDate) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'expiration date of drug is required',
      });
    }
    if (!drug.sellingPrice) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'selling price of drug is required',
      });
    }
    if (!drug.countInStock) {
      return dispatch({
        type: 'ADD_D_FAIL',
        payload: 'Number of drug in stock is required',
      });
    }
    try {
      dispatch({ type: 'ADD_D_REQUEST' });
      await axios.post('/drugs', drug);
      dispatch({ type: 'ADD_D_SUCCESS' });
      clearAllFields();
    } catch (error) {
      dispatch({ type: 'ADD_D_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const clearAllFields = () => {
    setDrug({
      name: '',
      category: '',
      basePrice: '',
      sellingPrice: '',
      countInStock: '',
      company: '',
      productionDate: '',
      expirationDate: '',
    });
  };
  return (
    <div className="container mb-2 mt-3 ">
      <div className="xp">
        <Link
          to={'/drugs'}
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
      <h2 className="text-center mb-4">ADD DRUG</h2>
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
      {state.loading ? (
        <Loader />
      ) : (
        <form className="inp">
          <div className="row  mb-3">
            <div
              className="form-group col-md-3 col-sm-12"
              style={{ marginLeft: '150px' }}
            >
              <label htmlFor="inputEmail4">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Name"
                value={drug.name}
                onChange={(e) => setDrug({ ...drug, name: e.target.value })}
              />
            </div>

            <div className="col-md-2"></div>
            <div className="form-group col-md-3 col-sm-6 ">
              <label htmlFor="inputPassword4">Category</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Category"
                value={drug.category}
                onChange={(e) => setDrug({ ...drug, category: e.target.value })}
              />
            </div>
          </div>
          <div className="row  mb-3">
            <div
              className="form-group col-md-3"
              style={{ marginLeft: '150px' }}
            >
              <label htmlFor="inputEmail4">Purchace Price</label>
              <input
                type="number"
                className="form-control"
                id="inputEmail4"
                placeholder="Purchace Price"
                value={drug.basePrice}
                onChange={(e) =>
                  setDrug({ ...drug, basePrice: e.target.value })
                }
              />
            </div>
            <div className="col-md-2"></div>
            <div className="form-group col-md-3 ">
              <label htmlFor="inputPassword4">Selling Price</label>
              <input
                type="number"
                className="form-control"
                id="inputPassword4"
                placeholder="Selling Price"
                value={drug.sellingPrice}
                onChange={(e) =>
                  setDrug({ ...drug, sellingPrice: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row  mb-3">
            <div
              className="form-group col-md-3"
              style={{ marginLeft: '150px' }}
            >
              <label htmlFor="inputEmail4">Count in Stock</label>
              <input
                type="number"
                className="form-control"
                id="inputEmail4"
                placeholder="Count in Stock"
                value={drug.countInStock}
                onChange={(e) =>
                  setDrug({ ...drug, countInStock: e.target.value })
                }
              />
            </div>
            <div className="col-md-2"></div>
            <div className="form-group col-md-3 ">
              <label htmlFor="inputPassword4">Company</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Company"
                value={drug.company}
                onChange={(e) => setDrug({ ...drug, company: e.target.value })}
              />
            </div>
          </div>
          <div className="row mb-3 ">
            <div
              className="form-group col-md-3"
              style={{ marginLeft: '150px' }}
            >
              <label htmlFor="inputEmail4">Production Date</label>
              <input
                type="date"
                className="form-control"
                id="inputEmail4"
                placeholder="Production Date"
                value={drug.productionDate}
                onChange={(e) =>
                  setDrug({ ...drug, productionDate: e.target.value })
                }
              />
            </div>
            <div className="col-md-2"></div>
            <div className="form-group col-md-3 ">
              <label htmlFor="inputPassword4">Expiration Date</label>
              <input
                type="date"
                className="form-control"
                id="inputPassword4"
                placeholder="Expiration Date"
                value={drug.expirationDate}
                onChange={(e) =>
                  setDrug({ ...drug, expirationDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row ">
            <div className="form-group col-md-3 m-auto ">
              <button
                type="submit"
                onClick={submitHandler}
                className="btn btn-primary xpc"
                style={{
                  width: '225px',
                  backgroundColor: '#009000',
                  borderColor: '#009000',
                  marginBottom: '80px',
                }}
              >
                ADD DRUG
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default SingleDrug;
