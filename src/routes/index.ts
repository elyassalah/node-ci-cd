import { Router } from "express";
import testDbConnect from "./test.mysql.routes";

const routes = Router();

routes.use("/test-db", testDbConnect);

export default routes;
