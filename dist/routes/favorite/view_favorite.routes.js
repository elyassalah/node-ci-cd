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
const viewFavorite = (0, express_1.Router)();
viewFavorite.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const allData = {
            status: "failure",
            data: {
                message: "something error",
            },
        };
        const count = yield (0, functions_1.getAllData)({
            _table: "favorite",
            where: "user_id = ?",
            values: [userId],
            returnJson: true,
        });
        if (count.status === "success") {
            res.send(count);
        }
        else {
            allData.data.message = "no items in favorite";
            res.send(allData);
        }
    }
    catch (error) {
        res.send({
            status: "success",
            data: { message: error },
        });
    }
}));
exports.default = viewFavorite;
