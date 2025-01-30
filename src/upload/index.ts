import express, { Router } from "express";
import path from "path";
const fetchImage = Router();

const uploadDirectory = path.join(__dirname); //to give me the path to get the current directory and construct the correct path to the "upload" directory
//the bellow comment that when this code been in the root , but now this code in the index of upload so we just need the current dir path
//cause it has all images
fetchImage.use("/fetch", express.static(uploadDirectory));
fetchImage.use(
  "/fetch/profile-images", //the url request and add to it the name of image that will response the image
  express.static(`${uploadDirectory}/profile_files/profile_images`),
);
fetchImage.use(
  "/fetch/service-images", //the url request and add to it the name of image that will response the image
  express.static(`${uploadDirectory}/service_files/services_images`),
);
fetchImage.use(
  "/fetch/category-images", //the url request and add to it the name of image that will response the image
  express.static(`${uploadDirectory}/categories_files/category_images`),
);

export default fetchImage;
