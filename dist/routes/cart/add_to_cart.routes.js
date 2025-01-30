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
const addToCart = (0, express_1.Router)();
addToCart.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { user_id, service_id, box_and_choices } = userData;
        let allData = {};
        const cart = yield (0, functions_1.getAllData)({
            _table: "cart",
            where: "user_id =?",
            values: [user_id],
            returnJson: false,
        });
        allData["status"] = "success";
        allData["data"] = {};
        if (cart !== "failure") {
            const isServiceInCart = yield (0, functions_1.getAllData)({
                _table: "services_incart",
                where: "cart_id =? AND service_id = ?",
                values: [cart[0]["cart_id"], service_id],
                returnJson: false,
            });
            let newService = true;
            let serviceInCartId;
            let numberOfThisServiceInCart = 0;
            for (let index = 0; index < isServiceInCart.length; index++) {
                if (service_id === isServiceInCart[index]["service_id"]) {
                    newService = false;
                    serviceInCartId = isServiceInCart[index]["services_incart_id"];
                    numberOfThisServiceInCart++;
                    //           console.log(serviceInCartId);
                }
            }
            //add new service and choices from different provider or same
            //just check if provider profile can take more than one service request from same user to complete
            if (newService === true) {
                const isServiceExist = yield (0, functions_1.getData)("services", "services_id = ? ", [service_id], false);
                if (isServiceExist.length > 0 &&
                    isServiceExist["services_count"] !== 0) {
                    const data = {
                        service_id: service_id,
                        cart_id: cart[0]["cart_id"],
                    };
                    const count = yield (0, functions_1.insertData)("services_incart", data, false);
                    if (count > 0) {
                        allData["data"]["services_incart_insert"] = "success";
                        allData["data"]["cart_id"] = cart[0]["cart_id"];
                    }
                    else {
                        allData["status"] = "failure";
                        allData["message"]["services_incart_insert"] = "failure";
                    }
                    const newServiceInCart = yield (0, functions_1.getAllData)({
                        _table: "services_incart",
                        where: "service_id = ? AND cart_id = ?",
                        values: [service_id, cart[0]["cart_id"]],
                        returnJson: false,
                    });
                    for (let index = 0; index < box_and_choices.length; index++) {
                        for (let subIndex = 0; subIndex < box_and_choices[index]["choicesId"].length; subIndex++) {
                            const data = {
                                user_id: user_id,
                                cart_id: cart[0]["cart_id"],
                                service_incart_id: newServiceInCart[0]["services_incart_id"],
                                choice_id: box_and_choices[index]["choicesId"][subIndex],
                                box_id: box_and_choices[index]["boxId"],
                            };
                            const count = yield (0, functions_1.insertData)("user_selected_choices_request", data, false);
                            if (count > 0) {
                                allData["data"]["user_choices_selected_service_insert"] =
                                    "success";
                                allData["data"]["service_incart_id"] =
                                    newServiceInCart[0]["services_incart_id"];
                            }
                            else {
                                allData["status"] = "failure";
                                allData["message"]["user_choices_selected_service_insert"] =
                                    "failure";
                            }
                        }
                    }
                }
                else {
                    allData["status"] = "failure";
                    allData["message"] = "service does not exist";
                }
            }
            else {
                const serviceInfo = yield (0, functions_1.getData)("services", "services_id = ?", [service_id], false);
                if (numberOfThisServiceInCart <
                    serviceInfo[0]["services_duplicate"] + 1 &&
                    serviceInfo["services_count"] !== 0) {
                    const data = {
                        service_id: service_id,
                        cart_id: cart[0]["cart_id"],
                    };
                    const count = yield (0, functions_1.insertData)("services_incart", data, false);
                    if (count > 0) {
                        allData["data"]["services_incart_insert"] = "success";
                        allData["data"]["cart_id"] = cart[0]["cart_id"];
                    }
                    else {
                        allData["status"] = "failure";
                        allData["message"]["services_incart_insert"] = "failure";
                    }
                    const newServiceInCart = yield (0, functions_1.getAllData)({
                        _table: "services_incart",
                        where: "service_id = ? AND cart_id = ?",
                        values: [service_id, cart[0]["cart_id"]],
                        returnJson: false,
                    });
                    for (let index = 0; index < box_and_choices.length; index++) {
                        for (let subIndex = 0; subIndex < box_and_choices[index]["choicesId"].length; subIndex++) {
                            const data = {
                                user_id: user_id,
                                cart_id: cart[0]["cart_id"],
                                service_incart_id: newServiceInCart[numberOfThisServiceInCart]["services_incart_id"],
                                choice_id: box_and_choices[index]["choicesId"][subIndex],
                                box_id: box_and_choices[index]["boxId"],
                            };
                            const count = yield (0, functions_1.insertData)("user_selected_choices_request", data, false);
                            if (count > 0) {
                                allData["data"]["user_choices_selected_service_insert"] =
                                    "success";
                                allData["data"]["service_incart_id"] =
                                    newServiceInCart[numberOfThisServiceInCart]["services_incart_id"];
                            }
                            else {
                                allData["status"] = "failure";
                                allData["message"]["user_choices_selected_service_insert"] =
                                    "failure";
                            }
                        }
                    }
                }
                else {
                    allData["status"] = "failure";
                    allData["message"] = "this service can not duplicate";
                }
            }
            res.send(allData);
        }
        else {
            const isUserExist = yield (0, functions_1.getData)("users", "users_id =?", [user_id], false);
            if (isUserExist.length > 0) {
                const data = {
                    user_id: user_id,
                };
                var count = yield (0, functions_1.insertData)("cart", data, false);
                if (count > 0) {
                    allData["data"]["cart_insert"] = "success";
                }
                else {
                    allData["status"] = "failure";
                    allData["message"]["cart_insert"] = "failure";
                }
                const cart = yield (0, functions_1.getAllData)({
                    _table: "cart",
                    where: "user_id = ?",
                    values: [user_id],
                    returnJson: false,
                });
                const isServiceExist = yield (0, functions_1.getData)("services", "services_id = ?", [service_id], false);
                if (isServiceExist.length > 0) {
                    const data = {
                        service_id: service_id,
                        cart_id: cart[0]["cart_id"],
                    };
                    const count = yield (0, functions_1.insertData)("services_incart", data, false);
                    if (count > 0) {
                        allData["data"]["services_incart_insert"] = "success";
                        allData["data"]["cart_id"] = cart[0]["cart_id"];
                    }
                    else {
                        allData["status"] = "failure";
                        allData["message"]["services_incart_insert"] = "failure";
                    }
                    const serviceInCart = yield (0, functions_1.getAllData)({
                        _table: "services_incart",
                        where: "service_id = ? AND cart_id = ?",
                        values: [service_id, cart[0]["cart_id"]],
                        returnJson: false,
                    });
                    //TODO: check if boxes id and choices id is exist in db
                    for (let index = 0; index < box_and_choices.length; index++) {
                        for (let subindex = 0; subindex < box_and_choices[index]["choicesId"].length; subindex++) {
                            const data = {
                                user_id: user_id,
                                cart_id: cart[0]["cart_id"],
                                service_incart_id: serviceInCart[0]["services_incart_id"],
                                choice_id: box_and_choices[index]["choicesId"][subindex],
                                box_id: box_and_choices[index]["boxId"],
                            };
                            const count = yield (0, functions_1.insertData)("user_selected_choices_request", data, false);
                            if (count > 0) {
                                allData["data"]["user_selected_service_insert"] = "success";
                                allData["data"]["service_incart_id"] =
                                    serviceInCart[0]["services_incart_id"];
                            }
                            else {
                                allData["status"] = "failure";
                                allData["message"]["user_selected_service_insert"] = "failure";
                            }
                        }
                    }
                }
                else {
                    allData["status"] = "failure";
                    allData["message"] = "service does not exist";
                }
            }
            else {
                allData["status"] = "failure";
                allData["message"] = "user does not exist";
            }
            res.send(allData);
        }
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = addToCart;
