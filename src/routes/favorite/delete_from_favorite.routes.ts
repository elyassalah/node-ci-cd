import { Router, Request, Response } from "express";
import { deleteData, getData } from "../../functions";

const deleteFromFavorite = Router();
type AllData = {
  status: string;
  data: {
    message: string;
  };
};
deleteFromFavorite.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;
    const profileId: number = req.body.profile_id;
    const allData: AllData = {
      status: "failure",
      data: {
        message: "something error",
      },
    };
    const del = await deleteData(
      "favorite",
      "user_id = ? AND profile_id = ?",
      [userId, profileId],
      false,
    );
    if (del > 0) {
      allData.status = "success";
      allData.data.message = " deleted successful";
      res.send(allData);
    } else {
      //also if any id error will enter here
      allData.data.message = "error on delete";
      res.send(allData);
    }
  } catch (error) {
    res.send({
      status: "failure",
      data: { message: error },
    });
  }
});

export default deleteFromFavorite;
