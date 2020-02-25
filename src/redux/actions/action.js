import database from '../../firebase/firebase';

const SET_USER_DATA = 'SET_USER_DATA';

const getUserData = (userId,listId) => {
    return  (dispatch) => {
        return database.ref(`users/${userId}/${listId}`).once('value').then(snapshot =>{
            const name = snapshot.val().name;
            const todos = snapshot.val().todos;
            console.log(todos);
            dispatch({type: SET_USER_DATA, payload: {name: name, todos:todos}})
        })
    }
}

// .catch(error => {
//     // dispatch({type: SET_USER_DATA_ERROR, payload: 'error'});
// })

export default getUserData;