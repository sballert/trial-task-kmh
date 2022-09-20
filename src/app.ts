import log from "./logger";
import createServer from "./server";

const host = "localhost";
const port = 3030;
const app = createServer();

process.on("unhandledRejection", (reason, p) =>
  log.error("Unhandled Rejection at: Promise ", p, reason),
);

app.listen(port, host, () => {
  log.info(`Server listing at http://${host}:${port}`);
});

export { app };
