import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase, db } from '../firebase/firebase';

const Header = ({ userId, dispatch }) => {
  const [userState, setUserState] = useState('');
  const [userAnonymous, updateUserAnonymous] = useState();

  useEffect(() => {
    if (userId) {
      setUserState('logout');
    } else {
      setUserState('login');
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (user.isAnonymous) {
          updateUserAnonymous(user);
        }
      } else {
      }
    });
  }, [userId]);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        db.collection(`users`)
          .doc(userId)
          .delete();
        window.location.href = '/';
        dispatch({ type: 'REQUEST_USER_ID' });
        if (userAnonymous) {
          userAnonymous.delete().catch(err => {
            console.log(err);
          });
        }
      })
      .catch(function(error) {});
  };

  const handleTwitter = () => {
    window.open(
      'https://twitter.com/intent/tweet?text=Checkout%20https://colabi.co',
      '_tab',
    );
  };

  return (
    <div className="header">
      <Link to="/" className="header__button" id="header__colabico">
        COLABI.CO
      </Link>
      <div className="header__right">
        <button
          onClick={handleTwitter}
          className="header__button"
          id="header__tweet"
        >
          TWEET
        </button>
        {userState === 'login' ? (
          <Link to="/login" className="header__button" id="header__login">
            LOGIN
          </Link>
        ) : (
          <button
            onClick={handleLogOut}
            className="header__button"
            id="header__logout"
          >
            LOGOUT
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.reducer.userId,
});

export default connect(mapStateToProps)(Header);
