import { Lists, Todos } from "../config/models.mjs";

const addListViaValue = (req, res) => {
  Lists.create({
    name: "",
    user_id: req.params.userid,
  }).then((listsResponse) => {
    Todos.create({
      list_id: listsResponse.dataValues.id,
      value: req.params.value,
      state: "pending",
    }).then((todosResponse) => {
      res.json({
        type: "todo",
        value: req.params.value,
        id: todosResponse.dataValues.id,
        location: `/l/${listsResponse.dataValues.id}`,
      });
    });
  });
};

export default addListViaValue;
