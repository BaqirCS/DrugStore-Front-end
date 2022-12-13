import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { sellPageReducer, initialState } from '../reducers/sellPageReducer';
import MessageBox from '../component/MessageBox';
function SellPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [list, setList] = useState({});
  const [state, dispatch] = useReducer(sellPageReducer, initialState);
  useEffect(() => {
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
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
  const searchhandler = () => {
    const x = state.drugs.filter((item) => {
      if (item.name.includes(search)) {
        return item;
      }
    });
    if (x.length > 0) {
      setList(x);
    } else {
      dispatch({
        type: 'GET_S_FAIL',
        payload: `${search} is not found, please seach another drug`,
      });
      setList([]);
    }
  };
  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };
  const clickHandler = (id) => {
    navigate(`/singleSellDrug/${id}`);
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-5  ">Daily Selling</h2>
      <ul className=" d-flex mb-4 mt-4 ">
        <li className=" me-5 listItem">
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="Drug Name"
            style={{ minWidth: '100px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </li>
        <li className=" me-5 listItem">
          <button
            className=" btn "
            style={{
              backgroundColor: '#009000',
              color: 'white',
              borderColor: '#009000',
            }}
            onClick={searchhandler}
            href="#"
          >
            SEARCH
          </button>
        </li>
      </ul>
      {state.error ? (
        <div className="row mt-5">
          <MessageBox
            showMessage={showMessage}
            color="danger"
            message={state.message}
          />
        </div>
      ) : (
        <table
          className="table align-middle table-hover  mt-5"
          style={{ backgroundColor: '#eee', marginBottom: '90px' }}
        >
          <thead className="bg-dark text-white ">
            <tr className="text-center">
              <th>#</th>
              <th>Name</th>
              <th>price </th>
              <th>Count in Stock</th>
              <th>Company</th>
              <th>Product Date</th>
              <th>Expiration Date</th>
              <th>Category</th>
            </tr>
          </thead>
          {list && list.length > 0 && (
            <tbody>
              {list.map((item, index) => (
                <tr
                  className="text-center"
                  key={item._id}
                  onClick={() => clickHandler(item._id)}
                >
                  <td>{index}</td>
                  <td>{item.name}</td>
                  <td>{item.sellingPrice}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.company}</td>
                  <td>{item.productionDate}</td>
                  <td>{item.expirationDate}</td>

                  <td>{item.category}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}

export default SellPage;
