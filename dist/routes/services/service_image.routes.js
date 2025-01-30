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
const serviceImagesRoutes = (0, express_1.Router)();
serviceImagesRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.body.service_id;
        const count = yield (0, functions_1.getAllData)({
            _table: "service_images",
            where: "image_serviceId = ?",
            values: [serviceId],
            returnJson: true,
        });
        res.send(count);
    }
    catch (error) {
        res.send({
            status: "failure",
            message: error,
        });
    }
}));
exports.default = serviceImagesRoutes;
