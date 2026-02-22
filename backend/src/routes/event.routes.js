import express from "express";
import { createEvent, deleteEvent, getAllEvents, registerForEvent, cancelRegistration } from "../controllers/eventController.js";
import { authorizeRoles, verifyJWT} from "../middlewares/authMiddleware.js";

const router = express.Router();

//Aman : routes for admin to create and delete events
router.post("/create-new", verifyJWT, authorizeRoles(2), createEvent);
router.delete("/:slug/delete", verifyJWT, authorizeRoles(2), deleteEvent);

//Aman : route to get all events without authorization
router.get("/get-all", getAllEvents);

//Aman : routes for user to register and cancel registration
router.post("/:slug/register", verifyJWT, registerForEvent);
router.delete("/:slug/cancel", verifyJWT, cancelRegistration);

export default router;