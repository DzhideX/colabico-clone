import db from "../config/firebase.mjs";

const addListViaName = (req, res) => {
  db.collection(`users/${req.params.userid}/lists`)
    .add({ name: req.params.name })
    .then(docRef => {
      res.json({
        type: "name",
        name: req.params.name,
        location: `/l/${docRef.id}`
      });
    });
};

export default addListViaName;
