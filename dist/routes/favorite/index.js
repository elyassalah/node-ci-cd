"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const add_to_favorite_routes_1 = __importDefault(require("./add_to_favorite.routes"));
const delete_from_favorite_routes_1 = __importDefault(require("./delete_from_favorite.routes"));
const view_favorite_routes_1 = __importDefault(require("./view_favorite.routes"));
const favoriteRoutes = (0, express_1.Router)();
favoriteRoutes.use("/favorite/add", add_to_favorite_routes_1.default);
favoriteRoutes.use("/favorite/delete-from-favorite", delete_from_favorite_routes_1.default);
favoriteRoutes.use("/favorite/view", view_favorite_routes_1.default);
exports.default = favoriteRoutes;
