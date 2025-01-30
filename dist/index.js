"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const auth_1 = __importDefault(require("./routes/auth"));
const categories_1 = __importDefault(require("./routes/categories"));
const profiles_1 = __importDefault(require("./routes/profiles"));
const home_1 = __importDefault(require("./routes/home"));
const services_1 = __importDefault(require("./routes/services"));
const upload_image_1 = __importDefault(require("./routes/upload_image"));
const upload_1 = __importDefault(require("./upload"));
const cart_1 = __importDefault(require("./routes/cart"));
const favorite_1 = __importDefault(require("./routes/favorite"));
//TODO: make all get route to deal with params not urlencoded
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(auth_1.default);
app.use(categories_1.default);
app.use(profiles_1.default);
app.use(home_1.default);
app.use(services_1.default);
app.use(upload_image_1.default);
app.use(upload_1.default);
app.use(cart_1.default);
app.use(favorite_1.default);
// const data = [{ id: 20 }, { id: 10 }];
// for (let index of data) {
//   console.log(index);
// }
app.get("/", (request, response) => {
    const data = [{ name: request.body.name }];
    response.send({ message: "hello Boss", data: data });
});
app.listen(process.env.PORT, () => {
    console.log(`The Application is listening on port ${process.env.PORT} !`);
});
