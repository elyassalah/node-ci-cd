import { Router, Request, Response } from "express";
import { getData, insertData, filterRequest } from "../../functions";
import bcrypt from "bcrypt";

const saltRound = 10;
const signUp = Router();
signUp.post("/", async (req: Request, res: Response) => {
  const userName = filterRequest(req.body.username);
  const email = filterRequest(req.body.email);
  const userPhone = filterRequest(req.body.phone);
  const password = req.body.password;
  const count = await getData(
    "users",
    "users_email = ? OR users_phone = ?",
    [email, userPhone],
    false,
  ); //the row is object not count make it number
  if (count !== "failure") {
    res.send({
      status: "failure",
      message: " Phone or Email already exist",
    });
  } else {
    bcrypt.hash(password, saltRound, async (err: any, hash: string) => {
      if (err) {
        res.send({
          status: "failure",
          message: err,
        });
      } else {
        try {
          const data = {
            users_name: userName,
            users_email: email,
            users_phone: userPhone,
            users_password: hash,
          };
          const result = await insertData("users", data, true);
          res.send(result);
        } catch (error) {
          res.send(error);
        }
      }
    });
  }
});

export default signUp;
