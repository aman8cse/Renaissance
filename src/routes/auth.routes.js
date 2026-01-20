import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../controllers/authController.js";
import { authorizeRoles, verifyJWT } from "../middlewares/authMiddleware.js";
import { changeCurrentPassword, getAllUsers, getCurrentUser, getUserById, signup, updateAccountDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
//bhai logout krwane sse phale verify toh krwa lo ki user login bhi ha  in ya nahi 
router.post("/logout", logoutUser);
router.route("/change/password").patch(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/find-user").post(verifyJWT,authorizeRoles(1,2), getUserById);
router.route("/get-all-user").get(verifyJWT,authorizeRoles(1,2), getAllUsers);

router
  .route("/update-userdetails")
  .post(verifyJWT,  updateAccountDetails);
router


export default router;
