import { Router } from "express";
import manipulateServiceInCart from "./manipulate_service_incart.routes";
import deleteCart from "./delete_cart.routes";
import deleteServiceInCart from "./delete_service_in_cart.routes";
import viewCart from "./view_cart.routes";
import addToCart from "./add_to_cart.routes";
const cartRoutes = Router();
cartRoutes.use("/cart/add", addToCart);
cartRoutes.use("/cart/manipulate", manipulateServiceInCart);
cartRoutes.use("/cart/delete-cart", deleteCart);
cartRoutes.use("/cart/delete-service-in-cart", deleteServiceInCart);
cartRoutes.use("/cart/view", viewCart);

export default cartRoutes;
