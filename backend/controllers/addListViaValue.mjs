import db from "../config/firebase.mjs";

const addListViaValue = (req, res) => {
  db.collection(`users/${req.params.userid}/lists`)
    .add({ name: "0" })
    .then(docRef => {
      db.collection(`users/${req.params.userid}/lists/${docRef.id}/todos`)
        .add({
          value: req.params.value,
          state: "pending"
        })
        .then(({ id }) => {
          res.json({
            type: "todo",
            value: req.params.value,
            id,
            location: `/l/${docRef.id}`
          });
        });
    });
};

export default addListViaValue;
