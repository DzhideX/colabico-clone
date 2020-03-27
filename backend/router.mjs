import express from "express";
import {
  getListData,
  getUserTodos,
  getAnonymousTodos,
  addListViaName,
  addListViaValue,
  addTodo,
  changeListName,
  setTodoState,
  setTodoValue,
  deleteList,
  deleteTodo
} from "./controllers/index.mjs";

const appRouter = express.Router();

appRouter.get("/user/:userid/listdata", getListData);

appRouter.get("/user/:userid/list/:listid/todos", getUserTodos);

appRouter.get("/list/:listid/todos", getAnonymousTodos);

appRouter.post("/user/:userid/listname/:name", addListViaName);

appRouter.post("/user/:userid/listvalue/:value", addListViaValue);

appRouter.post("/user/:userid/list/:listid/todo/:todovalue", addTodo);

appRouter.put("/user/:userid/list/:listid/name/:name", changeListName);

appRouter.put(
  "/user/:userid/list/:listid/todo/:todoid/state/:state",
  setTodoState
);

appRouter.put(
  "/user/:userid/list/:listid/todo/:todoid/value/:value",
  setTodoValue
);

appRouter.delete("/user/:userid/list/:listid", deleteList);

appRouter.delete("/user/:userid/list/:listid/todo/:todoid", deleteTodo);

appRouter.get("*", (req, res) => {
  res.send("404");
});

export default appRouter;
