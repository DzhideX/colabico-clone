import { Todos } from "../config/models.mjs";

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
};

export default addTodo;
