import React, { useState, useRef } from 'react';
import edit from '../pictures/edit.png';
import ListItem from './ListItem';

const NewList = () => {

    const [listName, setListName ] = useState('');
    const [listNameState, setListNameState] = useState('button');
    const textInput =  useRef();

    const [doneState, setDoneState] = useState(false);
    const [workingState, setWorkingState] = useState(false);
    const [pendingState, setPendingState] = useState(false);

    const [currentTodo, updateCurrentTodo] = useState('');
    const [todos, updateTodos] = useState([]);

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
            updateTodos([...todos, e.target.value]);
            updateCurrentTodo('');
        }
    }

    const deleteListItem = (todoValue) => {
        const newTodoList = todos.filter(todo => todo !== todoValue);
        updateTodos(newTodoList);
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
                <button onClick={(e) => setDoneState(!doneState)} className={`newlist__filterareabutton ${doneState === true ?'newlist__filterareabutton--clicked' : ''}`}>DONE</button>
                <button onClick={(e) => setWorkingState(!workingState)} className={`newlist__filterareabutton ${workingState === true ?'newlist__filterareabutton--clicked' : ''}`}>WORKING</button>
                <button onClick={(e) => setPendingState(!pendingState)} className={`newlist__filterareabutton ${pendingState === true ?'newlist__filterareabutton--clicked' : ''}`}>PENDING</button>
            </div>
            {todos.map((todo,index) => <ListItem deleteListItem={deleteListItem} initialValue={todo} key={index}/>)}
        </div>
    );
};

export default NewList;