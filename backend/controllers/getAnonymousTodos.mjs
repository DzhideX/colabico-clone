import db from "../config/firebase.mjs";

const getAnonymousTodos = (req, response) => {
  let todos = [];
  db.collection("users")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        db.collection(`users/${doc.id}/lists`)
          .get()
          .then(res => {
            res.forEach(re => {
              if (re.id === req.params.listid) {
                console.log("found it!");
                db.collection(`users/${doc.id}/lists/${re.id}/todos`)
                  .get()
                  .then(querySnapshot => {
                    querySnapshot.docs.forEach(doc => {
                      if (doc.exists) {
                        todos.push({ ...doc.data(), id: doc.id });
                      }
                    });
                    response.json({
                      name: re.data().name,
                      todos
                    });
                  });
              }
            });
          });
      });
    });
};

export default getAnonymousTodos;
