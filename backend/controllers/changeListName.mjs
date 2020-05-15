import { Lists } from "../config/models.mjs";

const changeListName = (req, res) => {
  Lists.update(
    {
      name: req.query.name,
    },
    {
      where: {
        id: req.params.listid,
      },
    }
  ).then(() => {
    res.json(req.query.name);
  });
};

export default changeListName;
