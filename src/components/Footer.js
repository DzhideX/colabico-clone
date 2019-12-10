import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div className='footer'>
        <div className='footer__left'>
            <Link to='/privacy' className='footer__button'>PRIVACY</Link>
            <Link to='/terms' className='footer__button'>TERMS</Link>
        </div>
        <p className='footer__colabico'> © colabi.co</p>
    </div>
);

export default Footer;