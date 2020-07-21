import { Lists, Todos } from "../config/models.mjs";
import client from "../app.mjs";

const getListData = (req, res) => {
  let Arr = [];
  client.get(`lists/${req.params.userid}`, (err, reply) => {
    if (reply) {
      console.log(reply);
      res.json(JSON.parse(reply));
    } else {
      Lists.findAll({
        //Find lists that correspond to this user id
        where: {
          user_id: req.params.userid,
        },
      }).then((listsResponse) => {
        let lists = [];
        listsResponse.forEach((list) => {
          //Push all lists in an array
          lists.push(list.dataValues);
        });
        const sortedLists = lists.sort((a, b) => a.created_at - b.created_at); // Sort lists by date
        sortedLists.forEach((list) => {
          // Loop through all of those lists
          Todos.findAll({
            // Find all todos that correspond to each list
            where: {
              list_id: list.id,
            },
          }).then((todosResponse) => {
            //Loop through todos
            let todos = [];
            todosResponse.forEach((todo) => {
              // Push all todos in an array
              todos.push(todo.dataValues);
            });
            const sortedTodos = todos.sort(
              (a, b) => a.created_at - b.created_at
            ); //Sort todos by date
            let tempObj = {
              name: list.name,
              id: list.id,
              numberOfTodos: todosResponse ? todosResponse.length : 0,
              lastTodo: sortedTodos[sortedTodos.length - 1]
                ? sortedTodos[sortedTodos.length - 1].value
                : "",
            }; //Create an object with list name,id, value of last todo, number of todos
            Arr.push(tempObj); //Push this object into a "global" array
            if (Arr.length === listsResponse.length) {
              console.log("responded");
              res.json(Arr); //Respond with finished array
              client.set(`lists/${req.params.userid}`, JSON.stringify(Arr));
            }
          });
        });
      });
    }
  });
};

export default getListData;
