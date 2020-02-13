import database from '../../firebase/firebase';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_DATA_ERROR = 'SET_USER_DATA_ERROR';

const getUserData = (userId) => {
    return  (dispatch) => {
        return database.ref(`users/${userId}/todos`).once('value').then(snapshot =>{
            dispatch({type: SET_USER_DATA, payload: snapshot.val()})
        }).catch(error => {
            // dispatch({type: SET_USER_DATA_ERROR, payload: 'error'});
        })
    }
}

export default getUserData;