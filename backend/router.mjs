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
  deleteTodo,
} from "./controllers/index.mjs";
import { Users, Tokens, Lists, Todos } from "./config/models.mjs";
import model from "./config/oauthModel.mjs";
import Oauth2Server from "oauth2-server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const appRouter = express.Router();
const oauth = new Oauth2Server({
  model: model,
  accessTokenLifetime: 60 * 60 * 24 * 30 * 12, //hopefully temporary solution
  allowBearerTokensInQueryString: true,
});

const Request = Oauth2Server.Request;
const Response = Oauth2Server.Response;

appRouter.get("/user/:userid/listdata", getListData);

appRouter.get("/user/:userid/list/:listid/todos", getUserTodos);

appRouter.get("/list/:listid/todos", getAnonymousTodos);

appRouter.post("/user/:userid", addListViaName);

appRouter.post("/user/:userid/listvalue/:value", addListViaValue);

appRouter.post("/user/:userid/list/:listid/todo/:todovalue", addTodo);

appRouter.put("/user/:userid/list/:listid", changeListName);

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

appRouter.post("/signup", (req, res) => {
  console.log(req.body);
  Users.findOne({
    attributes: ["email", "password", "id"],
    where: {
      email: req.body.email,
    },
  }).then((data) => {
    if (data) {
      console.log("such user exists");
      res.sendStatus(409);
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.sendStatus(409);
        } else {
          Users.create({ email: req.body.email, password: hash });
          res.sendStatus(200);
        }
      });
    }
  });
});

appRouter.post("/login", (req, res) => {
  const loginData = JSON.parse(Object.keys(req.body)[0]);
  req.body.username = loginData.username;
  req.body.password = loginData.password;
  req.body.grant_type = loginData.grant_type;
  Users.findOne({
    attributes: ["email", "password", "id"],
    where: {
      email: req.body.username,
    },
  }).then((data) => {
    if (data) {
      bcrypt.compare(
        req.body.password,
        data.dataValues.password,
        (err, result) => {
          if (result === true) {
            req.body.password = data.dataValues.password;
            let response = new Response(res);
            let request = new Request(req);
            oauth
              .token(request, response)
              .then((token) => {
                res.json(token.accessToken);
              })
              .catch((err) => res.status(err.code || 500).json(err));
          }
        }
      );
    }
  });
});

appRouter.get("/authorize", (req, res) => {
  let response = new Response(res);
  let request = new Request(req);

  oauth
    .authenticate(request, response)
    .then((token) => {
      res.json({ userId: token.userId, statusCode: 200 });
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});

appRouter.post("/deleteToken", (req, res) => {
  Tokens.destroy({
    where: {
      access_token: req.body.token,
    },
  })
    .then((rowDeleted) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

appRouter.post("/anonymous", (req, res) => {
  const loginData = JSON.parse(Object.keys(req.body)[0]);
  req.body.username = loginData.username;
  req.body.password = loginData.password;
  req.body.grant_type = loginData.grant_type;
  Users.create({ email: req.body.username, password: req.body.password }).then(
    (usersResponse) => {
      let response = new Response(res);
      let request = new Request(req);
      oauth
        .token(request, response)
        .then((token) => {
          res.json(token.accessToken);
        })
        .catch((err) => res.status(err.code || 500).json(err));
    }
  );
});

appRouter.post("/deleteAnonymous", (req, res) => {
  console.log("called");
  Tokens.findOne({
    where: {
      access_token: req.body.token,
    },
  }).then((tokenResponse) => {
    Tokens.destroy({
      where: {
        access_token: req.body.token,
      },
    })
      .then(() => {
        console.log(tokenResponse);
        Users.destroy({
          where: {
            id: tokenResponse.dataValues.user_id,
          },
        }).then(() => {
          Lists.findAll({
            where: {
              user_id: tokenResponse.dataValues.user_id,
            },
          }).then((listsResponse) => {
            listsResponse.forEach((list) => {
              Todos.destroy({
                where: {
                  list_id: list.dataValues.id,
                },
              });
            });
            Lists.destroy({
              where: {
                user_id: tokenResponse.dataValues.user_id,
              },
            });
          });
          res.sendStatus(200);
        });
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  });
});

appRouter.get("*", (req, res) => {
  res.json({
    status: 404,
  });
});

export default appRouter;
