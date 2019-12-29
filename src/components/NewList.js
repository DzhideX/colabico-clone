import React, { useState, useRef } from 'react';
import edit from '../pictures/edit.png';

const NewList = () => {

    const [listName, setListName ] = useState('');
    const [listNameState, setListNameState] = useState('button');
    const textInput =  useRef();
    const changeToInput = () => {
        setListNameState('input');
        setTimeout(() => {
            textInput.current.focus();
        },0);
    }
    
    return(
        <div className='newlist'>
        {listNameState === 'button' && (
            <button 
            onClick={changeToInput}
            className='newlist__placeholder'>
                <div className='newlist__placeholder__area'>
                    <p className='newlist__placeholder__area__name'>{listName === '' ? '(NAME THIS LIST)' : listName}</p>
                    <img className='newlist__placeholder__area__icon' src={edit} alt='edit icon'></img>
                </div>
            </button>
        )}
        {listNameState === 'input' && 
        <input 
            onBlur={(e) => setListNameState('button')} 
            onFocus={(e) => e.target.placeholder = listName} 
            placeholder='(NAME THIS LIST)' 
            className='newlist__input'
            value={listName}
            onChange={(e) => setListName((e.target.value).toUpperCase())}
            ref={textInput}>
        </input>}
        <input type='text' className='newlist__taskinput' placeholder='Add a new task...'></input>
        <div className='newlist__filterarea'>
            <p>Show:</p>
            <button className='newlist__filterareabutton'>DONE</button>
            <button className='newlist__filterareabutton'>WORKING</button>
            <button className='newlist__filterareabutton'>PENDING</button>
        </div>
    </div>
    );
};

export default NewList;