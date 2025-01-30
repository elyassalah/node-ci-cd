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
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = require("express");
const functions_1 = require("../../functions");
const saltRound = 10;
const resetPassword = (0, express_1.Router)();
//here for reset forget password after he take verify code and entered in flutter then become here
//wh can modify this route to able to reset password when user do not forget it ,using old pass then new
resetPassword.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = (0, functions_1.filterRequest)(req.body.email);
        const password = (0, functions_1.filterRequest)(req.body.password);
        const count = yield (0, functions_1.getData)("users", "users_email = ?", [email], true);
        bcrypt_1.default.hash(password, saltRound, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send({
                    status: "failure",
                    message: err,
                });
            }
            else {
                try {
                    if (count.status == "success") {
                        const data = {
                            users_email: email,
                            users_password: hash,
                        };
                        const result = yield (0, functions_1.updateData)("users", data, "users_email = ?", [email], true);
                        res.send(result);
                    }
                    else {
                        res.send({
                            status: count.status,
                            message: "Email not found",
                        });
                    }
                }
                catch (error) {
                    res.send(error);
                }
            }
        }));
    }
    catch (error) {
        res.send({
            status: "failure",
            message: error,
        });
    }
}));
exports.default = resetPassword;
