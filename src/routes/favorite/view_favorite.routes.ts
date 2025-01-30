import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";

const viewFavorite = Router();
type AllData = {
  status: string;
  data: [];
  message: string;
};
viewFavorite.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    const allData: AllData = {
      status: "failure",
      data: [],
      message: " ",
    };
    const count = await getAllData({
      _table: "favorite",
      where: "user_id = ?",
      values: [userId],
      returnJson: true,
    });
    if (count.status === "success") {
      let profileIds: number[] = [];
      count.data.forEach((element: { profile_id: number }) => {
        profileIds.push(element.profile_id);
      });
      const placeholders = profileIds.map(() => "?").join(", ");
      let getAllProfile = await getAllData({
        _table: "profile_view",
        where: `profile_id IN (${placeholders})`,
        values: profileIds,
        returnJson: false,
      });
      allData.status = "success";
      allData.data = getAllProfile;
      res.send(allData);
    } else {
      allData.message = "no items in favorite";
      res.send(allData);
    }
  } catch (error) {
    res.send({
      status: "success",
      data: { message: error },
    });
  }
});

export default viewFavorite;
