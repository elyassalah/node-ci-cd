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
//delete the service and delete the cart if no service inside it to avoid conflict in add cart or service
const deleteServiceInCart = (0, express_1.Router)();
deleteServiceInCart.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        const serviceId = req.body.service_id;
        const serviceInCartId = req.body.service_incart_id;
        const cartId = req.body.cart_id;
        let allData = {
            status: "failure",
            message: "delete services",
        };
        const isServiceExist = yield (0, functions_1.getData)("services_incart", "service_id =? AND cart_id = ? AND services_incart_id = ?", [serviceId, cartId, serviceInCartId], false);
        if (isServiceExist.length > 0) {
            const isDeletedService = yield (0, functions_1.deleteData)("services_incart", "service_id =? AND cart_id = ? AND services_incart_id = ?", [serviceId, cartId, serviceInCartId], false);
            if (isDeletedService > 0) {
                allData.status = "success";
                const isServiceExist = yield (0, functions_1.getData)("services_incart", "cart_id = ?", [cartId], false);
                if (isServiceExist === "failure") {
                    const isDeletedCart = yield (0, functions_1.deleteData)("cart", "cart_id = ? AND user_id = ?", [cartId, userId], false);
                    if (isDeletedCart > 0) {
                        allData.message = "Deleted Cart also";
                    }
                }
            }
        }
        res.send(allData);
    }
    catch (error) {
        res.send({
            status: "failure",
            message: error,
        });
    }
}));
exports.default = deleteServiceInCart;
