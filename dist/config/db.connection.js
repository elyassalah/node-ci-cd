"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool2 = void 0;
const promise_1 = require("mysql2/promise");
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_1 = __importDefault(require("mysql"));
dotenv_1.default.config();
exports.pool2 = (0, promise_1.createPool)({
    host: process.env.HOST,
    port: parseInt(`${process.env.PORT_DATABASE}`),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
    connectionLimit: 10,
    namedPlaceholders: true,
});
var pool = mysql_1.default.createPool({
    host: process.env.HOST,
    port: parseInt(`${process.env.PORT_DATABASE}`),
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
    connectionLimit: 10,
});
exports.default = pool;
