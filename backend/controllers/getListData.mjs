import db from "../config/firebase.mjs";

const getListData = (req, res) => {
  let Arr = [];
  db.collection(`users/${req.params.userid}/lists`)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach((doc, i) => {
        db.collection(`users/${req.params.userid}/lists/${doc.id}/todos`)
          .get()
          .then(snapshotTwo => {
            let tempObj = {
              name: doc.data() ? doc.data().name : "",
              lastTodo: snapshotTwo.docs[snapshotTwo.docs.length - 1]
                ? snapshotTwo.docs[snapshotTwo.docs.length - 1].data().value
                : "",
              numberOfTodos: snapshotTwo.docs.length,
              id: doc.id
            };
            Arr.push(tempObj);
          })
          .then(() => {
            if (Arr.length === snapshot.docs.length) {
              res.json(Arr);
            }
          });
      });
    });
};

export default getListData;
