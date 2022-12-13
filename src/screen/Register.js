import React, { useEffect, useReducer, useState } from 'react';
import MessageBox from '../component/MessageBox';
import picture from '../image/download.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { registerReducer, initialState } from '../reducers/registerReducer';

const baseUrl = 'http://localhost:5000/api';
const Register = () => {
  const [info, dispatch] = useReducer(registerReducer, initialState);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  useEffect(() => {
    if (info.success) {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [info, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user.name) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'Name of user is required ',
      });
    }
    if (!user.email) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'Email of user is required ',
      });
    }
    if (!isValidEmail(user.email)) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'please Enter a valid Email ',
      });
    }
    if (!user.password) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'Password of user is required ',
      });
    }
    if (!user.repeatPassword) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'Confirm password of user is required ',
      });
    }
    if (user.password !== user.repeatPassword) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'password and confirm password do not match',
      });
    }
    if (user.password.length < 6) {
      return dispatch({
        type: 'REGISTER_ERROR',
        payload: 'password should not be less than 6 characters',
      });
    }

    try {
      await axios.post(`${baseUrl}/users`, user);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: 'Your Account is successfully Created',
      });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.response.data });
    }
  };

  const showMessage = (type, payload) => {
    dispatch({ type: 'RESET' });
  };

  function isValidEmail(email) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  }

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
                    {info.error && (
                      <div className="row">
                        <MessageBox
                          showMessage={showMessage}
                          message={info.message}
                          color="danger"
                        />
                      </div>
                    )}
                    {info.success && (
                      <div className="row">
                        <MessageBox
                          showMessage={showMessage}
                          message={info.message}
                          color="success"
                        />
                      </div>
                    )}
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p
                        className="text-center h2 fw-bold mb-3 mx-1 mx-md-4"
                        style={{ color: '#003366' }}
                      >
                        SIGN UP
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-person-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Your Name"
                              value={user.name}
                              onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="name"
                            ></label>
                          </div>
                        </div>
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
                              id="email"
                              className="form-control"
                              placeholder="Your Email"
                              value={user.email}
                              onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="email"
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
                              id="password"
                              className="form-control"
                              placeholder="Password"
                              value={user.password}
                              onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="password"
                            ></label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i
                            className="bi bi-key-fill h3"
                            style={{
                              marginTop: '-30px',
                              marginRight: '10px',
                            }}
                          ></i>{' '}
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="repeatPassword"
                              className="form-control"
                              placeholder="Repeat Your Password"
                              value={user.repeatPassword}
                              onChange={(e) =>
                                setUser({
                                  ...user,
                                  repeatPassword: e.target.value,
                                })
                              }
                            />
                            <label
                              className="form-label"
                              htmlFor="repeatPassword"
                            ></label>
                          </div>
                        </div>

                        <div className=" justify-content-center   text-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                              backgroundColor: '#009000',
                              borderColor: '#009000',
                            }}
                            onClick={submitHandler}
                          >
                            REGISTER
                          </button>
                          <p>
                            {' '}
                            already have an account?
                            <Link
                              to="/login"
                              style={{ color: 'red', marginBottom: '70px' }}
                            >
                              Log in
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

export default Register;
