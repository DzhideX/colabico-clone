import { Todos } from "../config/models.mjs";

const deleteTodo = (req, res) => {
  Todos.destroy({
    where: {
      id: req.params.todoid,
    },
  }).then(() => {
    res.json(req.params.todoid);
  });
};

export default deleteTodo;
