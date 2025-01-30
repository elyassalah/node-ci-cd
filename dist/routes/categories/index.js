"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const view_category_routes_1 = __importDefault(require("./view_category.routes"));
const categoriesRoutes = (0, express_1.Router)();
categoriesRoutes.use("/categories/view", view_category_routes_1.default);
exports.default = categoriesRoutes;
