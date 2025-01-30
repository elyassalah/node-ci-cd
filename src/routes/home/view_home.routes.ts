import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";
import { pool2 } from "../../config/db.connection";
import { ResultSetHeader } from "mysql2";
const cacheService = require("express-api-cache");
let cache = cacheService.cache;

const homeView = Router();

homeView.post("/", async (req: Request, res: Response) => {
  try {
    const userId: number = req.body.user_id;

    let data: { status: string; categories: [{}]; profiles: [{}] } = {
      status: "",
      categories: [{}],
      profiles: [{}],
    };
    data.status = "success";
    const count_1 = await getAllData({
      _table: "categories",
      returnJson: false,
    });
    data.categories = count_1;
    // data.profiles = await getAllData({
    //   _table: "profile_view",
    //   where: "1",
    //   returnJson: false,
    // });
    //the changes bellow its for return the profile with favorite column for each user different
    //so we make the specific query that add favorite column to the profile_view and put value of it depend
    //on if profile in favorite table of this user , so we must send the user id to request
    let catIds: number[] = [];
    count_1.forEach((element: { categories_id: number }) => {
      catIds.push(element.categories_id);
    });
    const placeholders = catIds.map(() => "?").join(", ");
    // console.log(catIds);

    let stmt: string;
    stmt = `
    SELECT profile_view.* , 1 AS favorite FROM profile_view
    INNER JOIN favorite ON favorite.profile_id = profile_view.profile_id AND favorite.user_id = ?
 
    UNION ALL
    SELECT * , 0 AS favorite FROM profile_view
    WHERE  profile_view.profile_id NOT IN (SELECT profile_view.profile_id FROM profile_view
    INNER JOIN favorite ON favorite.profile_id = profile_view.profile_id AND favorite.user_id = ?)`;

    const connection = await pool2.getConnection();
    const values = [userId, userId];
    // the output of values is [ '27', [ 2, 3, 4, 5 ], [ 2, 3, 4, 5 ], '27' ]
    // we wanna to be like this to can query run [ '27', ' 2',' 3', '4',' 5' , ' 2', '3',' 4', '5 ', '27' ]
    //the bellow statement is for make it like what we wanna
    // const flattenedValues = values.flat().map((value) => String(value));
    // console.log(flattenedValues);

    const [result] = await connection.execute<[ResultSetHeader]>(stmt, values);

    const count = result.length;
    if (count > 0) {
      data.profiles = result;
      // const data = {
      //   status: "success",
      //   data: result,
      // };
      connection.release();
      res.send(data);
    } else {
      const data = {
        status: "failure",
      };
      connection.release();
      res.send(data);
    }
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default homeView;
