import { Lists } from "../config/models.mjs";
import redis from "redis";
import client from "../app.mjs";

const deleteList = (req, res) => {
  Lists.destroy({
    where: {
      id: req.params.listid,
    },
  }).then(() => {
    res.json(req.params.listid);
  });
  client.set(`todos/${req.params.listid}`, "", redis.print);
  client.set(`lists/${req.params.userid}`, "", redis.print);
};

export default deleteList;
