import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  database  from '../firebase/firebase';
import { Trash2 } from 'react-feather';


const ListBox = ({listName, lastTodo, numberOfTodos,className,listKey}) => {

    const [trashIconColor, setTrashIconColor] = useState('white');
    const [redirect, updateRedirect] = useState();


    if(redirect){
        return <Redirect to={redirect} />
    }else{
        return(
            <div className={className}>
               <button className='home__listbox__data' onClick={() => updateRedirect(`/l/${listKey}`)}>
                    {listName !== '0' && listName && <p className='home__listbox__data__listname'>{listName}</p>}
                    {lastTodo && <p className='home__listbox__data__lasttodo'> {lastTodo} </p>}
                    {numberOfTodos && <p className='home__listbox__data__numbertodos'>({numberOfTodos})</p>}
               </button>
               <Trash2 onMouseOver={()=> setTrashIconColor('black')} onMouseLeave={()=> setTrashIconColor('white')} size={13} className='home__lisbox__trash' color={trashIconColor}/>
            </div>
        );
    }
    
}



const Home = ({userId}) => {

    const [lastTodos, updateLastTodos] = useState([]);

    useEffect(() => {
        if(userId){
            database.ref(`users/${userId}`).once('value').then(snapshot => {
                Object.keys(snapshot.val()).map((key,i) => {
                    const todoObject = snapshot.val()[key].todos;
                    Object.keys(todoObject).map((newKey,newI) => {
                        if(Object.keys(todoObject).length === newI+1){
                            updateLastTodos(prevState => [...prevState, todoObject[newKey].value]);
                        }
                    });
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
            {(listNames && lastTodos) ? Object.keys(listNames).map((key,i) => <ListBox lastTodo={lastTodos[i]} numberOfTodos={Object.keys(listNames[key].todos).length} listName={listNames[key].name} userId={userId} key={i} listKey={key} className={setListBoxClass(i)}/>) : <p className='home__infotext'> Start by pressing that big button up there! </p>}
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos,
    listNameRedux: state.listName
});

export default connect(mapStateToProps)(Home);