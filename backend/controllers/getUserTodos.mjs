import { Todos, Lists } from "../config/models.mjs";

const getUserTodos = (req, res) => {
  let todos = [];
  Todos.findAll({
    where: {
      list_id: req.params.listid,
    },
  }).then((todosResponse) => {
    todosResponse.forEach((todo) => {
      todos.push(todo.dataValues);
    });
    Lists.findOne({
      where: {
        id: req.params.listid,
      },
    }).then((listsResponse) => {
      const sortedTodos = todos.sort((a, b) => a.created_at - b.created_at);
      let resultTodos = [];
      sortedTodos.forEach((sortedTodo) => {
        resultTodos.push({
          state: sortedTodo.state,
          value: sortedTodo.value,
          id: sortedTodo.id,
        });
      });
      res.json({ name: listsResponse.dataValues.name, todos: resultTodos });
    });
  });
};

export default getUserTodos;
