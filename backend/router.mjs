import express from "express";
import getListData from "./controllers/getListData.mjs";
import getUserTodos from "./controllers/getUserTodos.mjs";
import getAnonymousTodos from "./controllers/getAnonymousTodos.mjs";

const appRouter = express.Router();

appRouter.get("/user/:userid/listdata", getListData);

appRouter.get("/user/:userid/list/:listid/todos", getUserTodos);

appRouter.get("/list/:listid/todos", getAnonymousTodos);

appRouter.get("*", (req, res) => {
  res.send("404");
});

export default appRouter;
