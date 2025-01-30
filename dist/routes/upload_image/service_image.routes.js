"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const functions_1 = require("../../functions");
const auth_file_1 = __importDefault(require("../../config/auth_file"));
const uploadServiceImageRoutes = (0, express_1.Router)();
const fileFilter = (req, file, cd) => {
    //this filter for check the ext of file using function imageUpload
    const imageName = file.originalname;
    const imageSize = file.size;
    const uploadResult = (0, functions_1.imageUpload)(imageName, imageSize);
    if (uploadResult.status === "success") {
        cd(null, true);
    }
    else {
        cd(
        //if the ext not accept it will make multer error with type and filed and that checkFileAuthentication will listen to it and Response the specific issues for it
        new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE", "File ext not valid"), false);
    }
};
const upload = (0, multer_1.default)({
    storage: (0, functions_1.storage)("C:/Users/mr_al/Desktop/my_project_node/src/upload/service_files/services_images"),
    fileFilter,
    limits: {
        fileSize: 2 * functions_1.MB,
    },
});
//: test,then put the image name in db with specific table for profile images
//done, service_images table has column image_name and this route will give you the imageName in server , so you can put it in the service_images table or update or any
uploadServiceImageRoutes.post("/", auth_file_1.default, (req, res) => {
    try {
        const imageName = req.file.filename;
        const imageSize = req.file.size;
        const count = (0, functions_1.imageUpload)(imageName, imageSize);
        res.send(count);
    }
    catch (error) {
        res.send(error);
    }
});
exports.default = uploadServiceImageRoutes;
