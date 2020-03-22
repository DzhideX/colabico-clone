import db from "../config/firebase.mjs";

const setTodoState = (req, res) => {
  db.collection(`users/${req.params.userid}/lists/${req.params.listid}/todos`)
    .doc(req.params.todoid)
    .set({ state: req.params.state }, { merge: true })
    .then(() => {
      res.json({ todoId: req.params.todoid, desiredState: req.params.state });
    });
};

export default setTodoState;
