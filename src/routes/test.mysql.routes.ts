import mysql from "mysql";
import { Router, Request, Response } from "express";
import pool from "../config/db.connection";

const testDbConnect = Router();

testDbConnect.get("/info", (request: Request, response: Response) => {
  console.log("iam in api");
  pool.getConnection((errorConnection: any, conn: mysql.PoolConnection) => {
    console.log("iam in pool connection");

    if (errorConnection) {
      response.send({
        success: false,
        statusCode: 500,
        message: "error duging connection",
        data: errorConnection,
      });
    } else {
      console.log("iam in query");
      conn.query(
        "SELECT * FROM services",
        function (errQuery: any, result: any) {
          if (errQuery) {
            conn.release();
            return response.send({
              success: false,
              statusCode: 400,
              message: "error in query",
              data: errQuery,
            });
          }
          response.send(result);
          conn.release();
        },
      );
    }
  });
});

export default testDbConnect;
