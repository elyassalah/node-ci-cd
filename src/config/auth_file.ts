import { Request, Response, NextFunction } from "express";
import { imageUpload } from "../functions";
import { upload } from "../routes/upload_image/profile_image.routes";
import multer from "multer";
//this is middleware that take the request upload single then check if there any error on multer or server then if no error so give ability to go 
//to next and continue the request either it will stop and show you error and no upload anything
const checkFileAuthentication: any = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.send({
        status: "failure",
        message: err.message != "Unexpected field" ? err.message : err.field,
      });
    } else if (err) {
      res.send({
        status: "failure",
        message: "Internal server error",
      });
    } else {
      next();
    }
  });
};

export default checkFileAuthentication;
