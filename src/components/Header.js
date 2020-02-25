import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { firebase } from '../firebase/firebase';

const Header = ({userId,setUserId}) => {

    const [userState, setUserState] = useState('');
    const [userAnonymous, updateUserAnonymous] = useState();

    useEffect(() => {
        if(userId){
            setUserState('logout');
        }else{
            setUserState('login');
        }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                if(user.isAnonymous){
                    updateUserAnonymous(user);
                }
            } else {
              // No user is signed in.
            }
          });
    },[userId]);

    const handleLogOut = () => {
        firebase.auth().signOut().then(function() {
            setUserId('');
            window.location.href='/';
            if(userAnonymous){
                userAnonymous.delete().then(() => {}).catch(err => {
                    console.log(err);
                });
            }
          }).catch(function(error) {
            // An error happened.
          });
    }

    const handleTwitter = () => {
        // window.location.href='https://twitter.com/intent/tweet?text=Checkout%20https://colabi.co';
        window.open(
            'https://twitter.com/intent/tweet?text=Checkout%20https://colabi.co',
            '_tab' 
          );
          window.open()
    }

    return(
        <div className='header'>
            <Link to='/' className='header__button' id='header__colabico'>COLABI.CO</Link>
            <div className='header__right'>
                <button onClick={handleTwitter} className='header__button' id='header__tweet'>TWEET</button>
                {userState === 'login' ? 
                <Link to='/login' className='header__button' id='header__login'>LOGIN</Link> : 
                <button onClick={handleLogOut} className='header__button' id='header__logout'>LOGOUT</button>}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.userId
});

const mapDispatchToProps = dispatch => {
    return {
      setUserId: (userId) => dispatch({ type: 'SET_USER_ID', payload: { userId } }),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Header);