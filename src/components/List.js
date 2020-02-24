import React, { useState, useRef, useEffect } from 'react';
import edit from '../pictures/edit.png';
import ListItem from './ListItem';
import database from '../firebase/firebase';
import { connect } from 'react-redux';
import getUserData from '../redux/actions/action';

const List = ({userId, todos, dispatch, location, listNameRedux}) => {

    useEffect(() => {
        if(userId){ 
            dispatch(getUserData(userId, location.pathname.split('/')[2])); //ovdje treba id
        }else if(userId === ''){
            updateTodoObject({});
        }
        console.log('rerender');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId]);  

    useEffect(() => {
        if(todos){
            updateTodoObject(todos);
        }else{
            console.log('no-todos');
            updateTodoObject({});
        }
    },[todos]);

    useEffect(() => {
        if(listNameRedux && listNameRedux !== '0'){
            console.log(listNameRedux);
            setListName(listNameRedux);
        }
    },[listNameRedux]);
    
    // const [numberOfRenderedTodos,updateNumberOfRenderedTodos] = useState(0);
    let numberOfRenderedTodos = 0;
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
            if(userId){
                // if(Object.entries(todoObject).length === 0 && todoObject.constructor === Object){
                database.ref(`users/${userId}/${location.pathname.split('/')[2]}/todos`).push({'value':e.target.value, state: 'pending'});
                dispatch(getUserData(userId,location.pathname.split('/')[2]));
            }
            updateCurrentTodo('');
        }
    }

    const deleteListItem = (key) => {
        database.ref(`users/${userId}/${location.pathname.split('/')[2]}/todos/${key}`).remove(); // ovdje treba list id
        dispatch(getUserData(userId,location.pathname.split('/')[2]));// ovdje treba list id
    }

    const updateParent = () => {
        dispatch(getUserData(userId,location.pathname.split('/')[2]));
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
                onBlur={(e) => {
                    e.persist();
                    setListNameState('button');
                    console.log(`*${e.target.value}*`, e.target.value==='');
                    if(e.target.value ===''){
                        database.ref(`users/${userId}/${location.pathname.split('/')[2]}/name`).set('0').then(res => {
                            dispatch(getUserData(userId,location.pathname.split('/')[2]));
                        });
                    }else{
                        database.ref(`users/${userId}/${location.pathname.split('/')[2]}/name`).set(e.target.value).then(res => {
                            dispatch(getUserData(userId,location.pathname.split('/')[2]));
                        });
                    }
                    
                }
            } 
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
            {Object.keys(todoObject).map((key,i) =>  {
                // let numberOfRenderedTodos = 0;
                // console.log(numberOfRenderedTodos)
                if(filters[todoObject[key].state]){
                    ++numberOfRenderedTodos;
                    console.log(numberOfRenderedTodos);
                    return(<ListItem 
                        listId={location.pathname.split('/')[2]} 
                        userId={userId} 
                        deleteListItem={deleteListItem} 
                        initialValue={todoObject[key].value} 
                        initialState={todoObject[key].state}
                        key={key} 
                        objectKey={key}
                        updateParent={updateParent}
                        />);
                }else{
                }
            })}
            {numberOfRenderedTodos === 0 && <p className='newlist__errormessage'> Select some or all 'show' preferences! </p>}
        </div>
    );
};

//(todoObject[key].state === filters.working || todoObject[key].state === filters.done || todoObject[key].state === filters.pending)
const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos,
    listNameRedux: state.listName
});

export default connect(mapStateToProps)(List);