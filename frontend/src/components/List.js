import React, { useState, useRef, useEffect } from 'react';
import edit from '../pictures/edit.png';
import ListItem from './ListItem';
import { connect } from 'react-redux';

const List = ({ userId, todos, dispatch, location, listNameRedux, action }) => {
  const [listName, setListName] = useState('');
  const [listNameState, setListNameState] = useState('button');
  const textInput = useRef();
  const [currentTodo, updateCurrentTodo] = useState('');
  const [filters, updateFilters] = useState({
    done: true,
    working: true,
    pending: true,
  });
  let noRenderedTodos = 0;

  useEffect(() => {
    if (userId) {
      dispatch({
        type: 'REQUEST_TODO_DATA',
        payload: { userId, listId: location.pathname.split('/')[2] },
      });
    } else if (userId === '') {
      console.log('happened!', location.pathname.split('/')[2]);
      dispatch({
        type: 'REQUEST_TODO_DATA',
        payload: { listId: location.pathname.split('/')[2] },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (listNameRedux && listNameRedux !== '0') {
      setListName(listNameRedux);
    } else if (listNameRedux === '' || listNameRedux === '0') {
      setListName('');
    }
  }, [listNameRedux]);

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
    if (e.key === 'Enter') {
      if (userId) {
        let listId = location.pathname.split('/')[2];
        if (e.target.value) {
          dispatch({
            type: 'REQUEST_ADD_TODO',
            payload: { userId, listId, todoValue: e.target.value },
          });
        }
      }
      updateCurrentTodo('');
    }
  };

  const deleteListItem = key => {
    let listId = location.pathname.split('/')[2];
    dispatch({ type: 'REQUEST_DELETE_TODO', payload: { userId, listId, key } });
  };

  return (
    <div className="newlist">
      {listNameState === 'button' && (
        <button
          onClick={!userId ? null : changeToInput}
          className="newlist__placeholder"
        >
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
            {userId && (
              <img
                className="newlist__placeholder__area__icon"
                src={edit}
                alt="edit icon"
              ></img>
            )}
          </div>
        </button>
      )}{' '}
      {/* REPLACE THIS WITH STATIC VALUE*/}
      {listNameState === 'input' && (
        <input
          onBlur={e => {
            e.persist();
            setListNameState('button');
            let listId = location.pathname.split('/')[2];
            dispatch({
              type: 'REQUEST_CHANGE_LIST_NAME',
              payload: { userId, listId, value: e.target.value },
            });
          }}
          onFocus={onInputFocus}
          placeholder="(NAME THIS LIST)"
          className="newlist__input"
          value={listName}
          onChange={onInputChange}
          ref={textInput}
        ></input>
      )}
      {userId && (
        <input
          type="text"
          className="newlist__taskinput"
          placeholder="Add a new task..."
          value={currentTodo}
          onChange={e => updateCurrentTodo(e.target.value)}
          onKeyPress={handleInputKeyPress}
        ></input>
      )}{' '}
      {/* COMPLETELY GET RID OF THIS INPUT */}
      <div
        className={
          userId ? 'newlist__filterarea' : 'newlist__filterarea--dropped'
        }
      >
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
      {/*eslint-disable-next-line array-callback-return*/}
      {todos &&
        todos.length !== 0 &&
        //eslint-disable-next-line
        todos.map(todo => {
          // LIST COMPLETELY DIFFERENT ITEM
          if (filters[todo.state]) {
            return (
              <ListItem
                listId={location.pathname.split('/')[2]}
                userId={userId}
                deleteListItem={deleteListItem}
                initialValue={todo.value}
                initialState={todo.state}
                key={todo.id}
                todoId={todo.id}
                dispatch={dispatch}
              />
            );
          } else {
            ++noRenderedTodos;
          }
        })}
      {noRenderedTodos === todos.length && (
        <p className="newlist__errormessage">
          {' '}
          Add todos or edit preferences to show todos!{' '}
        </p>
      )}
    </div>
  );
};

//(todoObject[key].state === filters.working || todoObject[key].state === filters.done || todoObject[key].state === filters.pending)
const mapStateToProps = state => ({
  userId: state.reducer.userId,
  todos: state.reducer.todos,
  listNameRedux: state.reducer.listName,
  action: state.router.action,
});

export default connect(mapStateToProps)(List);
