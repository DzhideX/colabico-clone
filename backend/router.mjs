import express from "express";
import getListData from "./controllers/getListData.mjs";
import getUserTodos from "./controllers/getUserTodos.mjs";
import getAnonymousTodos from "./controllers/getAnonymousTodos.mjs";
import addListViaName from "./controllers/addListViaName.mjs";
import addListViaValue from "./controllers/addListViaValue.mjs";
import addTodo from "./controllers/addTodo.mjs";
import changeListName from "./controllers/changeListName.mjs";
import setTodoState from "./controllers/setTodoState.mjs";
import setTodoValue from "./controllers/setTodoValue.mjs";
import deleteList from "./controllers/deleteList.mjs";
import deleteTodo from "./controllers/deleteTodo.mjs";

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
