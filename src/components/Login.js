import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
    <div className='main-flex-container'>
        <Link className='login__home-button' to='/'> COLABI.CO </Link>
        <div className='login__form'>
            <input className='login__input' placeholder='Username Or Email'></input>
            <input className='login__input' placeholder='Password'></input>
            <div className='login__form__buttons'>
                <button className='login__form__button'>LOGIN</button>
                <button className='login__form__button'>FORGOT?</button>
            </div>
        </div>
        <div className='login-form-signup'>
            <p className=''>Don't have an account? <a href='#0'>Sign up</a>!</p>
        </div>
    </div>
);

export default Login;