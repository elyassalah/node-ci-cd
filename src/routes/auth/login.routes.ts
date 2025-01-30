import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { filterRequest, getData } from "../../functions";

const logIn = Router();
// make all query with id just and send the id with body
// for testing actions ci and code scanning
logIn.post("/", async (req: Request, res: Response) => {
  const email: string = filterRequest(req.body.email);
  const password: string = filterRequest(req.body.password);
  //TODO: make user send his id and get pass from db depend on it,
  //to increase performance and give the id to user from signup
  const passInDb = await getData("users", "`users_email` = ?", [email], false);
  const hash =
    passInDb.length > 0 ? passInDb[0].users_password : "galatkelmetalser";
  //TODO comparing in functions
  bcrypt.compare(password, hash, async (errPass: any, result: any) => {
    if (errPass) {
      //some error in compare
      res.send({
        status: "failure",
        data: "Wrong email or password",
      });
    } else if (result) {
      //result : same = true
      try {
        const count = await getData(
          "users",
          "`users_email` = ? AND `users_password` = ?",
          [email, hash],
          true,
        );
        res.send(count);
      } catch (error) {
        res.send(error);
      }
    } else {
      //not equal : same = false
      res.send({
        status: "failure",
        data: "Wrong email or password",
      });
    }
  });
});

export default logIn;
