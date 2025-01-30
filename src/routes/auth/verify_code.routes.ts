import { Router, Request, Response } from "express";
import {
  filterRequest,
  getData,
} from "../../functions";
import { randomInt } from "crypto";
//here we just send the code to client side and there we compare and check it
const verifyCode = Router();
verifyCode.post("/", async (req: Request, res: Response) => {
  const userName = filterRequest(req.body.username);
  const email = filterRequest(req.body.email);
  const userPhone = filterRequest(req.body.phone);
  const count = await getData(
    "users",
    "users_email = ? OR users_phone = ? OR users_name = ?",
    [email, userPhone , userName],
    false,
  ); //the row is object not count make it number
  if (count !== "failure") {
    res.send({
      status: "failure",
      message: " Phone or Email already exist",
    });
  } else {
    const code = randomInt(100000, 1000000);
    const data = {
      status: "success",
      data: {
        code: code,
      },
    };
    res.send(data);
  }
});

export default verifyCode;
