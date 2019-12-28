import React, { useState } from 'react';
import edit from '../pictures/edit.png';

const NewList = () => {

    const [listName, setListName ] = useState('');
    
    return(
        <div className='newlist'>
        <button className='newlist__placeholder'>
            <div className='newlist__placeholder__area'>
                <p className='newlist__placeholder__area__name'>{listName === '' ? '(NAME THIS LIST)' : listName}</p>
                <img className='newlist__placeholder__area__icon' src={edit} alt='edit icon'></img>
                </div>
        </button>
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