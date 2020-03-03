import database, {db} from '../../firebase/firebase';

const SET_USER_DATA = 'SET_USER_DATA';

const getUserData = (userId,listId) => {
    return  (dispatch) => {
        let todos = {};
        db.collection(`users/${userId}/lists/${listId}/todos`).get().then((querySnapshot) => {
            querySnapshot.docs.forEach(doc => {
                if(doc.exists){
                    todos[doc.id] = doc.data();
                }
            });
            db.collection(`users/${userId}/lists`).doc(listId).get().then(querySnapshotTwo => {
                // console.log(querySnapshotTwo.data().name);
                // console.log(todos);
                dispatch({type: SET_USER_DATA, payload: {name: querySnapshotTwo.data().name, todos}})
            });
        });
        // Obj = {...Obj, todos}
        // console.log(Object.keys(Obj))
        // return database.ref(`users/${userId}/${listId}`).once('value').then(snapshot =>{
        //     const name = snapshot.val().name;
        //     const todos = snapshot.val().todos;
        //     console.log("todos",todos);
        //     dispatch({type: SET_USER_DATA, payload: {name: name, todos:todos}})
        // });
    }
}

// .catch(error => {
//     // dispatch({type: SET_USER_DATA_ERROR, payload: 'error'});
// })

export default getUserData;