import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
import {
  initialState,
  updateDeficiencyReducer,
} from '../reducers/updateDeficiency';
function UpdateDeficiency() {
  const [state, dispatch] = useReducer(updateDeficiencyReducer, initialState);
  const { id } = useParams();
  const [def, setDef] = useState({
    name: '',
    company: '',
    neededAmount: '',
    category: '',
    availableOnStore: '',
    urgent: true,
    _id: '',
  });
  useEffect(() => {
    fetchDeficiency();
  }, []);
  const fetchDeficiency = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get(`/deficiency/${id}`);
      dispatch({ type: 'GET_D_SUCCESS' });
      setDef(data);
    } catch (error) {
      dispatch({ type: 'GET_D_FAIL', payload: error.response.data });
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!def.name) {
      return dispatch({
        type: 'UPDATE_D_FAIL',
        payload: 'Name of drug is required ',
      });
    }
    if (!def.company) {
      return dispatch({
        type: 'UPDATE_D_FAIL',
        payload: 'Company of drug is required ',
      });
    }
    if (!def.neededAmount) {
      return dispatch({
        type: 'UPDATE_D_FAIL',
        payload: 'needed amout of drug is required ',
      });
    }
    if (!def.availableOnStore) {
      return dispatch({
        type: 'UPDATE_D_FAIL',
        payload: 'available number of drug on store is required ',
      });
    }
    if (!def.category) {
      return dispatch({
        type: 'UPDATE_D_FAIL',
        payload: 'category of drug is required',
      });
    }

    try {
      dispatch({ type: 'UPDATE_D_REQUEST' });
      const { data } = await axios.patch(`/deficiency/${def._id}`, def);
      dispatch({ type: 'UPDATE_D_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'UPDATE_D_FAIL', payload: error.response.data });
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
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
      <h2 className="text-center mb-4 mt-2">Update Deficiency </h2>
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
        <div className="row  mb-3">
          <div className="form-group col-md-3" style={{ marginLeft: '150px' }}>
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
          <div className="form-group col-md-3 ">
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
        <div className="row  mb-3">
          <div className="form-group col-md-3" style={{ marginLeft: '150px' }}>
            <div className="xp">
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
          <div className="form-group col-md-3 xpr " style={{ marginLeft: '' }}>
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
          <div className="form-group col-md-3 mt-4 text-center">
            <button
              onClick={submitHandler}
              type="submit"
              className="btn btn-primary xpc"
              style={{
                width: '225px',
                backgroundColor: '#009000',
                borderColor: '#009000',
                marginLeft: '500px',
              }}
            >
              UPDATE ITEM
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateDeficiency;
