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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions_1 = require("../../functions");
const crypto_1 = require("crypto");
const verifyCode = (0, express_1.Router)();
verifyCode.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = (0, functions_1.filterRequest)(req.body.username);
    const email = (0, functions_1.filterRequest)(req.body.email);
    const userPhone = (0, functions_1.filterRequest)(req.body.phone);
    const count = yield (0, functions_1.getData)("users", "users_email = ? OR users_phone = ? OR users_name = ?", [email, userPhone, userName], false); //the row is object not count make it number
    if (count !== "failure") {
        res.send({
            status: "failure",
            message: " Phone or Email already exist",
        });
    }
    else {
        const code = (0, crypto_1.randomInt)(100000, 1000000);
        const data = {
            status: "success",
            data: {
                code: code,
            },
        };
        res.send(data);
    }
}));
exports.default = verifyCode;
