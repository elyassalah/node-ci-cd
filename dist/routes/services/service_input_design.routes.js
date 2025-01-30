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
const serviceInputDesignRoutes = (0, express_1.Router)();
serviceInputDesignRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.body.service_id;
    let allData = {};
    allData["status"] = "";
    allData["data"] = [];
    const allBoxes = yield (0, functions_1.getAllData)({
        _table: "service_infoboxinput",
        where: "`id_service` = ?",
        values: [serviceId],
        returnJson: false,
    });
    if (allBoxes !== "failure") {
        allData["status"] = "success";
        allData["data"] = allBoxes;
        const radioChoices = yield (0, functions_1.getAllData)({
            _table: "choices_radiobox",
            where: "service_id = ?",
            values: [serviceId],
            returnJson: false,
        });
        const checkedChoices = yield (0, functions_1.getAllData)({
            _table: "choices_checkedbox",
            where: "service_id = ?",
            values: [serviceId],
            returnJson: false,
        });
        if (radioChoices !== "failure" || checkedChoices !== "failure") {
            for (var i = 0; i < allBoxes.length; i++) {
                if (allData["data"][i]["type_designInput"] === "Radio Button") {
                    var choicesRd = [];
                    for (var j = 0; j < radioChoices.length; j++) {
                        if (radioChoices[j]["id_radioBox"] === allData["data"][i]["id"]) {
                            choicesRd.push(radioChoices[j]);
                        }
                    }
                    allData.data[i].choices = choicesRd;
                    radioChoices.splice(j, 1);
                }
                else {
                    if (allData["data"][i]["type_designInput"] === "Checked Box") {
                        var choicesChk = [];
                        for (var j = 0; j < checkedChoices.length; j++) {
                            if (checkedChoices[j]["id_checkedBox"] == allData["data"][i]["id"]) {
                                choicesChk.push(checkedChoices[j]);
                            }
                        }
                        allData["data"][i]["choices"] = choicesChk;
                        checkedChoices.splice(j, 1);
                    }
                }
            }
        }
        else {
            for (let i = 0; i < allBoxes.length; i++) {
                allData["data"][i]["choices"] = [];
            }
        }
    }
    else {
        allData["status"] = "failure";
    }
    res.send(allData);
}));
exports.default = serviceInputDesignRoutes;
