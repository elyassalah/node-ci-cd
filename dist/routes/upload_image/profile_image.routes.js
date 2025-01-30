"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const functions_1 = require("../../functions");
const auth_file_1 = __importDefault(require("../../config/auth_file"));
const uploadProfileImageRoutes = (0, express_1.Router)();
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
exports.upload = (0, multer_1.default)({
    storage: (0, functions_1.storage)("C:/Users/mr_al/Desktop/my_project_node/src/upload/profile_files/profile_images"),
    fileFilter,
    limits: {
        //only here we can check the size of file and if it not as defined so it will make error multer on checkFileAuthentication and Response it
        //cause we cannot access the file size in filter and send it to imageUpload function to check it
        //when we try only it has the size when file received that make to run the last else with print undefined imageSize ,
        //then return to the else if of imageSize and run it with print the correct size, we can fix it in the future
        fileSize: 2 * functions_1.MB,
    },
});
//:: test,
//done, profile_p table has column profile_image and this route will give you the imageName in server , so you can put it in the profile table or update or any
//TODO: when we make the edit profile rout or edit service rout we should take the image name and check if the request has file
// so we will delete the image that send the imageName of it and then upload new image from file was send and take the new imageName and edit it in db
//if request do not has file just imageName that mean he dose not change the image so do not call uploadImage and do not change the name of image in db
uploadProfileImageRoutes.post("/", auth_file_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageName = req.file.filename;
        const imageSize = req.file.size;
        const count = (0, functions_1.imageUpload)(imageName, imageSize);
        res.send(count);
    }
    catch (error) {
        res.send({
            status: "failure",
            message: "un valid ext",
        });
    }
}));
exports.default = uploadProfileImageRoutes;
