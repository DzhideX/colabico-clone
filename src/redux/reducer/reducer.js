const reducer = (
  state = {
    userId: '',
    todos: [],
    listData: [],
  },
  action,
) => {
  switch (action.type) {
    case 'SET_USER_ID_SUCCESS':
      return { ...state, userId: action.payload.userId };
    case 'SET_USER_DATA':
      // console.log(action.payload.todos);
      return {
        ...state,
        todos: action.payload.todos,
        listName: action.payload.name,
      };
    case 'SET_LIST_DATA_SUCCESS':
      console.log(action.payload.listData.length);
      return { ...state, listData: [...action.payload.listData], todos: [] };
    default:
      return state;
  }
};

export default reducer;
