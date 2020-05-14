import { Todos } from "../config/models.mjs";

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
};

export default setTodoState;
