import express from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    registerForEvent,
    cancelRegistration
} from "../controllers/eventController.js";

import { authorizeRoles, isAuthenticated, verifyJWT} from "../middlewares/authMiddleware.js";
import { isAdminAuthenticated } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", verifyJWT,authorizeRoles(2), createEvent);
router.delete("/:eventId", verifyJWT,authorizeRoles(2), deleteEvent);
// error from line 15 and 18 make confussion on which controller to call 
router.get("/", getAllEvents);
router.post("/:eventId/register", verifyJWT, registerForEvent);
// not a proper mention who going to cancel the registration like in case of disqualified 
router.delete("/:eventId/cancel", verifyJWT, cancelRegistration);

export default router;