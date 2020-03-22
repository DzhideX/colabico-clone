import db from "../config/firebase.mjs";

const deleteList = (req, res) => {
  db.collection(`users/${req.params.userid}/lists`)
    .doc(req.params.listid)
    .delete()
    .then(() => {
      res.json(req.params.listid);
    });
};

export default deleteList;
