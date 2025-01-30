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
const deleteFromFavorite = (0, express_1.Router)();
deleteFromFavorite.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const profileId = req.body.profile_id;
        const allData = {
            status: "failure",
            data: {
                message: "something error",
            },
        };
        const count = yield (0, functions_1.getData)("favorite", "user_id = ? AND profile_id =?", [userId, profileId], false);
        if (count !== "failure") {
            const del = yield (0, functions_1.deleteData)("favorite", "user_id = ? AND profile_id = ?", [userId, profileId], false);
            if (del > 0) {
                allData.status = "success";
                allData.data.message = " deleted successful";
                res.send(allData);
            }
            else {
                allData.data.message = "error on delete";
                res.send(allData);
            }
        }
        else {
            allData.data.message = "item not in favorite";
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
exports.default = deleteFromFavorite;
