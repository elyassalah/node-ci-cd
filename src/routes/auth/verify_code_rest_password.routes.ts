import { Router, Request, Response } from "express";
import { filterRequest, getData } from "../../functions";
import { randomInt } from "crypto";

const verifyCodeResetPassword = Router();
//here we just send the code to client side and there we compare and check it

verifyCodeResetPassword.post("/", async (req: Request, res: Response) => {
  try {
    const email = filterRequest(req.body.email);
    const count = await getData("users", "users_email = ?", [email], true);
    const code = randomInt(100000, 1000000);
    const data = {
      status: `${count.status}`,
      data: {
        code: count.status === "success" ? `${code}` : "none",
      },
    };
    res.send(data);
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});

export default verifyCodeResetPassword;
