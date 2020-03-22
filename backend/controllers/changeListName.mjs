import db from "../config/firebase.mjs";

const changeListName = (req, res) => {
  db.collection(`users/${req.params.userid}/lists`)
    .doc(req.params.listid)
    .set({ name: req.params.name })
    .then(() => {
      res.json(req.params.name);
    });
};

export default changeListName;
