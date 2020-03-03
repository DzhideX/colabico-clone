import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Trash2 } from 'react-feather';
import Modal from 'react-modal';

const ListBox = ({
  listName,
  lastTodo,
  numberOfTodos,
  className,
  listKey,
  deleteList,
}) => {
  const [trashIconColor, setTrashIconColor] = useState('white');
  const [redirect, updateRedirect] = useState();

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className={className}>
        <button
          className="home__listbox__data"
          onClick={() => updateRedirect(`/l/${listKey}`)}
        >
          {listName !== '0' && listName && (
            <p className="home__listbox__data__listname">{listName}</p>
          )}
          {lastTodo && (
            <p className="home__listbox__data__lasttodo"> {lastTodo} </p>
          )}
          {(numberOfTodos || numberOfTodos === 0) && (
            <p className="home__listbox__data__numbertodos">
              ({numberOfTodos})
            </p>
          )}
        </button>
        <Trash2
          onClick={() => deleteList(listKey)}
          onMouseOver={() => setTrashIconColor('black')}
          onMouseLeave={() => setTrashIconColor('white')}
          size={13}
          className="home__lisbox__trash"
          color={trashIconColor}
        />
      </div>
    );
  }
};

const customStyles = {
  content: {
    top: '9.3rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30rem',
    backgroundColor: '#FCF6F5FF',
    color: '#990011FF',
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: 'transparent',
  },
};

const Home = ({ userId, location, listData, dispatch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch({ type: 'REQUEST_LIST_DATA', payload: userId });
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (location.state) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  }, [location]);

  const setListBoxClass = key => {
    if (key === 0) {
      return 'home__listbox--top';
    } else if (key + 1 === listData.length) {
      return 'home__listbox--bottom';
    } else {
      return 'home__listbox';
    }
  };

  const deleteList = listKey => {
    // database.ref(`users/${userId}/${listKey}`).remove();
    // db.collection(`users/${userId}/lists`).doc(listKey).delete();
    // let tempObj = { ...listNames };
    // delete tempObj[listKey];
    // updateListNames(tempObj);
  };

  return (
    <div className="main-flex-container">
      <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
        <p>
          {' '}
          A new anonymous account has been created! When you log out you will
          lose all of your data. To save your data, create a new account!{' '}
        </p>
      </Modal>
      <Link to="/l/new" className="home__button">
        {' '}
        NEW LIST{' '}
      </Link>
      {listData &&
        listData.length !== 0 &&
        listData.map((list, i) => {
          return (
            <ListBox
              lastTodo={list.lastTodo}
              numberOfTodos={list.numberOfTodos}
              listName={list.name}
              userId={userId}
              key={i}
              listKey={list.id}
              className={setListBoxClass(i)}
            />
          );
        })}
      {listData && listData.length === 0 && (
        <p className="home__infotext">
          {' '}
          Start by pressing that big button up there!{' '}
        </p>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.userId,
  todos: state.todos,
  listData: state.listData,
});

export default connect(mapStateToProps)(Home);
