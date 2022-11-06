import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>("port");
const hostname = config.get<string>("hostname");

const app = express();
app.use(express.json()); // middleware to parse all the request 

app.listen(port, async () => {
  logger.info(`app server running : http://${hostname}:${port}`);
  await connect();
  routes(app);
});
