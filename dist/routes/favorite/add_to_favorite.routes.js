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
const addToFavorite = (0, express_1.Router)();
addToFavorite.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const profileId = req.body.profile_id;
        const allData = {
            status: "failure",
            data: {
                message: "something error",
            },
        };
        const checkFavorite = yield (0, functions_1.getData)("favorite", "user_id = ? AND profile_id = ?", [userId, profileId], false);
        if (checkFavorite === "failure") {
            const count = yield (0, functions_1.getData)("users", "users_id = ?", [userId], false);
            if (count !== "failure") {
                const count = yield (0, functions_1.getData)("profile", "profile_id = ?", [profileId], false);
                if (count !== "failure") {
                    const data = {
                        user_id: userId,
                        profile_id: profileId,
                    };
                    const count = yield (0, functions_1.insertData)("favorite", data, false);
                    if (count > 0) {
                        allData.status = "success";
                        allData.data.message = "insert successful";
                        res.send(allData);
                    }
                    else {
                        allData.data.message = "error on insert favorite";
                        res.send(allData);
                    }
                }
                else {
                    allData.data.message = "profile not found";
                    res.send(allData);
                }
            }
            else {
                allData.data.message = "user not found";
                res.send(allData);
            }
        }
        else {
            allData.data.message = "already added to favorite";
            res.send(allData);
        }
    }
    catch (error) {
        res.send({
            status: "failure",
            data: { message: error },
        });
    }
}));
exports.default = addToFavorite;
