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
const deleteCart = (0, express_1.Router)();
deleteCart.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const cartId = req.body.cart_id;
        var allData = {
            status: "failure",
        };
        const isCartExist = yield (0, functions_1.getData)("cart", "cart_id = ? AND user_id = ?", [cartId, userId], false);
        if (isCartExist.length > 0) {
            const isDeletedCart = yield (0, functions_1.deleteData)("cart", "cart_id = ? AND user_id =?", [cartId, userId], false);
            if (isDeletedCart > 0) {
                allData.status = "success";
            }
        }
        res.send(allData);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = deleteCart;
