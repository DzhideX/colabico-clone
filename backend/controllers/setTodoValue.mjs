import { Todos } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

const setTodoValue = (req, res) => {
  Todos.update(
    {
      value: req.params.value,
    },
    {
      where: {
        id: req.params.todoid,
      },
    }
  ).then(() => {
    res.json({ todoId: req.params.todoid, value: req.params.value });
  });
  client.set(`todos/${req.params.listid}`, "", redis.print);
};

export default setTodoValue;
