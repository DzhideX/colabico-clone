import db from "../config/firebase.mjs";

const setTodoValue = (req, res) => {
  db.collection(`users/${req.params.userid}/lists/${req.params.listid}/todos`)
    .doc(req.params.todoid)
    .set({ value: req.params.value }, { merge: true })
    .then(() => {
      res.json({ todoId: req.params.todoid, value: req.params.value });
    });
};

export default setTodoValue;
