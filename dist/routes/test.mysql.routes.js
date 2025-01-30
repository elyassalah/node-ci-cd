"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_connection_1 = __importDefault(require("../config/db.connection"));
const testDbConnect = (0, express_1.Router)();
testDbConnect.get("/info", (request, response) => {
    console.log("iam in api");
    db_connection_1.default.getConnection((errorConnection, conn) => {
        console.log("iam in pool connection");
        if (errorConnection) {
            response.send({
                success: false,
                statusCode: 500,
                message: "error duging connection",
                data: errorConnection,
            });
        }
        else {
            console.log("iam in query");
            conn.query("SELECT * FROM services", function (errQuery, result) {
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
            });
        }
    });
});
exports.default = testDbConnect;
