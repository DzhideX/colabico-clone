import { Lists } from "../config/models.mjs";

const changeListName = (req, res) => {
  Lists.update(
    {
      name: req.params.name,
    },
    {
      where: {
        id: req.params.listid,
      },
    }
  ).then(() => {
    res.json(req.params.name);
  });
};

export default changeListName;
