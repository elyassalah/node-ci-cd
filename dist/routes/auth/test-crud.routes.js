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
const testCrud = (0, express_1.Router)();
testCrud.get("/getAll", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, functions_1.getAllData)({ _table: "services", returnJson: true });
        res.send(count);
    }
    catch (error) {
        res.send(error);
    }
    // getAllData("services", null, null, true, (errConnection, errQuery, row) => {
    //   if (errConnection) {
    //     res.send(errConnection);
    //   } else if (errQuery) {
    //     res.send(errQuery);
    //   } else {
    //     res.send(row);
    //   }
    // });
}));
testCrud.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, functions_1.getData)("services", "services_id = ?", [45], true);
        res.send(count);
    }
    catch (error) {
        res.send(error);
    }
    // getData(
    //   "services",
    //   "services_id = ?",
    //   [1],
    //   true,
    //   (errConnection, errQuery, row) => {
    //     if (errConnection) {
    //       res.send(errConnection);
    //     } else if (errQuery) {
    //       res.send(errQuery);
    //     } else {
    //       res.send(row);
    //     }
    //   },
    // );
}));
testCrud.put("/insert", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableName = "cart";
        const info = {
            user_id: request.body.id,
        };
        const count = yield (0, functions_1.insertData)(tableName, info, true);
        response.send(count);
    }
    catch (error) {
        response.send(error);
    }
}));
testCrud.post("/upDate", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableName = "cart";
        const info = {
            user_id: request.body.id,
        };
        const count = yield (0, functions_1.updateData)(tableName, info, "user_id = ?", [2], true);
        response.send(count);
    }
    catch (error) {
        response.send(error);
    }
}));
testCrud.post("/delete", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableName = "cart";
        const count = yield (0, functions_1.deleteData)(tableName, "user_id = ?", [12], false);
        response.send({
            count: count,
        });
    }
    catch (error) {
        response.send({
            count: error,
        });
    }
}));
exports.default = testCrud;
