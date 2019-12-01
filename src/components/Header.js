import React from 'react';

const Header = () => (
    <div className='header'>
        <button className='header__button' id='header__colabico'>COLABI.CO</button>
        <div className='header__right'>
            <button className='header__button' id='header__tweet'>TWEET</button>
            <button className='header__button' id='header__login'>LOGIN</button>
        </div>
    </div>
);

export default Header;