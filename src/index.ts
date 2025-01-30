import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import authRoutes from "./routes/auth";
import categoriesRoutes from "./routes/categories";
import profileRoutes from "./routes/profiles";
import homeRoutes from "./routes/home";
import serviceRoutes from "./routes/services";
import uploadRoutes from "./routes/upload_image";
import fetchImage from "./upload";
import cartRoutes from "./routes/cart";
import favoriteRoutes from "./routes/favorite";

//TODO: make all get route to deal with params not urlencoded
dotenv.config();
const app = express();
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());
app.use(routes);
app.use(authRoutes);
app.use(categoriesRoutes);
app.use(profileRoutes);
app.use(homeRoutes);
app.use(serviceRoutes);
app.use(uploadRoutes);
app.use(fetchImage);
app.use(cartRoutes);
app.use(favoriteRoutes);

// const data = [{ id: 20 }, { id: 10 }];
// for (let index of data) {
//   console.log(index);
// }
app.get("/", (request: Request, response: Response) => {
  const data = [{ name: request.body.name }];
  response.send({ message: "hello Boss", data: data });
});
app.listen(process.env.PORT, () => {
  console.log(`The Application is listening on port ${process.env.PORT} !`);
});
