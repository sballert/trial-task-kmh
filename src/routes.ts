import { Express, Request, Response } from "express";

import { getProductsForCustomer } from "./controller";

export default function (app: Express): void {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/api/getProductsForCustomer", getProductsForCustomer);
}
