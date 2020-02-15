import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  database  from '../firebase/firebase';


const Home = ({userId}) => {

    useEffect(() => {
        if(userId){
            console.log(userId);
            database.ref(`users/${userId}`).once('value').then(snapshot => {
                console.log(snapshot.val());
            })
        }
    },[userId]);

    const [listNames, updateListNames ] = useState();

    return (
        <div className='main-flex-container'>
            <Link to='/l/new' className='home__button'> NEW LIST </Link>
            <p className='home__infotext'> Start by pressing that big button up there! </p>
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos,
    listNameRedux: state.listName
});

export default connect(mapStateToProps)(Home);