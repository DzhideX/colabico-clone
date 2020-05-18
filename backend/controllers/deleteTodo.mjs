import { Todos } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

const deleteTodo = (req, res) => {
  Todos.destroy({
    where: {
      id: req.params.todoid,
    },
  }).then(() => {
    res.json(req.params.todoid);
  });
  client.set(`todos/${req.params.listid}`, "", redis.print);
  client.set(`lists/${req.params.userid}`, "", redis.print);
};

export default deleteTodo;
