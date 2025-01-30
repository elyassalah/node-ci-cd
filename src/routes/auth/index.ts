import { Router } from "express";
import testCrud from "./test-crud.routes";
import signUp from "./signup.routes";
import logIn from "./login.routes";
import verifyCode from "./verify_code.routes";
import resetPassword from "./reset_password.routes";
import verifyCodeResetPassword from "./verify_code_rest_password.routes";



const authRoutes = Router();

authRoutes.use("/auth/test", testCrud);
authRoutes.use("/auth/sign-up", signUp);
authRoutes.use("/auth/login", logIn);
authRoutes.use("/auth/verify-code", verifyCode);
authRoutes.use("/auth/verify-code-reset-password", verifyCodeResetPassword);
authRoutes.use("/auth/reset-password", resetPassword);





export default authRoutes;
