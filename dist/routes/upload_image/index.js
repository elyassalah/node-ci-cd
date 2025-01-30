"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_image_routes_1 = __importDefault(require("./profile_image.routes"));
const service_image_routes_1 = __importDefault(require("./service_image.routes"));
const uploadRoutes = (0, express_1.Router)();
uploadRoutes.use("/upload/profile-image", profile_image_routes_1.default);
uploadRoutes.use("/upload/service-image", service_image_routes_1.default);
exports.default = uploadRoutes;
