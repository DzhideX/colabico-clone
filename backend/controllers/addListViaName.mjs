import { Lists } from "../config/models.mjs";

const addListViaName = (req, res) => {
  Lists.create({
    name: req.params.name,
    user_id: req.params.userid,
  }).then((response) => {
    console.log(response.dataValues.id);
    res.json({
      type: "name",
      name: req.params.name,
      location: `/l/${response.dataValues.id}`,
    });
  });
};

export default addListViaName;
