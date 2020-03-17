const express = require("express");
const dotenv = require("dotenv");
const { db } = require("./config/firebase");

dotenv.config();
const app = express();

app.get("/user/:userid/listdata", (req, res) => {
  let Arr = [];
  db.collection(`users/${req.params.userid}/lists`)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach((doc, i) => {
        db.collection(`users/${req.params.userid}/lists/${doc.id}/todos`)
          .get()
          .then(snapshotTwo => {
            let tempObj = {
              name: doc.data() ? doc.data().name : "",
              lastTodo: snapshotTwo.docs[snapshotTwo.docs.length - 1]
                ? snapshotTwo.docs[snapshotTwo.docs.length - 1].data().value
                : "",
              numberOfTodos: snapshotTwo.docs.length,
              id: doc.id
            };
            Arr.push(tempObj);
          })
          .then(() => {
            if (Arr.length === snapshot.docs.length) {
              // resolve(Arr);
              let tempString = "List names from that user: ";
              Arr.map((list, i) => {
                tempString += `\nName: ${list.name}, last todo: ${list.lastTodo}, id: ${list.id}`;
              });
              res.send(Arr);
              // res.json(Arr);
            }
          });
      });
    });
});

app.get("*", (req, res) => {
  res.send("404");
});

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}!`);
});

// THE ROUTES THAT WE NEED ARE:
// ADDLISTSAGA - POST REQUEST -- ADDS A NEW LIST
// ADDTODOSAGA - POST REQUEST -- ADDS A NEW TODO
// CHANGELISTNAMESAGA - PUT REQUEST -- UPDATE A LIST NAME
// DELETELISTSAGA - DELETE REQUEST -- DELETE A LIST
// DELETETODOSAGA - DELETE REQUEST -- DELETE A TODO
// LISTDATASAGA - GET REQUEST -- GET LIST DATA
// SETTODOSTATESAGA - PUT REQUEST -- UPDATE TODO STATE
// SETTODOVALUESAGA - PUT REQUEST -- UPDATE TODO VALUE
// TODOSSAGA && USERIDSAGA - GET REQUEST X2 -- GET TODOS AND USERID
