import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const Signup = () => {

    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [passwordRepeat, updatePasswordRepeat] = useState('');

    const handleSignUp = () => {
        const emailTest = /\S+@\S+/;
        if(username.length > 4 && emailTest.test(email) && password.length > 4 && password === passwordRepeat){
            alert('Successfully signed up!')
        }else{
            console.log('Hell naws, bruh!');
        }
    }

    return (
        <div className='main-flex-container'>
        <Link className='form__home-button' to='/'> COLABI.CO </Link>
        <div className='signup__form'>
            <input onChange={(e) => updateUsername(e.target.value)} className='signup__input' placeholder='Username'></input>
            <input onChange={(e) => updateEmail(e.target.value)} className='signup__input' placeholder='Email'></input>
            <input type='password' onChange={(e) => updatePassword(e.target.value)} className='signup__input' placeholder='Password'></input>
            <input type='password' onChange={(e) => updatePasswordRepeat(e.target.value)} className='signup__input' placeholder='Repeat Password'></input>
            <div className='signup__form__buttons'>
                <button onClick={handleSignUp} className='signup__form__button'>SIGN UP</button>
            </div>
        </div>
        <Link to='/login' className='signup-form-login'>
            <p className=''>Already have an account? <Link to='/login'>Login</Link>!</p>
        </Link>
        <p className='signup__form__terms'>By signing up, you agree to our <a href='/terms'>Terms of Use</a> and <a href='/privacy'>Privacy Policy</a>.</p>
    </div>
    );
}

export default Signup;