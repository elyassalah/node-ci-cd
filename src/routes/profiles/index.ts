import { Router } from "express";
import profile from "./view_profile.routes";
import profileDetailsRoutes from "./profile_details.routes";
import profileDetailRoutes2 from "./profile_details2.routes";
import searchProfile from "./search_profile.routes";

const profileRoutes = Router();
//TODO: make the edit profile rout , and the request of upload image only working when the Request has file

profileRoutes.use("/profile/view", profile);
profileRoutes.use("/profile/profile-details", profileDetailsRoutes);
profileRoutes.use("/profile/profile-details2", profileDetailRoutes2);
profileRoutes.use("/profile/search", searchProfile);


export default profileRoutes;
