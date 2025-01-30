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
const verifyCodeResetPassword = (0, express_1.Router)();
verifyCodeResetPassword.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = (0, functions_1.filterRequest)(req.body.email);
        const count = yield (0, functions_1.getData)("users", "users_email = ?", [email], true);
        const code = (0, crypto_1.randomInt)(100000, 1000000);
        const data = {
            status: `${count.status}`,
            data: {
                code: count.status === "success" ? `${code}` : "none",
            },
        };
        res.send(data);
    }
    catch (error) {
        res.send({
            status: "failure",
            message: error,
        });
    }
}));
exports.default = verifyCodeResetPassword;
