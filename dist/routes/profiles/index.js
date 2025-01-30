"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const view_profile_routes_1 = __importDefault(require("./view_profile.routes"));
const profile_details_routes_1 = __importDefault(require("./profile_details.routes"));
const profile_details2_routes_1 = __importDefault(require("./profile_details2.routes"));
const profileRoutes = (0, express_1.Router)();
//TODO: make the edit profile rout , and the request of upload image only working when the Request has file
profileRoutes.use("/profile/view", view_profile_routes_1.default);
profileRoutes.use("/profile/profile-details", profile_details_routes_1.default);
profileRoutes.use("/profile/profile-details2", profile_details2_routes_1.default);
exports.default = profileRoutes;
