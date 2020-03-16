const express = require("express");
const dotenv = require("dotenv");
const firestore = require("./config/firebase");

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  firestore.db
    .collection("users")
    .get()
    .then(docRef => {
      let html = `There are ${docRef.docs.length} user in our database, and their ids are: `;
      docRef.docs.map(user => {
        html += `${user.id}, `;
      });
      res.send(html);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}!`);
});
