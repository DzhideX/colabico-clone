import firebase from '../../firebase/firebase';

const reducer = (state = {
    userId: '',
    todos: [],
}, action) =>  {
    switch(action.type){
        case 'SET_USER_ID':
            return { ...state, userId: action.payload.userId}
        // case GET_MOVIES_RECIEVED:
        //     return { ...state, fetching: false, fetched: true, movies: action.payload.Search, error: action.payload.Response === 'False' ? true: false  };
        // case GET_MOVIES_ERROR:
        //     return { ...state, fetching: false, error: action.payload};
        default:
            return state;
    };
    // return { ...state};
};

export default reducer;