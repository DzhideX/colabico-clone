import { Lists } from "../config/models.mjs";

const deleteList = (req, res) => {
  Lists.destroy({
    where: {
      id: req.params.listid,
    },
  }).then(() => {
    res.json(req.params.listid);
  });
};

export default deleteList;
