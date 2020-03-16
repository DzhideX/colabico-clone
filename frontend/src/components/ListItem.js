import React, { useState, useRef, useEffect } from 'react';
import { Square, CheckSquare, Trash2, Copy } from 'react-feather';
import database, { db } from '../firebase/firebase';

const ListItem = ({
  initialValue,
  deleteListItem,
  todoId,
  userId,
  listId,
  updateParent,
  initialState,
  dispatch,
}) => {
  const [done, setDone] = useState(false);
  const [listItemState, setListItemState] = useState('text');
  const [listItemValue, setListItemValue] = useState(initialValue);
  const [copyIconColor, setCopyIconColor] = useState('white');
  const [trashIconColor, setTrashIconColor] = useState('white');
  const textInput = useRef();

  useEffect(() => {
    if (initialState && initialState === 'done') {
      setDone(true);
    }
  }, [initialState]);

  const changeToInput = () => {
    setListItemState('input');
    setTimeout(() => {
      textInput.current.focus();
    }, 0);
  };

  const setTodoState = desiredState => {
    dispatch({
      type: 'REQUEST_SET_TODO_STATE',
      payload: { userId, listId, todoId, desiredState },
    });
  };

  return (
    <div
      className={
        initialState === 'working' && !userId
          ? 'list-item--working--no-id'
          : initialState === 'working'
          ? 'list-item--working'
          : !userId
          ? 'list-item--no-id'
          : 'list-item'
      }
    >
      {listItemState === 'text' && (
        <React.Fragment>
          <div className="list-item__left">
            {userId && !done ? (
              <Square
                className="list-item__left__square"
                size={24}
                color="white"
                onClick={() => {
                  setDone(!done);
                  setTodoState('done');
                }}
              />
            ) : (
              userId && (
                <CheckSquare
                  className="list-item__left__square"
                  size={24}
                  color="#4caf50"
                  onClick={() => {
                    setDone(!done);
                    setTodoState('pending');
                  }}
                />
              )
            )}
            <p
              className={
                done ? 'list-item__left__text--done' : 'list-item__left__text'
              }
              onClick={userId ? changeToInput : null}
            >
              {listItemValue}
            </p>
          </div>
          <div className="list-item__right">
            <Copy
              className="list-item__right__copy"
              size={13}
              color={copyIconColor}
              onMouseOver={() => setCopyIconColor('black')}
              onMouseLeave={() => setCopyIconColor('white')}
              onClick={e => {
                navigator.clipboard.writeText(listItemValue);
              }}
            />
            {userId && (
              <Trash2
                className="list-item__right__trash"
                size={13}
                color={trashIconColor}
                onMouseOver={() => setTrashIconColor('black')}
                onMouseLeave={() => setTrashIconColor('white')}
                onClick={() => {
                  deleteListItem(todoId);
                }}
              />
            )}
            {userId && initialState === 'pending' && (
              <button
                className="list-item__right__button"
                onClick={() => {
                  setTodoState('working');
                }}
              >
                START
              </button>
            )}
            {initialState === 'working' && (
              <button
                className="list-item__right__button--stop"
                onClick={
                  userId
                    ? () => {
                        setTodoState('pending');
                      }
                    : null
                }
              >
                STOP
              </button>
            )}
          </div>
        </React.Fragment>
      )}
      {listItemState === 'input' && (
        <input
          className="list-item__input"
          onBlur={e => {
            setListItemState('text');
            dispatch({
              type: 'REQUEST_SET_TODO_VALUE',
              payload: { userId, listId, todoId, value: e.target.value },
            });
          }}
          ref={textInput}
          value={listItemValue}
          onChange={e => {
            setListItemValue(e.target.value);
          }}
        />
      )}
    </div>
  );
};

export default ListItem;
