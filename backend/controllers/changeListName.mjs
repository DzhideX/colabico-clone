import { Lists } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

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
  client.set(`todos/${req.params.listid}`, "", redis.print);
  client.set(`lists/${req.params.userid}`, "", redis.print);
};

export default changeListName;
