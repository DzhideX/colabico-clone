import express from "express";
import dotenv from "dotenv";
import appRouter from "./router.mjs";
import cors from "cors";
import redis from "redis";

dotenv.config();
const app = express();
const client = redis.createClient();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRouter);
client.on("error", (err) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`server is up on port ${process.env.PORT}!`);
});

export default client;
