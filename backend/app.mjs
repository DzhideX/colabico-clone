import express from "express";
import dotenv from "dotenv";
import appRouter from "./router.mjs";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}!`);
});
