import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  imageUpload,
  insertData,
  storage,
  updateData,
  MB,
} from "../../functions";
import checkFileAuthentication from "../../config/auth_file";

const uploadProfileImageRoutes = Router();
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
export const upload = multer({
  storage: storage(
    "C:/Users/micro elyas/Desktop/my_project_node/src/upload/profile_files/profile_images",
  ),
  fileFilter,
  limits: {
    //only here we can check the size of file and if it not as defined so it will make error multer on checkFileAuthentication and Response it
    //cause we cannot access the file size in filter and send it to imageUpload function to check it
    //when we try only it has the size when file received that make to run the last else with print undefined imageSize ,
    //then return to the else if of imageSize and run it with print the correct size, we can fix it in the future
    fileSize: 2 * MB,
  },
});

//:: test,
//done, profile_p table has column profile_image and this route will give you the imageName in server , so you can put it in the profile table or update or any
//TODO: when we make the edit profile rout or edit service rout we should take the image name and check if the request has file
// so we will delete the image that send the imageName of it and then upload new image from file was send and take the new imageName and edit it in db
//if request do not has file just imageName that mean he dose not change the image so do not call uploadImage and do not change the name of image in db
uploadProfileImageRoutes.post(
  "/",
  checkFileAuthentication,
  async (req: Request, res: Response) => {
    try {
      const imageName = req.file!.filename;
      const imageSize = req.file!.size;
      const count = await imageUpload(imageName, imageSize);
      res.send(count);
    } catch (error) {
      res.send({
        status: "failure",
        message: "un valid ext",
      });
    }
  },
);

export default uploadProfileImageRoutes;
