import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {firebase} from '../firebase/firebase';

const Login = () => {

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const handleLogin = () => {
        console.log(email,password);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
    }

    return (
        <div className='main-flex-container'>
            <Link className='form__home-button' to='/'> COLABI.CO </Link>
            <div className='login__form'>
                <input onChange={(e)=>updateEmail(e.target.value)} className='login__input' placeholder='Username Or Email'></input>
                <input onChange={(e)=>updatePassword(e.target.value)} className='login__input' placeholder='Password' type='password'></input>
                <div className='login__form__buttons'>
                    <button onClick={handleLogin} className='login__form__button'>LOGIN</button>
                    <Link to='/reset' className='login__form__button login__form__resetbutton'>FORGOT?</Link>
                </div>
            </div>
            <Link to='/signup' className='login-form-signup'>
            <p className=''>Don't have an account? <span>Sign up</span>!</p>
            </Link>
        </div>);
}

export default Login;