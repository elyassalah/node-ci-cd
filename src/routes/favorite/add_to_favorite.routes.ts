import { Router, Request, Response } from "express";
import { getData, insertData } from "../../functions";

const addToFavorite = Router();
type AllData = {
  status: string;
  data: {
    message: string;
  };
};
addToFavorite.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    const profileId: number = req.body.profile_id;
    const allData: AllData = {
      status: "failure",
      data: {
        message: "something error",
      },
    };
    const checkFavorite = await getData(
      "favorite",
      "user_id = ? AND profile_id = ?",
      [userId, profileId],
      false,
    );
    if (checkFavorite === "failure") {
      const data = {
        user_id: userId,
        profile_id: profileId,
      };
      const count = await insertData("favorite", data, false);
      if (count > 0) {
        allData.status = "success";
        allData.data.message = "insert successful";
        res.send(allData);
      } else {
        //here if user id or profile id not exist will enter here
        allData.data.message = "error on insert favorite";
        res.send(allData);
      }
    } else {
      allData.data.message = "already added to favorite";
      res.send(allData);
    }
  } catch (error) {
    res.send({
      status: "failure",
      data: { message: error },
    });
  }
});

export default addToFavorite;
