import { Todos } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

const setTodoState = (req, res) => {
  Todos.update(
    {
      state: req.params.state,
    },
    {
      where: {
        id: req.params.todoid,
      },
    }
  ).then(() => {
    res.json({ todoId: req.params.todoid, desiredState: req.params.state });
  });
  client.set(`todos/${req.params.listid}`, "", redis.print);
};

export default setTodoState;
