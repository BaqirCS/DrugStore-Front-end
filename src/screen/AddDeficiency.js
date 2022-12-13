import axios from 'axios';
import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import {
  initialState,
  addDeficiencyReducer,
} from '../reducers/addDeficiencyReducer';
function AddDeficiency() {
  const [state, dispatch] = useReducer(addDeficiencyReducer, initialState);

  const [def, setDef] = useState({
    name: '',
    company: '',
    neededAmount: '',
    category: '',
    availableOnStore: '',
    urgent: true,
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!def.name) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'Name of drug is required ',
      });
    }
    if (!def.company) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'Company of drug is required ',
      });
    }
    if (!def.neededAmount) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'needed amout of drug is required ',
      });
    }
    if (!def.availableOnStore) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'available number of drug on store is required ',
      });
    }
    if (!def.category) {
      return dispatch({
        type: 'SEND_D_FAIL',
        payload: 'category of drug is required',
      });
    }

    try {
      dispatch({ type: 'SEND_D_REQUEST' });
      const { data } = await axios.post('/deficiency', def);
      dispatch({ type: 'SEND_D_SUCCESS', payload: data });
      clearAllField();
    } catch (error) {
      dispatch({ type: 'SEND_D_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const clearAllField = () => {
    setDef({
      name: '',
      company: '',
      neededAmount: '',
      category: '',
      availableOnStore: '',
      urgent: true,
    });
  };
  return (
    <div>
      <div className="xp">
        <Link
          className="btn btn-primary mt-3 "
          to="/deficiency"
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
      <h2 className="text-center mb-4 mt-2">Add New Deficiency </h2>
      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <div className="row">
          <MessageBox
            showMessage={showMessage}
            color="danger"
            message={state.message}
          />
        </div>
      ) : (
        state.success && (
          <div className="row">
            <MessageBox
              showMessage={showMessage}
              color="success"
              message={state.message}
            />
          </div>
        )
      )}

      <form>
        <div className="row">
          <div className="form-group col-md-3" style={{ marginLeft: '150px' }}>
            <div className="xp">
              <label htmlFor="inputEmail4">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Name"
                value={def.name}
                onChange={(e) => setDef({ ...def, name: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group col-md-3 xpr">
            <label htmlFor="inputPassword4">Company</label>
            <input
              type="text"
              className="form-control"
              id="inputPassword4"
              placeholder="Company"
              value={def.company}
              onChange={(e) => setDef({ ...def, company: e.target.value })}
            />
          </div>
          <div className="form-group col-md-3 xpr" style={{ marginLeft: '' }}>
            <label htmlFor="inputEmail4">Needed Amount</label>
            <input
              type="number"
              className="form-control"
              id="inputEmail4"
              placeholder="Needed Amount"
              value={def.neededAmount}
              onChange={(e) => setDef({ ...def, neededAmount: e.target.value })}
            />
          </div>
        </div>
        <div className="row  mb-3" style={{ marginTop: '10px' }}>
          <div className="form-group col-md-3" style={{ marginLeft: '150px' }}>
            <div className="xp">
              {' '}
              <label htmlFor="inputEmail4">Category</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Category"
                value={def.category}
                onChange={(e) => setDef({ ...def, category: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group col-md-3 xpr">
            <label htmlFor="inputPassword4">Available on Store</label>
            <input
              type="number"
              className="form-control"
              id="inputPassword4"
              placeholder="Available on Store"
              value={def.availableOnStore}
              onChange={(e) =>
                setDef({ ...def, availableOnStore: e.target.value })
              }
            />
          </div>

          <div className="form-group col-md-3 d-flex ">
            <div className="form-check ms-3 mt-4">
              <div>
                <label className="form-check-label" htmlFor="urgent">
                  Urgent
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="urgent"
                  defaultChecked
                  value={true}
                  onChange={(e) => setDef({ ...def, urgent: e.target.checked })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row  mb-3">
          <div
            className="form-group col-md-3 mt-4"
            style={{ marginLeft: '450px' }}
          >
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-primary mlxpl"
              style={{
                width: '225px',
                backgroundColor: '#009000',
                borderColor: '#009000',
              }}
            >
              ADD ITEM
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDeficiency;
