import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";

const serviceImagesRoutes = Router();

serviceImagesRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const serviceId: number = req.body.service_id;
    const count = await getAllData({
      _table: "service_images",
      where: "image_serviceId = ?",
      values: [serviceId],
      returnJson: true,
    });
    res.send(count);
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default serviceImagesRoutes;
