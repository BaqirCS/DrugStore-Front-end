import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import picture from '../image/download.png';
import MessageBox from '../component/MessageBox';
import { loginReducer, initialState } from '../reducers/loginReducer';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AppContext';
const Login = () => {
  const baseUrl = 'https://khademdrugstoreapi.onrender.com/api/users';
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { value, setValue } = useContext(UserContext);

  const showMessage = () => {
    dispatch({ type: 'RESET' });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user.email) {
      return dispatch({
        type: 'LOGIN_ERROR',
        payload: 'Email of user is required ',
      });
    }
    if (!user.password) {
      return dispatch({
        type: 'LOGIN_ERROR',
        payload: 'Password of user is required ',
      });
    }
    if (user.password.length < 6) {
      return dispatch({
        type: 'LOGIN_ERROR',
        payload: 'password should not be less than 6 characters',
      });
    }

    try {
      const { data } = await axios.post(`${baseUrl}/login`, user);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: 'You are successfully LogedIn',
      });
      localStorage.setItem('AuthUser', JSON.stringify(data.user));
      setValue(data);
      navigate('/drugs');
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.response.data });
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <h3 className="text-center fw-bold h1 mt-4">
                  Khadem Animal DrugStrore
                </h3>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p
                        className="text-center h2 fw-bold mb-3 mx-1 mx-md-4 mt-3"
                        style={{ color: '#003366' }}
                      >
                        LOG IN
                      </p>
                      {state.error && (
                        <div
                          style={{ marginLeft: '70px', marginBottom: '15px' }}
                        >
                          <MessageBox
                            showMessage={showMessage}
                            color="danger"
                            message={state.message}
                          />
                        </div>
                      )}

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-envelope-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              placeholder="Your Email"
                              value={user.email}
                              onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            ></label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-lock-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>{' '}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              placeholder="Password"
                              value={user.password}
                              onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            ></label>
                          </div>
                        </div>

                        <div className=" justify-content-center   text-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            onClick={submitHandler}
                            className="btn btn-primary"
                            style={{
                              backgroundColor: '#009000',
                              borderColor: '#009000',
                            }}
                          >
                            LOG IN
                          </button>
                          <p>
                            {' '}
                            Don't have an account?
                            <Link to="/register" style={{ color: 'red' }}>
                              Register
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-9 col-lg-5 col-xl-6 d-flex align-items-center order-1 order-lg-2 ms-5">
                      <img
                        src={picture}
                        className="img-fluid"
                        alt="Sample"
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
