import { Router, Request, Response } from "express";
import multer from "multer";
import { MB, imageUpload, storage } from "../../functions";
import checkFileAuthentication from "../../config/auth_file";

const uploadServiceImageRoutes = Router();
const fileFilter = (req: any, file: any, cd: any) => {
  //this filter for check the ext of file using function imageUpload
  const imageName = file.originalname;
  const imageSize: number = file.size;
  const uploadResult = imageUpload(imageName, imageSize);
  if (uploadResult.status === "success") {
    cd(null, true);
  } else {
    cd(
      //if the ext not accept it will make multer error with type and filed and that checkFileAuthentication will listen to it and Response the specific issues for it
      new multer.MulterError("LIMIT_UNEXPECTED_FILE", "File ext not valid"),
      false,
    );
  }
};
const upload = multer({
  storage: storage(
    "C:/Users/micro elyas/Desktop/my_project_node/src/upload/service_files/services_images",
  ),
  fileFilter,
  limits: {
    fileSize: 2 * MB,
  },
});
//: test,then put the image name in db with specific table for profile images
//done, service_images table has column image_name and this route will give you the imageName in server , so you can put it in the service_images table or update or any

uploadServiceImageRoutes.post(
  "/",
  checkFileAuthentication,

  (req: Request, res: Response) => {
    try {
      const imageName = req.file!.filename;
      const imageSize = req.file!.size;
      const count = imageUpload(imageName, imageSize);
      res.send(count);
    } catch (error) {
      res.send(error);
    }
  },
);

export default uploadServiceImageRoutes;
