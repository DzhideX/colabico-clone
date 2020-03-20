import express from "express";
import dotenv from "dotenv";
import appRouter from "./router.mjs";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(appRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}!`);
});

// THE ROUTES THAT WE NEED ARE:
// ADDTODOSAGA - POST REQUEST -- ADDS A NEW TODO
// CHANGELISTNAMESAGA - PUT REQUEST -- UPDATE A LIST NAME
// DELETELISTSAGA - DELETE REQUEST -- DELETE A LIST
// DELETETODOSAGA - DELETE REQUEST -- DELETE A TODO
// LISTDATASAGA - GET REQUEST -- GET LIST DATA
// SETTODOSTATESAGA - PUT REQUEST -- UPDATE TODO STATE
// SETTODOVALUESAGA - PUT REQUEST -- UPDATE TODO VALUE
// TODOSSAGA && USERIDSAGA - GET REQUEST X2 -- GET TODOS AND USERID
