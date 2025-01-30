import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";

const searchProfile = Router();

searchProfile.post("/", async (req: Request, res: Response) => {
  try {
    const search: string = req.body.search;
    const count = await getAllData({
      _table: "profile_view",
      where: `profile_name_ar LIKE '%${search}%' OR profile_name_en LIKE '%${search}%' 
      OR profile_description_ar LIKE '%${search}%' OR profile_description_en LIKE '%${search}%'`,
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

export default searchProfile;
