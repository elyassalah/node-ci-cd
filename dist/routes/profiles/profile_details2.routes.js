"use strict";
// Import necessary modules and define database configuration if not already done
// ...
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
const functions_1 = require("../../functions");
const express_1 = require("express");
// TODO: Define filterRequest and getAllData functions
const profileDetailRoutes2 = (0, express_1.Router)();
profileDetailRoutes2.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profile_id = req.body.profile_id;
    let allData = {};
    allData["status"] = "success";
    // Get categories
    const categories = yield (0, functions_1.getAllData)({
        _table: "categories_inside_profile",
        where: "`categories_profile_id`=?",
        values: [profile_id],
        returnJson: false,
    });
    if (categories !== "failure") {
        for (let i = 0; i < categories.length; i++) {
            categories[i]["services"] = [];
        }
        allData["categories"] = { data: categories };
        const services = yield (0, functions_1.getAllData)({
            _table: "services",
            where: "`services_profile_id`=?",
            values: [profile_id],
            returnJson: false,
        });
        let countToCheckIfNoServicesInCat = 0;
        const servicesWithoutCategory = [];
        if (services !== "failure") {
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < services.length; j++) {
                    if (categories[i]["cat_inside_ser_id"] ==
                        services[j]["services_categorie_id"]) {
                        allData["categories"]["data"][i]["services"].push(services[j]);
                        countToCheckIfNoServicesInCat++;
                    }
                    else if (services[j]["services_categorie_id"] == 0 &&
                        services[j]["services_profile_id"] == profile_id) {
                        servicesWithoutCategory.push(services[j]);
                        allData["servicesWithoutCategories"] = servicesWithoutCategory;
                        services.splice(j, 1); // Removes the element to avoid redundancy in servicesWithoutCat list
                    }
                }
                if (countToCheckIfNoServicesInCat === 0) {
                    allData["categories"]["data"][i]["services"].push("empty");
                }
            }
            if (countToCheckIfNoServicesInCat === 0) {
                console.error("Error: There are categories and services, but there is an error in the ID.");
            }
        }
        else {
            // If there are categories, but none of them have any services, the services key remains an empty array as defined at the top.
        }
        if (servicesWithoutCategory.length === 0) {
            allData["servicesWithoutCategories"] = servicesWithoutCategory;
        }
    }
    else {
        allData["categories"]["data"] = "empty";
        const services = yield (0, functions_1.getAllData)({
            _table: "services",
            where: "`services_profile_id`=?",
            values: [profile_id],
            returnJson: false,
        });
        if (services !== "failure") {
            allData["categories"]["services"] = services;
        }
        else {
            allData["categories"]["services"] = "empty";
        }
    }
    res.send(allData);
}));
exports.default = profileDetailRoutes2;
