import express from "express";
import getListData from "./controllers/getListData.mjs";

const appRouter = express.Router();

appRouter.get("/user/:userid/listdata", getListData);

appRouter.get("*", (req, res) => {
  res.send("404");
});

export default appRouter;
