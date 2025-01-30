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
/*
{
  status: "success",
  data : [
  service1:{
    info_service: string|number,
    info_service: string|number,
    info_service: string|number
    choices : [
    choice1:{
    info_choice:string | number,
    info_choice:string | number,
    info_choice:string | number
    },
    choice2:{
    info_choice:string | number,
    info_choice:string | number
    },
    ]
  },
    service2:{
    info_service: string|number,
    info_service: string|number
    choices : [
    choice1:{
    info_choice:string | number,
    info_choice:string | number
    },
    choice2:{
    info_choice:string | number,
    info_choice:string | number
    },
    ]
  },
  ]
}
*/
///this route can be useful in cart screen , but when user pres on service in cart screen to edit it
//so use the box model in flutter to show tha all boxes and the choices and when edit on them so make the request
//to add_to_cart.routes.ts
const viewCart = (0, express_1.Router)();
viewCart.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user_id;
        // const cartId: number = req.body.cart_id;
        const count = yield (0, functions_1.getData)("cart", "user_id = ?", [userId], false);
        if (count !== "failure") {
            let allData = {};
            const servicesInCart = yield (0, functions_1.getAllData)({
                _table: "services_incart",
                where: "cart_id = ?",
                values: [count[0]["cart_id"]],
                returnJson: false,
            });
            let servicesInfo = [];
            let choices = [];
            for (let index in servicesInCart) {
                let service = yield (0, functions_1.getData)("services", "services_id =?", [servicesInCart[index]["service_id"]], false);
                let choice = yield (0, functions_1.getAllData)({
                    _table: "test_marge_choices",
                    where: "id in (SELECT choice_id FROM user_selected_choices_request WHERE cart_id = ? AND user_id = ? AND service_incart_id = ?)",
                    values: [
                        count[0]["cart_id"],
                        userId,
                        servicesInCart[index]["services_incart_id"],
                    ],
                    returnJson: false,
                });
                //to injection the service in cart id to the service response
                service[0]["service_incart_id"] =
                    servicesInCart[index]["services_incart_id"];
                //this if Statement for if this service not have any choices
                //to select it
                if (choice !== "failure") {
                    choice.forEach(function (element) {
                        element["service_incart_id"] =
                            servicesInCart[index]["services_incart_id"];
                    });
                    servicesInfo.push(service[0]);
                    servicesInfo[index]["choices"] = choice;
                    // choices.push(choice);
                    // console.log(choice[0]);
                }
                else {
                    servicesInfo.push(service[0]);
                    servicesInfo[index]["choices"] = [];
                }
            }
            // console.log(servicesInfo);
            allData.status = "success";
            allData.data = servicesInfo;
            //bellow its overload all functionalities has been done in above for
            // for (let index in servicesInfo) {
            //   allData.data[index]["choices"] = [];
            // }
            // // console.log(choices);
            // for (let index in servicesInfo) {
            //   for (let subIndex in choices) {
            //     for (let subSubIndex in choices[subIndex]) {
            //       if (
            //         servicesInfo[index]["service_incart_id"] ===
            //         choices[subIndex][subSubIndex]["service_incart_id"]
            //       ) {
            //         allData.data[index]["choices"].push(
            //           choices[subIndex][subSubIndex],
            //         );
            //       }
            //     }
            //   }
            // }
            res.send(allData);
        }
        else {
            res.send({
                status: "failure",
                message: "userId or cartId not valid or no service added yet",
            });
        }
    }
    catch (error) {
        res.send({
            status: "failure",
            message: error,
        });
    }
}));
exports.default = viewCart;
