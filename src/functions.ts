import { ResultSetHeader } from "mysql2/promise";
import * as validator from "validator";
import { pool2 } from "./config/db.connection";
import multer from "multer";
import * as fs from "fs";

export const MB: number = 1048576;

export function filterRequest(requestData: any): any {
  const checkData: any = validator.default.escape(requestData);
  return checkData;
}

//replace to promise using mysql2
export async function getAllData({
  _table,
  where = null,
  values = null,
  returnJson = true,
}: {
  _table: string;
  where?: string | null;
  values?: any | null;
  returnJson?: boolean;
}): Promise<number | any> {
  try {
    let stmt: string;
    if (where === null) {
      stmt = `SELECT * FROM ${_table}`;
    } else {
      stmt = `SELECT * FROM ${_table} WHERE ${where}`;
    }
    const connection = await pool2.getConnection();
    const [result] = await connection.execute<[ResultSetHeader]>(stmt, values);
    const count = result.length;
    if (returnJson === true) {
      if (count > 0) {
        const data = {
          status: "success",
          data: result,
        };
        connection.release();
        return data;
      } else {
        const data = {
          status: "failure",
        };
        connection.release();
        return data;
      }
    } else {
      connection.release();
      if (count > 0) {
        return result;
      } else {
        return "failure";
      }
    }
  } catch (error) {
    if (returnJson === true) {
      let data = {
        status: "failure",
        message: error,
      };
      return data;
    } else {
      return error;
    }
  }
  // pool.getConnection((err: any, conn: mysql.PoolConnection) => {
  //   if (err) {
  //     resultQuery(err, null, null);
  //   } else {
  //     let stmt = `SELECT * FROM ${table} WHERE ${where}`;
  //     conn.query(stmt, values, (err: any, row: any) => {
  //       if (err) {
  //         conn.release();
  //         if (returnJson === true) {
  //           let data = {
  //             status: "success",
  //             data: err,
  //           };
  //           resultQuery(null, data, null);
  //         } else {
  //           resultQuery(null, err, null);
  //         }
  //       } else {
  //         let row2 = row;
  //         conn.release();
  //         if (returnJson === true) {
  //           let data = {
  //             status: "success",
  //             data: row2,
  //           };
  //           resultQuery(null, data, null);
  //         } else {
  //           resultQuery(null, null, row2);
  //         }
  //       }
  //     });
  //   }
  // });
}

//using callback function but:
// Callbacks are functions that are passed as arguments to another function
// and are executed after the completion of that function.
// Callbacks can lead to a pattern called "callback hell" or "pyramid of doom"
//  when dealing with multiple asynchronous operations.
//replace to promise using mysql2
export async function getData(
  _table: string,
  _where: string | null,
  _values: [...any] | null,
  returnJson: boolean = true,
): Promise<number | any> {
  const stmt = `SELECT * FROM ${_table} WHERE ${_where} LIMIT 1`;
  try {
    const connection = await pool2.getConnection();
    const [result] = await connection.execute<[ResultSetHeader]>(stmt, _values);
    const count = result.length;
    if (returnJson === true) {
      if (count > 0) {
        const data = {
          status: "success",
          data: result,
        };
        connection.release();
        return data;
      } else {
        connection.release();

        const data = {
          status: "failure",
        };
        return data;
      }
    } else {
      connection.release();
      if (count > 0) {
        return result;
      } else {
        return "failure";
      }
    }
  } catch (error) {
    if (returnJson === true) {
      let data = {
        status: "failure",
        message: error,
      };
      return data;
    } else {
      return error;
    }
  }
  // pool.getConnection((err: any, conn: mysql.PoolConnection) => {
  //   if (err) {
  //     resultQuery(err, null, null);
  //   } else {
  //     let stmt = `SELECT * FROM ${table} WHERE ${where} LIMIT 1`;
  //     conn.query(stmt, values, (err: any, row: any) => {
  //       if (err) {
  //         conn.release();
  //         if (returnJson === true) {
  //           let data = {
  //             status: "failure",
  //             data: err,
  //           };
  //           resultQuery(null, data, null);
  //         } else {
  //           resultQuery(null, err, null);
  //         }
  //       } else {
  //         let row2 = row;
  //         conn.release();
  //         if (returnJson === true) {
  //           let data = {
  //             status: "success",
  //             data: row2,
  //           };
  //           resultQuery(null, data, null);
  //         } else {
  //           resultQuery(null, null, row2);
  //         }
  //       }
  //     });
  //   }
  // });
}

