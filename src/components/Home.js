import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  database  from '../firebase/firebase';
import { Trash2 } from 'react-feather';
import Modal from 'react-modal';


const ListBox = ({listName, lastTodo, numberOfTodos,className,listKey,deleteList}) => {

    const [trashIconColor, setTrashIconColor] = useState('white');
    const [redirect, updateRedirect] = useState();

    if(redirect){
        return <Redirect to={redirect} />
    }else{
        return(
            <div className={className}>
               <button className='home__listbox__data' onClick={() => updateRedirect(`/l/${listKey}`)}>
                    {listName !== '0' && listName && <p className='home__listbox__data__listname'>{listName}</p>}
                    {lastTodo && <p className='home__listbox__data__lasttodo'> {lastTodo} </p>}
                    {numberOfTodos && <p className='home__listbox__data__numbertodos'>({numberOfTodos})</p>}
               </button>
               <Trash2 onClick={() => deleteList(listKey)} onMouseOver={()=> setTrashIconColor('black')} onMouseLeave={()=> setTrashIconColor('white')} size={13} className='home__lisbox__trash' color={trashIconColor}/>
            </div>
        );
    }
    
}

const customStyles = {
    content : {
      top                   : '9.3rem',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '30rem',
      backgroundColor: '#FCF6F5FF',
      color: '#990011FF',
      fontWeight: 'bold'
    },
    overlay: {
            backgroundColor: 'transparent'
        }
  };

const Home = ({userId,location}) => {

    const [lastTodos, updateLastTodos] = useState([]);
    const [listNames, updateListNames ] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(userId){
            database.ref(`users/${userId}`).once('value').then(snapshot => {
                if(snapshot.val()){
                    // eslint-disable-next-line array-callback-return
                    Object.keys(snapshot.val()).map((key,i) => {
                        const todoObject = snapshot.val()[key].todos;
                        if(todoObject){
                            // eslint-disable-next-line array-callback-return
                            Object.keys(todoObject).map((newKey,newI) => {
                                if(Object.keys(todoObject).length === newI+1){
                                    updateLastTodos(prevState => [...prevState, todoObject[newKey].value]);
                                }
                            });
                        }else{
                            updateLastTodos(prevState => [...prevState, '']);
                        }
                    })
                    updateListNames(snapshot.val());
                }else{
                    updateListNames({});
                }
            })
        }else{
            updateListNames({});
        }
    },[userId]);

    useEffect(() => {
        if(location.state){
            setIsOpen(true);
            setTimeout(() => {
                setIsOpen(false)
            },7000);
        }
    },[location])

    const setListBoxClass = (key) => {
        if(key === 0){
            return "home__listbox--top";
        }else if(key+1 === Object.keys(listNames).length){
            return "home__listbox--bottom"
        }else{
            return "home__listbox"
        }
    }

    const deleteList = (listKey) => {
        database.ref(`users/${userId}/${listKey}`).remove();
        let tempObj = {...listNames};
        delete tempObj[listKey];
        updateListNames(tempObj);
    }

    return (
        <div className='main-flex-container'>
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <p> A new anonymous account has been created! When you log out you will lose all of your data. To save your data, create a new account! </p>
        </Modal>
            <Link to='/l/new' className='home__button'> NEW LIST </Link>
            {(listNames && lastTodos) && Object.keys(listNames).map((key,i) => {    
                if(lastTodos[i] && listNames[key].todos){
                    return <ListBox 
                    lastTodo={lastTodos[i]} 
                    numberOfTodos={Object.keys(listNames[key].todos).length} 
                    listName={listNames[key].name} 
                    userId={userId} key={i} 
                    listKey={key} 
                    className={setListBoxClass(i)}
                    deleteList={deleteList}/>
                }else{
                    return <ListBox 
                    lastTodo={''} 
                    numberOfTodos={'0'} 
                    listName={listNames[key].name} 
                    userId={userId} key={i} 
                    listKey={key} 
                    className={setListBoxClass(i)}
                    deleteList={deleteList}/>
                }
                
            })}
            {(listNames && Object.entries(listNames).length === 0) && <p className='home__infotext'> Start by pressing that big button up there! </p>}
        </div>
    );
}

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos,
    listNameRedux: state.listName
});

export default connect(mapStateToProps)(Home);