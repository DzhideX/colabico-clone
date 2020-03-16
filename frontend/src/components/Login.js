import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { connect } from 'react-redux';

const Login = ({ dispatch }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email.')
      .required('Email is required.'),
    password: yup
      .string()
      .min(6, 'Password must contain minimum of 6 characters.')
      .required('Password is required.'),
  });

  const [redirect, updateRedirect] = useState();
  const { register, errors, handleSubmit } = useForm({ validationSchema });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage(
      errors.email
        ? errors.email.message
        : errors.password
        ? errors.password.message
        : '',
    );
  }, [errors]);

  const onSubmit = ({ email, password }) => {
    if (email && password) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              updateRedirect('/');
              dispatch({ type: 'REQUEST_USER_ID' });
            })
            .catch(function(error) {
              setErrorMessage(error.message);
            });
        })
        .catch(function(error) {
          setErrorMessage(error.message);
        });
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="main-flex-container">
        <Link className="form__home-button" to="/">
          {' '}
          COLABI.CO{' '}
        </Link>
        <div className={errorMessage ? 'login__form--error' : 'login__form'}>
          {errorMessage && (
            <div className="login__form__erromessage">
              {' '}
              <p>{errorMessage}</p>{' '}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="email"
              ref={register}
              className="login__input"
              placeholder="Email"
            ></input>
            <input
              name="password"
              ref={register}
              className="login__input"
              placeholder="Password"
              type="password"
            ></input>
            <div className="login__form__buttons">
              <button type="input" className="login__form__button">
                LOGIN
              </button>
              <Link
                to="/reset"
                className="login__form__button login__form__resetbutton"
              >
                FORGOT?
              </Link>
            </div>
          </form>
        </div>
        <Link to="/signup" className="login-form-signup">
          <p className="">
            Don't have an account? <span>Sign up</span>!
          </p>
        </Link>
      </div>
    );
  }
};

export default connect()(Login);
