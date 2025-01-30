import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { filterRequest, getData, updateData } from "../../functions";

const saltRound = 10;
const resetPassword = Router();
//here for reset forget password after he take verify code and entered in flutter then become here
//wh can modify this route to able to reset password when user do not forget it ,using old pass then new
resetPassword.put("/", async (req: Request, res: Response) => {
  try {
    const email = filterRequest(req.body.email);
    const password = filterRequest(req.body.password);
    const count = await getData("users", "users_email = ?", [email], true);
    bcrypt.hash(password, saltRound, async (err: any, hash: string) => {
      if (err) {
        res.send({
          status: "failure",
          message: err,
        });
      } else {
        try {
          if (count.status == "success") {
            const data = {
              users_email: email,
              users_password: hash,
            };
            const result = await updateData(
              "users",
              data,
              "users_email = ?",
              [email],
              true,
            );
            res.send(result);
          } else {
            res.send({
              status: count.status,
              message: "Email not found",
            });
          }
        } catch (error) {
          res.send(error);
        }
      }
    });
  } catch (error) {
    res.send({
      status: "failure",
      message: error,
    });
  }
});
export default resetPassword;
