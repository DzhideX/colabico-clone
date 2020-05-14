import { Todos, Lists } from "../config/models.mjs";

const getUserTodos = (req, res) => {
  let todos = [];
  Todos.findAll({
    where: {
      list_id: req.params.listid,
    },
  }).then((todosResponse) => {
    todosResponse.forEach((todo) => {
      todos.push({
        state: todo.dataValues.state,
        value: todo.dataValues.value,
        id: todo.dataValues.id,
      });
    });
    Lists.findOne({
      where: {
        id: req.params.listid,
      },
    }).then((listsResponse) => {
      res.json({ name: listsResponse.dataValues.name, todos });
    });
  });
};

export default getUserTodos;
