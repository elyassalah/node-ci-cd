"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manipulate_service_incart_routes_1 = __importDefault(require("./manipulate_service_incart.routes"));
const delete_cart_routes_1 = __importDefault(require("./delete_cart.routes"));
const delete_service_in_cart_routes_1 = __importDefault(require("./delete_service_in_cart.routes"));
const view_cart_routes_1 = __importDefault(require("./view_cart.routes"));
const add_to_cart_routes_1 = __importDefault(require("./add_to_cart.routes"));
const cartRoutes = (0, express_1.Router)();
cartRoutes.use("/cart/add", add_to_cart_routes_1.default);
cartRoutes.use("/cart/manipulate", manipulate_service_incart_routes_1.default);
cartRoutes.use("/cart/delete-cart", delete_cart_routes_1.default);
cartRoutes.use("/cart/delete-service-in-cart", delete_service_in_cart_routes_1.default);
cartRoutes.use("/cart/view", view_cart_routes_1.default);
exports.default = cartRoutes;
