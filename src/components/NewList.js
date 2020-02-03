import React, { useState, useRef, useEffect } from 'react';
import edit from '../pictures/edit.png';
import ListItem from './ListItem';
import database, { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';

const NewList = ({userId}) => {

    useEffect(() => {
        if(userId){
            database.ref(`users/${userId}/todos`).on('value',(snapshot) => {
                let dbTodos = snapshot.val();
                if(dbTodos){
                    console.log(dbTodos);
                // let newTodos = [];
                // for(let key in dbTodos){
                //     if (dbTodos.hasOwnProperty(key)) {
                //         newTodos.push(dbTodos[key].value);
                //     }
                // }
                updateTodoObject(dbTodos);
                }else{
                    database.ref(`users/${userId}/todos`).push({state:'pending',value:'Do stuff!'}).then(() => {
                        database.ref(`users/${userId}/todos`).on('value',(snapshot) => {
                            let dbTodos = snapshot.val();
                            console.log(dbTodos);
                            updateTodoObject(dbTodos);
                        });
                    });
                }
            });  
        }
    },[userId]);  
    
    // const getTodos = async () => {
    //     const id = await userId;
    // } 

    const [listName, setListName ] = useState('');
    const [listNameState, setListNameState] = useState('button');
    const textInput =  useRef();

    const [currentTodo, updateCurrentTodo] = useState('');
    const [todoObject, updateTodoObject] = useState({});
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
        if(e.key === 'Enter'){
            database.ref(`users/${userId}/todos`).push({'value':e.target.value, state: 'pending'});
            updateCurrentTodo('');
        }
    }

    const deleteListItem = (todoValue,key) => {
        database.ref(`users/${userId}/todos/${key}`).remove();
    }
    
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
                onBlur={(e) => setListNameState('button')} 
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
            {Object.keys(todoObject).map(key => <ListItem deleteListItem={deleteListItem} initialValue={todoObject[key].value} key={key} objectKey={key}/>)}
        </div>
    );
};

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos
});

export default connect(mapStateToProps)(NewList);