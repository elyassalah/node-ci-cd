"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.imageUpload = exports.storage = exports.deleteData = exports.updateData = exports.insertData = exports.getData = exports.getAllData = exports.filterRequest = exports.MB = void 0;
const validator = __importStar(require("validator"));
const db_connection_1 = require("./config/db.connection");
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
exports.MB = 1048576;
function filterRequest(requestData) {
    const checkData = validator.default.escape(requestData);
    return checkData;
}
exports.filterRequest = filterRequest;
//replace to promise using mysql2
function getAllData({ _table, where = null, values = null, returnJson = true, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let stmt;
            if (where === null) {
                stmt = `SELECT * FROM ${_table}`;
            }
            else {
                stmt = `SELECT * FROM ${_table} WHERE ${where}`;
            }
            const connection = yield db_connection_1.pool2.getConnection();
            const [result] = yield connection.execute(stmt, values);
            const count = result.length;
            if (returnJson === true) {
                if (count > 0) {
                    const data = {
                        status: "success",
                        data: result,
                    };
                    connection.release();
                    return data;
                }
                else {
                    const data = {
                        status: "failure",
                    };
                    connection.release();
                    return data;
                }
            }
            else {
                connection.release();
                if (count > 0) {
                    return result;
                }
                else {
                    return "failure";
                }
            }
        }
        catch (error) {
            if (returnJson === true) {
                let data = {
                    status: "failure",
                    message: error,
                };
                return data;
            }
            else {
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
    });
}
exports.getAllData = getAllData;
//using callback function but:
// Callbacks are functions that are passed as arguments to another function
// and are executed after the completion of that function.
// Callbacks can lead to a pattern called "callback hell" or "pyramid of doom"
//  when dealing with multiple asynchronous operations.
//replace to promise using mysql2
function getData(_table, _where, _values, returnJson = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const stmt = `SELECT * FROM ${_table} WHERE ${_where} LIMIT 1`;
        try {
            const connection = yield db_connection_1.pool2.getConnection();
            const [result] = yield connection.execute(stmt, _values);
            const count = result.length;
            if (returnJson === true) {
                if (count > 0) {
                    const data = {
                        status: "success",
                        data: result,
                    };
                    connection.release();
                    return data;
                }
                else {
                    connection.release();
                    const data = {
                        status: "failure",
                    };
                    return data;
                }
            }
            else {
                connection.release();
                if (count > 0) {
                    return result;
                }
                else {
                    return "failure";
                }
            }
        }
        catch (error) {
            if (returnJson === true) {
                let data = {
                    status: "failure",
                    message: error,
                };
                return data;
            }
            else {
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
    });
}
exports.getData = getData;
//using promises and
// Promises provide a cleaner and more structured way to handle
// asynchronous operations. They allow you to chain multiple asynchronous
// operations together, and they offer better
// error handling through the .then() and .catch() methods.
// Promises also support the async/await syntax,
//  making code more readable and maintainable.
//mysql2 has promise emplictily on pool.execute  and its accept named placeholder
//but mysql not accept named placeholder just (?)
function insertData(table, data, returnJson = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const fields = Object.keys(data).join(",");
        const values = Object.keys(data)
            .map((field) => `:${field}`)
            .join(",");
        const stmt = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
        try {
            //here pool2 its from mysql2/promise so its not has any callback
            //its use with it await and try catch fo any error occur
            const connection = yield db_connection_1.pool2.getConnection();
            //here we use mysql2 for promise and its implicitly on execute adn use
            //ResultSetHeader as a type of execute to take the affected affectedRows
            const [result] = yield connection.execute(stmt, data);
            //     <ResultSetHeader> type is specified to indicate the expected
            //     result type (an object that includes information about the affected rows).
            const count = result.affectedRows;
            if (returnJson === true) {
                let data = {
                    status: count > 0 ? "success" : "failure",
                };
                connection.release();
                return data;
            }
            else {
                connection.release();
                return count;
            }
        }
        catch (error) {
            if (returnJson === true) {
                let data = {
                    status: "failure",
                    message: error,
                };
                return data;
            }
            else {
                return error;
            }
        }
    });
}
exports.insertData = insertData;
function updateData(_table, _data, _where, whereValues, returnJson = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const cols = [];
        const vals = [];
        for (const [key, val] of Object.entries(_data)) {
            vals.push(val);
            cols.push(`\`${key}\` = ?`);
        }
        const stmt = `UPDATE ${_table} SET ${cols.join(", ")} WHERE ${_where}`;
        try {
            const connection = yield db_connection_1.pool2.getConnection();
            const [result] = yield connection.execute(stmt, [
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
            }
            else {
                connection.release();
                return count;
            }
        }
        catch (error) {
            if (returnJson === true) {
                let data = {
                    status: "failure",
                    message: error,
                };
                return data;
            }
            else {
                return error;
            }
        }
    });
}
exports.updateData = updateData;
function deleteData(_table, _where, values, returnJson = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const stmt = `DELETE FROM ${_table} WHERE ${_where}`;
        const connection = yield db_connection_1.pool2.getConnection();
        const [result] = yield connection.execute(stmt, values);
        const count = result.affectedRows;
        if (returnJson === true) {
            const data = {
                status: count > 0 ? "success" : "failure",
            };
            connection.release();
            return data;
        }
        else {
            connection.release();
            return count;
        }
    });
}
exports.deleteData = deleteData;
// export default getAllData;
// export default getAllData;
/////////////////////////////////////////////
const storage = (path) => multer_1.default.diskStorage({
    destination: path,
    filename: function (req, file, cd) {
        cd(null, `${Math.floor(Math.random() * 9000) + 1000}${file.originalname}`);
    },
});
exports.storage = storage;
function imageUpload(imageName, imageSize) {
    // Assuming there is a global variable 'msgError' defined somewhere
    var messageError;
    const allowExt = ["jpg", "png", "gif", "mp3", "pdf"];
    const strToArray = imageName.split(".");
    //ext will be in the last of string cause it maybe has more dots but in the last dot after that will be the ext of file
    // so we split the string in array on every dot and take the last index that has the ext
    const ext = strToArray[strToArray.length - 1].toLowerCase();
    if (!imageName || !allowExt.includes(ext)) {
        // Assuming msgError is a global variable
        const data = {
            status: "failure",
            message: "Invalid file extension",
        };
        return data;
    }
    else {
        const data = {
            status: "success",
            imageName: imageName,
        };
        return data;
    }
}
exports.imageUpload = imageUpload;
function deleteFile(dir, imageName) {
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
            }
            else {
                resolve();
            }
        });
    });
}
exports.deleteFile = deleteFile;
