import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  database  from '../firebase/firebase';

const ListBox = ({listName, lastTodo, numberOfTodos,className}) => {


    return(
        <div className={className}>
           
        </div>
    );
}



const Home = ({userId}) => {

    useEffect(() => {
        if(userId){
            console.log(userId);
            database.ref(`users/${userId}`).once('value').then(snapshot => {
                Object.keys(snapshot.val()).map((key,i) => {
                    console.log(`This key: ${key} is number ${i}`);
                })
                
                updateListNames(snapshot.val());
            })
        }
    },[userId]);

    const setListBoxClass = (key) => {
        if(key === 0){
            return "home__listbox--top";
        }else if(key+1 === Object.keys(listNames).length){
            return "home__listbox--bottom"
        }else{
            return "home__listbox"
        }
    }

    const [listNames, updateListNames ] = useState();

    return (
        <div className='main-flex-container'>
            <Link to='/l/new' className='home__button'> NEW LIST </Link>
            {listNames ? Object.keys(listNames).map((key,i) => <ListBox className={setListBoxClass(i)}/>) : <p className='home__infotext'> Start by pressing that big button up there! </p>}
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos,
    listNameRedux: state.listName
});

export default connect(mapStateToProps)(Home);