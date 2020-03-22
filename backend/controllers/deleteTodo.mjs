import db from "../config/firebase.mjs";

const deleteTodo = (req, res) => {
  db.collection(`users/${req.params.userid}/lists/${req.params.listid}/todos`)
    .doc(req.params.todoid)
    .delete()
    .then(() => {
      res.json(req.params.todoid);
    });
};

export default deleteTodo;
