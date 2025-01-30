import { Router } from "express";
import addToFavorite from "./add_to_favorite.routes";
import deleteFromFavorite from "./delete_from_favorite.routes";
import viewFavorite from "./view_favorite.routes";

const favoriteRoutes = Router();
favoriteRoutes.use("/favorite/add", addToFavorite);
favoriteRoutes.use("/favorite/delete-from-favorite", deleteFromFavorite);
favoriteRoutes.use("/favorite/view", viewFavorite);

export default favoriteRoutes;
