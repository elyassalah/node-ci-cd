"use strict";
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
const express_1 = require("express");
const functions_1 = require("../../functions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRound = 10;
const signUp = (0, express_1.Router)();
signUp.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = (0, functions_1.filterRequest)(req.body.username);
    const email = (0, functions_1.filterRequest)(req.body.email);
    const userPhone = (0, functions_1.filterRequest)(req.body.phone);
    const password = req.body.password;
    const count = yield (0, functions_1.getData)("users", "users_email = ? OR users_phone = ?", [email, userPhone], false); //the row is object not count make it number
    if (count !== "failure") {
        res.send({
            status: "failure",
            message: " Phone or Email already exist",
        });
    }
    else {
        bcrypt_1.default.hash(password, saltRound, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: "failure",
                    message: err,
                });
            }
            else {
                try {
                    const data = {
                        users_name: userName,
                        users_email: email,
                        users_phone: userPhone,
                        users_password: hash,
                    };
                    const result = yield (0, functions_1.insertData)("users", data, true);
                    res.send(result);
                }
                catch (error) {
                    res.send(error);
                }
            }
        }));
    }
}));
exports.default = signUp;
