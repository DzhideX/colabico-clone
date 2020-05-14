import React, { useState, useRef } from 'react';
import edit from '../pictures/edit.png';
import { firebase, db } from '../firebase/firebase';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const NewList = ({ userId, todos, dispatch }) => {
  const [listName, setListName] = useState('');
  const [listNameState, setListNameState] = useState('button');
  const textInput = useRef();
  const [currentTodo, updateCurrentTodo] = useState('');
  const [filters, updateFilters] = useState({
    done: true,
    working: true,
    pending: true,
  });

  const changeToInput = () => {
    setListNameState('input');
    setTimeout(() => {
      textInput.current.focus();
    }, 0);
  };

  const onInputFocus = e => {
    if (listName === '') {
      e.target.placeholder = 'NAMELESS';
    } else {
      e.target.placeholder = listName;
    }
  };

  const onInputChange = e => {
    setListName(e.target.value.toUpperCase());
    if (e.target.value === '') {
      e.target.placeholder = 'NAMELESS';
    }
  };

  const handleInputKeyPress = e => {
    e.persist();
    if (e.key === 'Enter') {
      if (userId) {
        dispatch({
          type: 'REQUEST_ADD_LIST',
          payload: { userId, value: e.target.value },
        });
      } else {
        // console.log('sign in!');
        // firebase
        //   .auth()
        //   .signInAnonymously()
        //   .then(res => {
        //     dispatch(push('/', '/'));
        //     dispatch({ type: 'REQUEST_USER_ID' });
        //     db.collection(`users`)
        //       .doc(res.user.uid)
        //       .set({ state: 'user' });
        // })
        // .catch(function(error) {
        //   var errorCode = error.code;
        //   console.log(errorCode);
        // });
      }
    }
  };

  return (
    <div className="newlist">
      {listNameState === 'button' && (
        <button onClick={changeToInput} className="newlist__placeholder">
          <div className="newlist__placeholder__area">
            <p
              className={
                listName === ''
                  ? 'newlist__placeholder__area__name'
                  : 'newlist__placeholder__area__name--value'
              }
            >
              {' '}
              {listName === '' ? '(NAME THIS LIST)' : listName}
            </p>
            <img
              className="newlist__placeholder__area__icon"
              src={edit}
              alt="edit icon"
            ></img>
          </div>
        </button>
      )}
      {listNameState === 'input' && (
        <input
          onBlur={e => {
            setListNameState('button');
            if (userId) {
              dispatch({
                type: 'REQUEST_ADD_LIST',
                payload: { userId, name: listName },
              });
            } else {
              // firebase
              //   .auth()
              //   .signInAnonymously()
              //   .then(res => {
              //     dispatch(push('/', '/'));
              //     dispatch({ type: 'REQUEST_USER_ID' });
              //     db.collection(`users`)
              //       .doc(res.user.uid)
              //       .set({ state: 'user' });
              //   })
              //   .catch(function(error) {
              //     var errorCode = error.code;
              //     console.log(errorCode);
              //   });
            }
          }}
          onFocus={onInputFocus}
          placeholder="(NAME THIS LIST)"
          className="newlist__input"
          value={listName}
          onChange={onInputChange}
          ref={textInput}
        ></input>
      )}
      <input
        type="text"
        className="newlist__taskinput"
        placeholder="Add a new task..."
        value={currentTodo}
        onChange={e => updateCurrentTodo(e.target.value)}
        onKeyPress={handleInputKeyPress}
      ></input>
      <div className="newlist__filterarea">
        <p>Show:</p>
        <button
          onClick={e => updateFilters({ ...filters, done: !filters.done })}
          className={`newlist__filterareabutton ${!filters.done &&
            'newlist__filterareabutton--clicked'}`}
        >
          DONE
        </button>
        <button
          onClick={e =>
            updateFilters({ ...filters, working: !filters.working })
          }
          className={`newlist__filterareabutton ${!filters.working &&
            'newlist__filterareabutton--clicked'}`}
        >
          WORKING
        </button>
        <button
          onClick={e =>
            updateFilters({ ...filters, pending: !filters.pending })
          }
          className={`newlist__filterareabutton ${!filters.pending &&
            'newlist__filterareabutton--clicked'}`}
        >
          PENDING
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.reducer.userId,
  todos: state.reducer.todos,
});

export default connect(mapStateToProps)(NewList);
