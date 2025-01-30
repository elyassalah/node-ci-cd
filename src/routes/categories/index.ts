import { Router } from "express";
import viewCategories from "./view_category.routes";


const categoriesRoutes = Router();


categoriesRoutes.use("/categories/view", viewCategories);


export default categoriesRoutes;
