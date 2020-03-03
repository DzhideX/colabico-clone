const reducer = (
  state = {
    userId: '',
    listData: [],
    todos: [],
    listName: '',
  },
  action,
) => {
  switch (action.type) {
    case 'SET_USER_ID_SUCCESS':
      return { ...state, userId: action.payload.userId };
    case 'GET_TODO_DATA_SUCCESS':
      return {
        ...state,
        todos: action.payload.todos,
        listName: action.payload.name,
      };
    case 'SET_LIST_DATA_SUCCESS':
      return { ...state, listData: [...action.payload.listData], todos: [] };
    case 'DELETE_LIST_DATA_SUCCESS':
      return { ...state, listData: action.payload.listData };
    case 'ADD_TODO_SUCCESS':
      console.log(action.payload.todo);
      return { ...state, todos: [...state.todos, action.payload.todo] };
    default:
      return state;
  }
};

export default reducer;
