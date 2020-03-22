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
// DELETELISTSAGA - DELETE REQUEST -- DELETE A LIST
// DELETETODOSAGA - DELETE REQUEST -- DELETE A TODO
