import { Router } from "express";
import uploadProfileImageRoutes from "./profile_image.routes";
import uploadServiceImageRoutes from "./service_image.routes";

const uploadRoutes = Router();
uploadRoutes.use("/upload/profile-image", uploadProfileImageRoutes);
uploadRoutes.use("/upload/service-image", uploadServiceImageRoutes);


export default uploadRoutes;
