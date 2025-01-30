"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_image_routes_1 = require("../routes/upload_image/profile_image.routes");
const multer_1 = __importDefault(require("multer"));
//this is middleware that take the request upload single then check if there any error on multer or server then if no error so give ability to go 
//to next and continue the request either it will stop and show you error and no upload anything
const checkFileAuthentication = (req, res, next) => {
    profile_image_routes_1.upload.single("image")(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            res.send({
                status: "failure",
                message: err.message != "Unexpected field" ? err.message : err.field,
            });
        }
        else if (err) {
            res.send({
                status: "failure",
                message: "Internal server error",
            });
        }
        else {
            next();
        }
    });
};
exports.default = checkFileAuthentication;
