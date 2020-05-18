import { Todos } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

const addTodo = (req, res) => {
  let addedTodo = {
    value: req.params.todovalue,
    state: "pending",
  };
  Todos.create({
    list_id: req.params.listid,
    ...addedTodo,
  }).then((response) => {
    res.json({ ...addedTodo, id: response.dataValues.id });
  });
  client.set(`todos/${req.params.listid}`, "", redis.print);
  client.set(`lists/${req.params.userid}`, "", redis.print);
};

export default addTodo;
