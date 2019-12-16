import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div className='home'>
        <Link to='/l/new' className='home__button'> NEW LIST </Link>
        <p className='home__infotext'> Start by pressing that big button up there! </p>
    </div>
);

export default Home;