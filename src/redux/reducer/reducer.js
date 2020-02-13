import database from '../../firebase/firebase';

const reducer = (state = {
    userId: '',
    todos: [],
}, action) =>  {
    switch(action.type){
        case 'SET_USER_ID':
            return { ...state, userId: action.payload.userId}
        case 'SET_USER_DATA':
            return { ...state, todos: action.payload}
        default:
            return state;
    };
    // return { ...state};
};

export default reducer;