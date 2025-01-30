import { Router } from "express";
import homeView from "./view_home.routes";

const homeRoutes = Router();

homeRoutes.use("/home/view", homeView);

export default homeRoutes;
