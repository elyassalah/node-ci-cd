import { Router, Request, Response } from "express";
import { getAllData } from "../../functions";
import { pool2 } from "../../config/db.connection";
import { ResultSetHeader } from "mysql2";

const profile = Router();

profile.post("/", async (req: Request, res: Response) => {
  try {
    //here we do not need to send the favorite column cause here we use this route
    //in category so will have the favorite from before when home load 
    //...so reverse the edit here
    const categoriesId: number = req.body.categoriesid;
    // const userId: number = req.body.user_id;

    const count = await getAllData({
      _table: "profile_view",
      where: "`profile_categorie` =?",
      values: [categoriesId],
      returnJson: true,
    });
    res.send(count);
    // let stmt: string;
    // stmt = `
    // SELECT profile_view.* , 1 AS favorite FROM profile_view
    // INNER JOIN favorite ON favorite.profile_id = profile_view.profile_id AND favorite.user_id = ?
    // WHERE profile_view.categories_id = ?
    // UNION ALL
    // SELECT * , 0 AS favorite FROM profile_view 
    // WHERE profile_view.categories_id = ? AND profile_view.profile_id NOT IN (SELECT profile_view.profile_id FROM profile_view 
    // INNER JOIN favorite ON favorite.profile_id = profile_view.profile_id AND favorite.user_id = ?)`;

    // const connection = await pool2.getConnection();
    // const values = [userId, categoriesId, categoriesId, userId];
    // const [result] = await connection.execute<[ResultSetHeader]>(stmt, values);
    // const count = result.length;
    // if (count > 0) {
    //   const data = {
    //     status: "success",
    //     data: result,
    //   };
    //   connection.release();
    //   res.send(data);
    // } else {
    //   const data = {
    //     status: "failure",
    //   };
    //   connection.release();
    //   res.send(data);
    // }
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default profile;
