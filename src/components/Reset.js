import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';

const Reset = () => {

    const [email, updateEmail] = useState('');
    const [emailSent, updateEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleReset = () => {
        const emailTest = /\S+@\S+/;
        if(emailTest.test(email)){
            firebase.auth().sendPasswordResetEmail(email).then(function() {
                console.log('email sent!');
                updateEmailSent(true);
              }).catch(function(error) {
                setErrorMessage(error.message);
              });
        }else{
            setErrorMessage("PLEASE ENTER A VALID EMAIL (EXAMPLE: SMOKEY@MAIL.COM)");
        }
    }

    if(emailSent){
        return (
            <div className='main-flex-container'>
                <p className='reset__paragraph'> We have sent you a confirmation email. If you don't receive it within the next 10 minutes, click the resend button. </p>
                <p className='reset__paragraph'> P.S. Don't forget to check your spam folder! </p>
                <button onClick={handleReset} className='reset__resend'>RESEND</button>
            </div>
        );
    }else{
        return (
            <div className='main-flex-container'>
        <Link className='form__home-button' to='/'> COLABI.CO </Link>
        <div className={errorMessage ? 'reset__form--error' : 'reset__form'}>
            {errorMessage && <div className='reset__form__erromessage'><p>{errorMessage}</p></div>}
            <input onChange={(e) => updateEmail(e.target.value)} className='reset__input' placeholder='Email'></input>
            <div className='reset__form__buttons'>
                <button onClick={handleReset} to='/reset' className='login__form__button '>CONTINUE</button>
            </div>
        </div>
        <Link to='/login' className='reset-form-login'>
            <p className=''>Already have an account? <span>Login</span>!</p>
        </Link>
    </div>
        );
    }
    
}

export default Reset;