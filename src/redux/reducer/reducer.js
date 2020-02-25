const reducer = (state = {
    userId: '',
    todos: [],
    listName: ''
}, action) =>  {
    switch(action.type){
        case 'SET_USER_ID':
            return { ...state, userId: action.payload.userId}
        case 'SET_USER_DATA':
            console.log(action.payload);
            return { ...state, todos: action.payload.todos, listName: action.payload.name}
        default:
            return state;
    };
};

export default reducer;