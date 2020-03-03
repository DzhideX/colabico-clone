import React, { useState, useRef, useEffect } from 'react';
import { Square, CheckSquare, Trash2, Copy } from 'react-feather';
import database, { db } from '../firebase/firebase';

const ListItem = ({
  initialValue,
  deleteListItem,
  objectKey,
  userId,
  listId,
  updateParent,
  initialState,
}) => {
  const [done, setDone] = useState(false);
  const [todoState, updateTodoState] = useState('pending');
  const [listItemState, setListItemState] = useState('text');
  const [listItemValue, setListItemValue] = useState(initialValue);
  const [copyIconColor, setCopyIconColor] = useState('white');
  const [trashIconColor, setTrashIconColor] = useState('white');
  const textInput = useRef();

  useEffect(() => {
    // db.collection(`users/${userId}/lists/${listId}/todos`)
    //   .doc(objectKey)
    //   .get()
    //   .then(snapshot => {
    //     if (snapshot.data() && snapshot.data().state === 'done') {
    //       setDone(true)
    //     }
    //     console.log(snapshot.data().state)
    //     updateTodoState(snapshot.data().state)
    //   })
    // console.log('componented rerendered')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateParent]);

  // useEffect(() => {
  //     if(initialState){
  //         console.log('listItem',initialState);
  //         if(initialState === 'done'){
  //             setDone(true);
  //         }
  //         updateTodoState(initialState);
  //     }
  // },[initialState]);

  const changeToInput = () => {
    setListItemState('input');
    setTimeout(() => {
      textInput.current.focus();
    }, 0);
  };

  const setTodoState = desiredState => {
    // database.ref(`users/${userId}/${listId}/todos/${objectKey}/state`).set(desiredState);
    db.collection(`users/${userId}/lists/${listId}/todos`)
      .doc(objectKey)
      .set({ state: desiredState }, { merge: true });
    updateParent();
    console.log('parent updated');
  };

  return (
    <div
      className={todoState === 'working' ? 'list-item--working' : 'list-item'}
    >
      {listItemState === 'text' && (
        <React.Fragment>
          <div className="list-item__left">
            {!done ? (
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
              <CheckSquare
                className="list-item__left__square"
                size={24}
                color="#4caf50"
                onClick={() => {
                  setDone(!done);
                  setTodoState('pending');
                }}
              />
            )}
            <p
              className={
                done ? 'list-item__left__text--done' : 'list-item__left__text'
              }
              onClick={changeToInput}
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
            />
            <Trash2
              className="list-item__right__trash"
              size={13}
              color={trashIconColor}
              onMouseOver={() => setTrashIconColor('black')}
              onMouseLeave={() => setTrashIconColor('white')}
              onClick={() => {
                deleteListItem(objectKey);
              }}
            />
            {todoState === 'pending' && (
              <button
                className="list-item__right__button"
                onClick={() => {
                  setTodoState('working');
                }}
              >
                START
              </button>
            )}
            {todoState === 'working' && (
              <button
                className="list-item__right__button--stop"
                onClick={() => {
                  setTodoState('pending');
                }}
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
            db.collection(`users/${userId}/lists/${listId}/todos`)
              .doc(objectKey)
              .set({ value: e.target.value }, { merge: true });
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
