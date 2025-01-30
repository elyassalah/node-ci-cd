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
const logIn = (0, express_1.Router)();
logIn.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = (0, functions_1.filterRequest)(req.body.email);
    const password = (0, functions_1.filterRequest)(req.body.password);
    const passInDb = yield (0, functions_1.getData)("users", "`users_email` = ?", [email], false);
    const hash = passInDb.length > 0 ? passInDb[0].users_password : "galatkelmetalser";
    //TODO comparing in functions
    bcrypt_1.default.compare(password, hash, (errPass, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (errPass) {
            //some error in compare
            res.send({
                status: "failure",
                data: "Wrong email or password",
            });
        }
        else if (result) {
            //result : same = true
            try {
                const count = yield (0, functions_1.getData)("users", "`users_email` = ? AND `users_password` = ?", [email, hash], true);
                res.send(count);
            }
            catch (error) {
                res.send(error);
            }
        }
        else {
            //not equal : same = false
            res.send({
                status: "failure",
                data: "Wrong email or password",
            });
        }
    }));
}));
exports.default = logIn;
