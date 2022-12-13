import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { drugReducer, initialState } from '../reducers/drugReducer';
import { useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
function Drugs() {
  const [state, dispatch] = useReducer(drugReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDrugs();
  }, []);

  const fetchAllDrugs = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get('/drugs');
      data.map((item) => {
        item.expirationDate = item.expirationDate.toString().slice(0, 10);
        item.productionDate = item.productionDate.toString().slice(0, 10);
        return item;
      });
      dispatch({ type: 'GET_D_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_D_FAIL', payload: error.response.data });
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      'are you sure you want to delete this record?'
    );
    if (confirmDelete) {
      try {
        const { data } = await axios.delete(`/drugs/${id}`);
        dispatch({ type: 'DELETE_D_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'DELETE_D_FAIL', payload: error.response.data });
      }
    }
  };
  const updateHandler = (id) => {
    navigate(`/singleDrug/${id}`);
  };

  return (
    <div className="container mt-4">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <h2 className="text-center mb-4">Current Drugs</h2>
          {state.drugs && state.drugs.length > 0 && (
            <table
              className="table align-middle table-hover"
              style={{ backgroundColor: '#eee', marginBottom: '70px' }}
            >
              <thead className="bg-dark text-white ">
                <tr className="text-center">
                  <th>#</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT IN STOCK</th>
                  <th>PRODUCTION DATE</th>
                  <th>EXPIRATION DATE</th>
                  <th>COMPANY</th>
                  <th>CATEGORY</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {state.drugs.map((item, index) => (
                  <tr className="text-center" key={item._id}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.sellingPrice}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.productionDate}</td>
                    <td>{item.expirationDate}</td>
                    <td>{item.company}</td>
                    <td>{item.category}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        onClick={() => deleteHandler(item._id)}
                      >
                        <i
                          className="bi bi-trash-fill"
                          style={{ color: 'red' }}
                        ></i>
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => updateHandler(item._id)}
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
          )}
        </>
      )}
    </div>
  );
}

export default Drugs;
