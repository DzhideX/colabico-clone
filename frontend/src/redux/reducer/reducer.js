const reducer = (
  state = {
    userId: '',
    listData: [],
    todos: [],
    listName: '',
    status: '',
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
    case 'DELETE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.key),
      };
    case 'ADD_TODO_SUCCESS':
      return { ...state, todos: [...state.todos, action.payload.todo] };
    case 'CHANGE_LIST_NAME_SUCCESS':
      return { ...state, listName: action.payload.name };
    case 'DELETE_LIST_DATA_SUCCESS':
      return { ...state, listData: action.payload.listData };
    case 'SET_TODO_STATE_SUCCESS':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.payload.todoId === todo.id) {
            todo.state = action.payload.desiredState;
          }
          return todo;
        }),
      };
    case 'SET_TODO_VALUE_SUCCESS':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.payload.todoId === todo.id) {
            todo.value = action.payload.value;
          }
          return todo;
        }),
      };
    case 'ADD_LIST_SUCCESS':
      if (action.payload.type === 'todo') {
        return { ...state, todos: [...state.todos, action.payload.todo] };
      } else if (action.payload.type === 'name') {
        return { ...state, listName: action.payload.listName };
      }
    default:
      return state;
  }
};

export default reducer;
