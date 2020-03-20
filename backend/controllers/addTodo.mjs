import db from "../config/firebase.mjs";

const addTodo = (req, res) => {
  let addedTodo = {
    value: req.params.todovalue,
    state: "pending"
  };
  db.collection(`users/${req.params.userid}/lists/${req.params.listid}/todos`)
    .add(addedTodo)
    .then(docRef => {
      res.json({ ...addedTodo, id: docRef.id });
    })
    .catch(e => {
      reject(e);
    });
};

export default addTodo;
