import { Pool, createPool } from "mysql2/promise";
import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

export var pool2: Pool = createPool({
  host: process.env.HOST,
  port: parseInt(`${process.env.PORT_DATABASE}`),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
  namedPlaceholders: true,
});
var pool = mysql.createPool({
  host: process.env.HOST,
  port: parseInt(`${process.env.PORT_DATABASE}`),
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
});
export default pool;
