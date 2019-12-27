import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => (
    <div className='main-flex-container'>
        <Link className='form__home-button' to='/'> COLABI.CO </Link>
        <div className='signup__form'>
            <input className='signup__input' placeholder='Username'></input>
            <input className='signup__input' placeholder='Email'></input>
            <input className='signup__input' placeholder='Password'></input>
            <input className='signup__input' placeholder='Repeat Password'></input>
            <div className='signup__form__buttons'>
                <button className='signup__form__button'>SIGN UP</button>
            </div>
        </div>
        <Link to='/login' className='signup-form-login'>
            <p className=''>Already have an account? <Link to='/login'>Login</Link>!</p>
        </Link>
        <p className='signup__form__terms'>By signing up, you agree to our <a href='/terms'>Terms of Use</a> and <a href='/privacy'>Privacy Policy</a>.</p>
    </div>
);

export default Signup;