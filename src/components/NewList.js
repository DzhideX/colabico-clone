import React, { useState, useRef, useEffect } from 'react';
import edit from '../pictures/edit.png';
import database, {firebase, db} from '../firebase/firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


const NewList = ({userId, todos, dispatch}) => {

    useEffect(() => {
        if(userId){ 
            console.log('/l/new');
        }else if(userId === ''){
        }
    },[userId]);  

    useEffect(() => {
        if(todos){
        }else{
            console.log('no-todos');
        }
    },[todos])

    const [redirect, updateRedirect] = useState();

    const [listName, setListName ] = useState('');
    const [listNameState, setListNameState] = useState('button');
    const textInput =  useRef();

    const [currentTodo, updateCurrentTodo] = useState('');
    // const [todoObject, updateTodoObject] = useState({});
    const [filters, updateFilters] = useState({
       done: true,
       working: true,
       pending: true 
    });

    const changeToInput = () => {
        setListNameState('input');
        setTimeout(() => {
            textInput.current.focus();
        },0);
    }

    const onInputFocus = (e) =>{
        if(listName === ''){
            e.target.placeholder = 'NAMELESS';
        }else{
            e.target.placeholder = listName;
        }
    }

    const onInputChange = (e) => {
        setListName((e.target.value).toUpperCase());
        if(e.target.value === ''){
            e.target.placeholder = 'NAMELESS';
        }
    }

    const handleInputKeyPress = (e) => {
        e.persist();
        if(e.key === 'Enter'){
            if(userId){
                // database.ref(`users/${userId}`).push({'name':'0'}).then(res => {
                //     database.ref(`users/${userId}/${res.getKey()}/todos`).push({'value':e.target.value, state: 'pending'});
                //     updateRedirect(`/l/${res.getKey()}`);
                // });
                db.collection(`users/${userId}/lists`).add({name: '0'}).then(docRef => {
                    db.collection(`users/${userId}/lists/${docRef.id}/todos`).add({'value':e.target.value, state: 'pending'});
                    updateRedirect(`/l/${docRef.id}`);
                });
            }else{
                firebase.auth().signInAnonymously().then(() => {
                    updateRedirect('/')
                }).catch(function(error) {
                    var errorCode = error.code;
                    console.log(errorCode);
                });
            }
        }
    }
    
    if(redirect){
        return <Redirect to={{
            pathname: redirect,
            state: redirect === '/' ? 'first-time' : null
        }}/>
    }else{
    return(
            <div className='newlist'>
            {listNameState === 'button' && (
                <button 
                onClick={changeToInput}
                className='newlist__placeholder'>
                    <div className='newlist__placeholder__area'>
                        <p className={listName === '' ? 'newlist__placeholder__area__name' : 'newlist__placeholder__area__name--value'}> {listName === '' ? '(NAME THIS LIST)' : listName}</p>
                        <img className='newlist__placeholder__area__icon' src={edit} alt='edit icon'></img>
                    </div>
                </button>
            )}
            {listNameState === 'input' && 
            <input 
                onBlur={(e) => {
                    setListNameState('button');
                    if(userId){
                        // database.ref(`users/${userId}`).push({'name':listName}).then(res => {
                        //     updateRedirect(`/l/${res.getKey()}`);
                        // });
                        if(listName === ''){
                            db.collection(`users/${userId}/lists`).add({name: '0'}).then(docRef => {
                                updateRedirect(`/l/${docRef.id}`);
                            });
                        }else{
                            db.collection(`users/${userId}/lists`).add({name: listName}).then(docRef => {
                                updateRedirect(`/l/${docRef.id}`);
                            });
                        }
                    }else{
                        firebase.auth().signInAnonymously().then(() => {
                            updateRedirect('/')
                        }).catch(function(error) {
                            var errorCode = error.code;
                            console.log(errorCode);
                        });
                    }
                }} 
                onFocus={onInputFocus} 
                placeholder='(NAME THIS LIST)' 
                className='newlist__input'
                value={listName}
                onChange={onInputChange}
                ref={textInput}>
            </input>}
            <input 
            type='text' 
            className='newlist__taskinput' 
            placeholder='Add a new task...'
            value={currentTodo}
            onChange={(e) => updateCurrentTodo(e.target.value)}
            onKeyPress={handleInputKeyPress}
            ></input>
            <div className='newlist__filterarea'>
                <p>Show:</p>
                <button onClick={(e) => updateFilters({...filters, done: !filters.done})} className={`newlist__filterareabutton ${!filters.done && 'newlist__filterareabutton--clicked'}`}>DONE</button>
                <button onClick={(e) => updateFilters({...filters, working: !filters.working})} className={`newlist__filterareabutton ${!filters.working && 'newlist__filterareabutton--clicked'}`}>WORKING</button>
                <button onClick={(e) => updateFilters({...filters, pending: !filters.pending})} className={`newlist__filterareabutton ${!filters.pending &&'newlist__filterareabutton--clicked'}`}>PENDING</button>
            </div>
        </div>
    );
            }
};

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos
});

export default connect(mapStateToProps)(NewList);