//using promises and
// Promises provide a cleaner and more structured way to handle
// asynchronous operations. They allow you to chain multiple asynchronous
// operations together, and they offer better
// error handling through the .then() and .catch() methods.
// Promises also support the async/await syntax,
//  making code more readable and maintainable.
//mysql2 has promise emplictily on pool.execute  and its accept named placeholder
//but mysql not accept named placeholder just (?)
export async function insertData(
  table: string,
  data: Record<string, any>,
  returnJson: boolean = true,
): Promise<number | any> {
  const fields = Object.keys(data).join(",");
  const values = Object.keys(data)
    .map((field) => `:${field}`)
    .join(",");
  const stmt = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
  try {
    //here pool2 its from mysql2/promise so its not has any callback
    //its use with it await and try catch fo any error occur
    const connection = await pool2.getConnection();
    //here we use mysql2 for promise and its implicitly on execute adn use
    //ResultSetHeader as a type of execute to take the affected affectedRows
    const [result] = await connection.execute<ResultSetHeader>(stmt, data);
    //     <ResultSetHeader> type is specified to indicate the expected
    //     result type (an object that includes information about the affected rows).
    const count = result.affectedRows;
    if (returnJson === true) {
      let data = {
        status: count > 0 ? "success" : "failure",
      };
      connection.release();
      return data;
    } else {
      connection.release();
      return count;
    }
  } catch (error) {
    if (returnJson === true) {
      let data = {
        status: "failure",
        message: error,
      };
      return data;
    } else {
      return error;
    }
  }
}
export async function updateData(
  _table: string,
  _data: Record<string, any>,
  _where: string,
  whereValues: [any],
  returnJson: boolean = true,
): Promise<number | any> {
  const cols: string[] = [];
  const vals: any[] = [];
  for (const [key, val] of Object.entries(_data)) {
    vals.push(val);
    cols.push(`\`${key}\` = ?`);
  }
  const stmt = `UPDATE ${_table} SET ${cols.join(", ")} WHERE ${_where}`;
  try {
    const connection = await pool2.getConnection();
    const [result] = await connection.execute<ResultSetHeader>(stmt, [
      ...vals,
      ...whereValues,
    ]);
    const count = result.affectedRows;
    if (returnJson === true) {
      const data = {
        status: count > 0 ? "success" : "failure",
      };
      connection.release();
      return data;
    } else {
      connection.release();
      return count;
    }
  } catch (error) {
    if (returnJson === true) {
      let data = {
        status: "failure",
        message: error,
      };
      return data;
    } else {
      return error;
    }
  }
}

export async function deleteData(
  _table: string,
  _where: string,
  values: any,
  returnJson: boolean = true,
): Promise<number | any> {
  const stmt = `DELETE FROM ${_table} WHERE ${_where}`;
  const connection = await pool2.getConnection();
  const [result] = await connection.execute<ResultSetHeader>(stmt, values);
  const count = result.affectedRows;
  if (returnJson === true) {
    const data = {
      status: count > 0 ? "success" : "failure",
    };
    connection.release();
    return data;
  } else {
    connection.release();

    return count;
  }
}
// export default getAllData;
// export default getAllData;
/////////////////////////////////////////////
export const storage = (path: string) =>
  multer.diskStorage({
    destination: path,
    filename: function (req, file, cd) {
      cd(
        null,
        `${Math.floor(Math.random() * 9000) + 1000}${file.originalname}`,
      );
    },
  });

export function imageUpload(imageName: string, imageSize: number): any {
  // Assuming there is a global variable 'msgError' defined somewhere
  var messageError;
  const allowExt: string[] = ["jpg", "png", "gif", "mp3", "pdf"];

  const strToArray: string[] = imageName.split(".");
  //ext will be in the last of string cause it maybe has more dots but in the last dot after that will be the ext of file
  // so we split the string in array on every dot and take the last index that has the ext
  const ext: string = strToArray[strToArray.length - 1].toLowerCase();

  if (!imageName || !allowExt.includes(ext)) {
    // Assuming msgError is a global variable
    const data = {
      status: "failure",
      message: "Invalid file extension",
    };

    return data;
  } else {
    const data = {
      status: "success",
      imageName: imageName,
    };
    return data;
  }
}

export function deleteFile(dir: string, imageName: string): Promise<void> {
  // reject and resolve , that doing like return something? or that mean if it send reject then when I call it it will go to catch?
  // ChatGPT
  // Yes, that's correct! The reject and resolve functions are part of the Promise pattern in JavaScript and are used to
  // signal the completion or failure of an asynchronous operation.
  // resolve: If the asynchronous operation is successful, you call resolve.
  //  When the promise is resolved, any value you pass to resolve will be the resolved value of the promise.
  //  In your case, calling resolve() without arguments signifies that the asynchronous operation(file deletion) was successful.
  // reject: If an error occurs during the asynchronous operation, you call reject and pass an error object(or an error message).
  //  When the promise is rejected, the control flow will move to the catch block when you use await or.catch().
  const filePath = `${dir}/${imageName}`;
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (error) => {
      if (error) {
        const data = {
          status: "failure",
          message: error,
        };
        reject(data);
      } else {
        resolve();
      }
    });
  });
}
