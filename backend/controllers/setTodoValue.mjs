import { Todos } from "../config/models.mjs";

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
};

export default setTodoValue;
