import { Todos, Lists } from "../config/models.mjs";
import client from "../app.mjs";

const getUserTodos = (req, res) => {
  let todos = [];
  client.get(`todos/${req.params.listid}`, (err, reply) => {
    if (reply) {
      console.log(reply);
      res.json(JSON.parse(reply));
    } else {
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
          client.set(
            `todos/${req.params.listid}`,
            JSON.stringify({
              name: listsResponse.dataValues.name,
              todos: resultTodos,
            })
          );
        });
      });
    }
  });
};

export default getUserTodos;
