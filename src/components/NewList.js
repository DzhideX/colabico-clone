import React from 'react';

const NewList = () => (
    <div className='newlist'>
        <p className='newlist__placeholdername'>(NAME THIS LIST)</p>
        <input type='text' className='newlist__taskinput' placeholder='Add a new task...'></input>
        <div className='newlist__filterarea'>
            <p>Show:</p>
            <button className='newlist__filterareabutton'>DONE</button>
            <button className='newlist__filterareabutton'>WORKING</button>
            <button className='newlist__filterareabutton'>PENDING</button>
        </div>
    </div>
);

export default NewList;