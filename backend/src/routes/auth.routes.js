import express from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/authMiddleware.js";
import { changeCurrentPassword, getAllUsers, getCurrentUser, getUserById, signup, updateAccountDetails, loginUser, logoutUser, refreshAccessToken } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyJWT, logoutUser);
router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.get("/current-user", verifyJWT, getCurrentUser);
router.route("/find-user").post(verifyJWT,authorizeRoles(1,2), getUserById);
router.route("/get-all-user").get(verifyJWT,authorizeRoles(1,2), getAllUsers);
router.route("/update-user-details").post(verifyJWT,  updateAccountDetails);

export default router;
