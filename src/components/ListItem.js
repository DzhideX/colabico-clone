import React, { useState, useRef, useEffect } from 'react';
import {Square, CheckSquare, Trash2, Copy} from 'react-feather';
import database from '../firebase/firebase';

const ListItem = ({initialValue, deleteListItem,objectKey,userId}) => {

    useEffect(() => {
        database.ref(`users/${userId}/todos/${objectKey}/state`).on('value',snapshot => {
            console.log(snapshot.val());
            updateTodoState(snapshot.val());
        });
    },[objectKey]);

    const [done, setDone] = useState(false);
    const [todoState, updateTodoState] = useState('');
    const [listItemState, setListItemState] = useState('text');
    const [listItemValue, setListItemValue] = useState(initialValue);
    const [copyIconColor, setCopyIconColor] = useState('white');
    const [trashIconColor, setTrashIconColor] = useState('white');
    const textInput = useRef();

    const changeToInput = () => {
        setListItemState('input');
        setTimeout(() => {
            textInput.current.focus();
        },0);
    }

    const setTodoState = (desiredState) => {
        database.ref(`users/${userId}/todos/${objectKey}/state`).set(desiredState);
    }

    return(
        <div className={todoState === 'working' ? 'list-item--working' : 'list-item'}>
        {listItemState === 'text' && 
        <React.Fragment>
            <div className='list-item__left'>
            {!done ? <Square className='list-item__left__square' size={24} color='white' 
            onClick={()=>{
                setDone(!done);
                setTodoState('done');
            }}/> :
            <CheckSquare className='list-item__left__square' size={24} color='#4caf50' onClick={()=>{setDone(!done); setTodoState('pending');}}/>}
            <p className={done ? 'list-item__left__text--done' : 'list-item__left__text'} onClick={changeToInput}>{listItemValue}</p>
        </div>
        <div className='list-item__right'>
            <Copy className='list-item__right__copy' size={13} color={copyIconColor} onMouseOver={()=> setCopyIconColor('black')} onMouseLeave={()=> setCopyIconColor('white')}/>
            <Trash2 className='list-item__right__trash' size={13} color={trashIconColor} onMouseOver={()=> setTrashIconColor('black')} onMouseLeave={()=> setTrashIconColor('white')} onClick={()=> {deleteListItem(initialValue,objectKey)}}/>
            {todoState === 'pending' && <button className='list-item__right__button' onClick={()=>{setTodoState('working')}}>START</button>}
            {todoState === 'working' && <button className='list-item__right__button--stop' onClick={()=>{setTodoState('pending')}}>STOP</button>}
        </div>
        </React.Fragment>}
        {listItemState === 'input' && 
            <input
            className='list-item__input'
            onBlur={(e)=>{setListItemState('text')}}
            ref={textInput}
            value={listItemValue}
            onChange={(e)=>{setListItemValue((e.target.value));}}
            />}
        </div>
    );
};

export default ListItem;