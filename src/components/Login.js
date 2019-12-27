import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => (
    <div className='main-flex-container'>
        <Link className='form__home-button' to='/'> COLABI.CO </Link>
        <div className='login__form'>
            <input className='login__input' placeholder='Username Or Email'></input>
            <input className='login__input' placeholder='Password'></input>
            <div className='login__form__buttons'>
                <button className='login__form__button'>LOGIN</button>
                <Link to='/reset' className='login__form__button login__form__resetbutton'>FORGOT?</Link>
            </div>
        </div>
        <Link to='/signup' className='login-form-signup'>
            <p className=''>Don't have an account? <Link to='/signup'>Sign up</Link>!</p>
        </Link>
    </div>
);

export default Login;