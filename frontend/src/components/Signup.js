import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firebase, db } from '../firebase/firebase';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

const Signup = ({ dispatch }) => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email.')
      .required('Email is required.'),
    password: yup
      .string()
      .min(6, 'Password must contain minimum of 6 characters.')
      .required('Password is required.'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('password'), null], 'Passwords must match.'),
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
        : errors.confirmPassword
        ? errors.confirmPassword.message
        : '',
    );
  }, [errors]);

  const onSubmit = ({ email, password }) => {
    if (email && password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          // updateRedirect('/');
          dispatch(push('/'));
          dispatch({ type: 'REQUEST_USER_ID' });
          db.collection(`users`)
            .doc(res.user.uid)
            .set({ state: 'user' });
        })
        .catch(error => {
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
        <div className={errorMessage ? 'signup__form--error' : 'signup__form'}>
          {errorMessage && (
            <div className="signup__form__erromessage">
              {' '}
              <p>{errorMessage}</p>{' '}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="email"
              className="signup__input"
              placeholder="Email"
              ref={register({ required: true })}
            ></input>
            <input
              name="password"
              type="password"
              className="signup__input"
              placeholder="Password"
              ref={register}
            ></input>
            <input
              name="confirmPassword"
              type="password"
              className="signup__input"
              placeholder="Repeat Password"
              ref={register}
            ></input>
            <div className="signup__form__buttons">
              <button type="submit" className="signup__form__button">
                SIGN UP
              </button>
            </div>
          </form>
        </div>
        <Link to="/login" className="signup-form-login">
          <p className="">
            Already have an account? <span>Login</span>!
          </p>
        </Link>
        <p className="signup__form__terms">
          By signing up, you agree to our <a href="/terms">Terms of Use</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    );
  }
};

export default connect()(Signup);
