"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const path_1 = __importDefault(require("path"));
const fetchImage = (0, express_1.Router)();
const uploadDirectory = path_1.default.join(__dirname); //to give me the path to get the current directory and construct the correct path to the "upload" directory
//the bellow comment that when this code been in the root , but now this code in the index of upload so we just need the current dir path
//cause it has all images
fetchImage.use("/fetch", express_1.default.static(uploadDirectory));
fetchImage.use("/fetch/profile-images", //the url request and add to it the name of image that will response the image
express_1.default.static(`${uploadDirectory}/profile_files/profile_images`));
fetchImage.use("/fetch/service-images", //the url request and add to it the name of image that will response the image
express_1.default.static(`${uploadDirectory}/service_files/services_images`));
fetchImage.use("/fetch/category-images", //the url request and add to it the name of image that will response the image
express_1.default.static(`${uploadDirectory}/categories_files/category_images`));
exports.default = fetchImage;
