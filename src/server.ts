import express from "express";
import routes from "./routes";

function createServer(): any {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  routes(app);

  return app;
}

export default createServer;
