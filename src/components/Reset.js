import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

const Reset = () => {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email.')
      .required('Email is required.'),
  });

  const { register, errors, handleSubmit } = useForm({ validationSchema });
  const [emailSent, updateEmailSent] = useState(false);
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

  const handleReset = ({ email }) => {
    if (email) {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
          console.log('email sent!');
          updateEmailSent(email);
        })
        .catch(function(error) {
          setErrorMessage(error.message);
        });
    }
    if (emailSent) {
      firebase
        .auth()
        .sendPasswordResetEmail(emailSent)
        .then(function() {})
        .catch(function(error) {
          setErrorMessage(error.message);
        });
    }
  };

  if (emailSent) {
    return (
      <div className="main-flex-container">
        <p className="reset__paragraph">
          {' '}
          We have sent you a confirmation email. If you don't receive it within
          the next 10 minutes, click the resend button.{' '}
        </p>
        <p className="reset__paragraph">
          {' '}
          P.S. Don't forget to check your spam folder!{' '}
        </p>
        <button onClick={handleReset} className="reset__resend">
          RESEND
        </button>
      </div>
    );
  } else {
    return (
      <div className="main-flex-container">
        <Link className="form__home-button" to="/">
          {' '}
          COLABI.CO{' '}
        </Link>
        <div className={errorMessage ? 'reset__form--error' : 'reset__form'}>
          {errorMessage && (
            <div className="reset__form__erromessage">
              <p>{errorMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(handleReset)}>
            <input
              name="email"
              ref={register}
              className="reset__input"
              placeholder="Email"
            ></input>
            <div className="reset__form__buttons">
              <button
                type="submit"
                onClick={handleReset}
                to="/reset"
                className="login__form__button "
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
        <Link to="/login" className="reset-form-login">
          <p className="">
            Already have an account? <span>Login</span>!
          </p>
        </Link>
      </div>
    );
  }
};

export default Reset;
