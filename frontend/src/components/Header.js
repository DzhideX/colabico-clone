import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ userId, dispatch }) => {
  const [userState, setUserState] = useState('');

  useEffect(() => {
    if (userId) {
      setUserState('logout');
    } else {
      setUserState('login');
    }
  }, [userId]);

  const handleLogOut = () => {
    dispatch({ type: 'REQUEST_LOGOUT' });
    window.location.href = '/';
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
