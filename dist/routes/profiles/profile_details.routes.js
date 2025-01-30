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
const profileDetailsRoutes = (0, express_1.Router)();
profileDetailsRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.body.profile_id;
        let allData = {};
        allData["status"] = "failure";
        allData["categories"] = { data: [] };
        const categories = yield (0, functions_1.getAllData)({
            _table: "categories_inside_profile",
            where: "`categories_profile_id` =?",
            values: [profileId],
            returnJson: false,
        });
        if (categories !== "failure") {
            allData["status"] = "success";
            for (const i of categories) {
                i.services = [];
            }
            allData.categories.data = categories;
            // res.send(allData);
            const services = yield (0, functions_1.getAllData)({
                _table: "services",
                where: "`services_profile_id`=?",
                values: [profileId],
                returnJson: false,
            });
            let countCheckNoServicesInCat = 0;
            let servicesWithoutCategory = [];
            if (services != "failure") {
                for (let i = 0; i < categories.length; i++) {
                    for (let j = 0; j < services.length; j++) {
                        if (categories[i].cat_inside_ser_id ===
                            services[j].services_categorie_id) {
                            allData.categories.data[i].services.push(services[j]);
                            countCheckNoServicesInCat++;
                        }
                        else if (services[j].services_categorie_id == 0 &&
                            services[j].services_profile_id == profileId) {
                            servicesWithoutCategory.push(services[j]);
                            allData.servicesWithoutCategories = servicesWithoutCategory;
                            services.splice(j, 1);
                            j--;
                        }
                    }
                    if (countCheckNoServicesInCat === 0) {
                        allData.categories.data[i].services = "empty";
                    }
                }
                if (countCheckNoServicesInCat === 0) {
                    allData.status = "failure";
                    allData.message =
                        "There are categories and services, but they have inconsistent IDs";
                }
            }
            else {
                //if there is has a categories but all if them have not any services , the services key its still array empty ass we defined in the top page
            }
            if (servicesWithoutCategory.length === 0) {
                allData.servicesWithoutCategories = servicesWithoutCategory;
            }
        }
        else {
            allData.categories.data = "empty";
            const services = yield (0, functions_1.getAllData)({
                _table: "services",
                where: "services_profile_id =?",
                values: [profileId],
                returnJson: false,
            });
            if (services != "failure") {
                allData["status"] = "success";
                allData.categories.services = services;
            }
            else {
                allData.categories.services = "empty";
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
exports.default = profileDetailsRoutes;
