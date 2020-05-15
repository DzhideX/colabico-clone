import { Lists } from "../config/models.mjs";

const addListViaName = (req, res) => {
  Lists.create({
    name: req.query.listname,
    user_id: req.params.userid,
  }).then((response) => {
    console.log(response.dataValues.id);
    res.json({
      type: "name",
      name: req.query.listname,
      location: `/l/${response.dataValues.id}`,
    });
  });
};

export default addListViaName;
