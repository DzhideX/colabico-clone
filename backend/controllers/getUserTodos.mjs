import db from "../config/firebase.mjs";

const getUserTodos = (req, res) => {
  let todos = [];
  db.collection(`users/${req.params.userid}/lists/${req.params.listid}/todos`)
    .get()
    .then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        if (doc.exists) {
          todos.push({ ...doc.data(), id: doc.id });
        }
      });
      db.collection(`users/${req.params.userid}/lists`)
        .doc(req.params.listid)
        .get()
        .then(querySnapshotTwo => {
          res.json({ name: querySnapshotTwo.data().name, todos });
        });
    });
};

export default getUserTodos;
