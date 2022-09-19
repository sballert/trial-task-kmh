import express from "express";
import log from "./logger";

import routes from "./routes";

const host = "localhost";
const port = 3030;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);

  routes(app);
});

process.on("unhandledRejection", (reason, p) =>
  log.error("Unhandled Rejection at: Promise ", p, reason),
);
