import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";
const cacheService = require("express-api-cache");
let cache = cacheService.cache;

const viewCategories = Router();
viewCategories.get(
  "/",
  cache("30 minutes"),
  async (req: Request, res: Response) => {
    try {
      const count = await getAllData({
        _table: "categories",
      });
      res.send(count);
    } catch (error) {
      res.send({
        status: "failure",
        message: error,
      });
    }
  },
);

export default viewCategories;
