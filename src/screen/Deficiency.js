import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../component/Loader';
import MessageBox from '../component/InfoMessage';
import axios from 'axios';
import { dificiencyReducer, initialState } from '../reducers/dificiencyReducer';
import { Store } from '../context/Store';
function Deficiency() {
  const { state: ctxState } = useContext(Store);
  const [state, dispatch] = useReducer(dificiencyReducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    try {
      dispatch({ type: 'GET_D_REQUEST' });
      const { data } = await axios.get(`${ctxState.baseUrl}/deficiency`, {
        headers: {
          authorization: `Bearer ${ctxState.userInfo.token}`,
        },
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
        dispatch({ type: 'DELETE_D_REQUEST' });
        const { data } = await axios.delete(
          `${ctxState.baseUrl}/deficiency/${id}`,
          {
            headers: {
              authorization: `Bearer ${ctxState.userInfo.token}`,
            },
          }
        );

        dispatch({ type: 'DELETE_D_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'DELETE_D_FAIL', payload: error.response.data });
      }
    }
  };
  const updateHandler = async (id) => {
    navigate(`/updateDeficiency/${id}`);
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Needed Drugs</h2>
      {state.loading ? (
        <Loader />
      ) : state.error ? (
        <div className="row">
          <MessageBox color="red" message={state.message} />
        </div>
      ) : (
        <>
          <div className="mt-3 mb-3">
            <Link
              className="btn"
              to="/addDeficiency"
              style={{
                width: '180px',
                backgroundColor: '#009000',
                borderColor: '#009000',
                color: 'white',
              }}
            >
              ADD DEFICIENCY &nbsp;
              <i
                className="bi bi-plus-circle-dotted"
                style={{ color: 'white' }}
              ></i>
            </Link>
          </div>
          {state.deficiencis && (
            <table
              className="table align-middle table-hover"
              style={{ backgroundColor: '#eee', marginBottom: '80px' }}
            >
              <thead className="bg-dark text-white ">
                <tr className="text-center">
                  <th>#</th>
                  <th>NAME</th>
                  <th>COMPANY</th>
                  <th>NEEDED AMOUNT</th>
                  <th>Available on Store</th>
                  <th>CATEGORY</th>
                  <th>Urgent</th>
                  <th>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {state.deficiencis.map((item, index) => (
                  <tr className="text-center" key={item._id}>
                    <td>{index}</td>
                    <td>{item.name} </td>
                    <td>{item.company}</td>
                    <td>{item.neededAmount}</td>
                    <td>{item.availableOnStore}</td>
                    <td>{item.category}</td>
                    <td>
                      <i
                        className={
                          item.urgent ? 'bi bi-check-lg' : 'bi bi-x-lg'
                        }
                        style={{ color: item.urgent ? 'green' : 'red' }}
                      ></i>
                    </td>
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

export default Deficiency;
