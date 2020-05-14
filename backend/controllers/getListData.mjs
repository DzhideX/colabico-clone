import { Lists, Todos } from "../config/models.mjs";

const getListData = (req, res) => {
  let Arr = [];
  Lists.findAll({
    //Find lists that correspond to this user id
    where: {
      user_id: req.params.userid,
    },
  }).then((listsResponse) => {
    listsResponse.forEach((list) => {
      // Loop through all of those lists
      Todos.findAll({
        // Find all todos that correspond to each list
        where: {
          list_id: list.dataValues.id,
        },
      }).then((todosResponse) => {
        //Loop through todos
        let todos = [];
        todosResponse.forEach((todo) => {
          // Push all todos in an array
          todos.push(todo.dataValues);
        });
        const sortedTodos = todos.sort((a, b) => b.createdAt - a.createdAt); //Sort todos by date
        let tempObj = {
          name: list.dataValues.name,
          id: list.dataValues.id,
          numberOfTodos: todosResponse ? todosResponse.length : 0,
          lastTodo: sortedTodos[sortedTodos.length - 1]
            ? sortedTodos[sortedTodos.length - 1].value
            : "",
        }; //Create an object with list name,id, value of last todo, number of todos
        Arr.push(tempObj); //Push this object into a "global" array
        if (Arr.length === listsResponse.length) {
          res.json(Arr); //Respond with finished array
        }
      });
    });
  });
};

export default getListData;
