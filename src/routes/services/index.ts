import { Router } from "express";
import serviceImagesRoutes from "./service_image.routes";
import serviceInputDesignRoutes from "./service_input_design.routes";

const serviceRoutes = Router();

serviceRoutes.use("/service/images", serviceImagesRoutes);
serviceRoutes.use("/service/input-design", serviceInputDesignRoutes);


export default serviceRoutes;
