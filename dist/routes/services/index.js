"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_image_routes_1 = __importDefault(require("./service_image.routes"));
const service_input_design_routes_1 = __importDefault(require("./service_input_design.routes"));
const serviceRoutes = (0, express_1.Router)();
serviceRoutes.use("/service/images", service_image_routes_1.default);
serviceRoutes.use("/service/input-design", service_input_design_routes_1.default);
exports.default = serviceRoutes;
