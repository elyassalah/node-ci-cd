import { Router, Request, Response } from "express";
import {
  deleteData,
  getAllData,
  getData,
  insertData,
  updateData,
} from "../../functions";

const testCrud = Router();

testCrud.get("/getAll", async (req: Request, res: Response) => {
  try {
    const count = await getAllData({ _table: "services", returnJson: true });
    res.send(count);
  } catch (error) {
    res.send(error);
  }
  // getAllData("services", null, null, true, (errConnection, errQuery, row) => {
  //   if (errConnection) {
  //     res.send(errConnection);
  //   } else if (errQuery) {
  //     res.send(errQuery);
  //   } else {
  //     res.send(row);
  //   }
  // });
});
testCrud.get("/getData", async (req: Request, res: Response) => {
  try {
    const count = await getData("services", "services_id = ?", [45], true);
    res.send(count);
  } catch (error) {
    res.send(error);
  }
  // getData(
  //   "services",
  //   "services_id = ?",
  //   [1],
  //   true,
  //   (errConnection, errQuery, row) => {
  //     if (errConnection) {
  //       res.send(errConnection);
  //     } else if (errQuery) {
  //       res.send(errQuery);
  //     } else {
  //       res.send(row);
  //     }
  //   },
  // );
});

testCrud.put("/insert", async (request: Request, response: Response) => {
  try {
    const tableName = "cart";
    const info = {
      user_id: request.body.id,
    };
    const count = await insertData(tableName, info, true);
    response.send(count);
  } catch (error) {
    response.send(error);
  }
});
testCrud.post("/upDate", async (request: Request, response: Response) => {
  try {
    const tableName = "cart";
    const info = {
      user_id: request.body.id,
    };
    const count = await updateData(tableName, info, "user_id = ?", [2], true);
    response.send(count);
  } catch (error) {
    response.send(error);
  }
});

testCrud.post("/delete", async (request: Request, response: Response) => {
  try {
    const tableName = "cart";
    const count = await deleteData(tableName, "user_id = ?", [12], false);
    response.send({
      count: count,
    });
  } catch (error) {
    response.send({
      count: error,
    });
  }
});

export default testCrud;
