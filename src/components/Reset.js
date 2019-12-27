import React from 'react';
import { Link } from 'react-router-dom';

const Reset = () => (
    <div className='main-flex-container'>
        <Link className='form__home-button' to='/'> COLABI.CO </Link>
        <div className='reset__form'>
            <input className='reset__input' placeholder='Username Or Email'></input>
            <div className='reset__form__buttons'>
                <button to='/reset' className='login__form__button '>CONTINUE</button>
            </div>
        </div>
        <Link to='/login' className='reset-form-login'>
            <p className=''>Already have an account? <Link to='/login'>Login</Link>!</p>
        </Link>
    </div>
);

export default Reset;