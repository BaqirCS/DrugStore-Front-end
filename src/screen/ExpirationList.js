import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import {
  expirationListReducer,
  initialState,
} from '../reducers/expirationListReducer';
import Loader from '../component/Loader';
import MessageBox from '../component/MessageBox';
function ExpirationList() {
  const [state, dispatch] = useReducer(expirationListReducer, initialState);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get('/drugs/exp');
      const x = new Date();
      const newList = data.filter((item) => {
        let expireDate = new Date(item.expirationDate);
        const mili = expireDate.getTime() - x.getTime();
        const day = parseInt(mili / (1000 * 60 * 60 * 24));
        if (day > 1 && day < 120) {
          item.expirationDate = item.expirationDate.toString().slice(0, 10);
          item.productionDate = item.productionDate.toString().slice(0, 10);
          item.daysLeft = day;
          return item;
        }
      });
      dispatch({ type: 'GET_D_SUCCESS', payload: newList });
    } catch (error) {
      dispatch({ type: 'GET_D_FAIL', payload: error.response.data });
    }
  };
  return (
    <div className="container mt-4">
      {state.loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <h2 className="text-center mb-4">Drugs with Fewer Expiration Data</h2>
          {state.error && (
            <div className="row">
              <MessageBox color="danger" message={state.message} />
            </div>
          )}
          {state.list && state.list.length > 0 && (
            <table
              className="table align-middle table-hover"
              style={{ backgroundColor: '#eee', marginBottom: '70px' }}
            >
              <thead className="bg-dark text-white ">
                <tr className="text-center">
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>Days Left</th>
                  <th>COUNT IN STOCK</th>
                  <th>PRODUCTION DATE</th>
                  <th>EXPIRATION DATE</th>
                  <th>COMPANY</th>
                  <th>CATEGORY</th>
                </tr>
              </thead>
              <tbody>
                {state.list.map((item) => (
                  <tr className="text-center" key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.sellingPrice}T</td>
                    <td>{item.daysLeft}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.productionDate}</td>
                    <td>{item.expirationDate}</td>
                    <td>{item.company}</td>
                    <td>{item.category}</td>
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

export default ExpirationList;
