import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <div className='header'>
        <Link to='/' className='header__button' id='header__colabico'>COLABI.CO</Link>
        <div className='header__right'>
            <button className='header__button' id='header__tweet'>TWEET</button>
            <Link to='/login' className='header__button' id='header__login'>LOGIN</Link>
        </div>
    </div>
);

export default Header;