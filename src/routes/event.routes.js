import express from "express";
import {
    createEvent,
    deleteEvent,
    getAllEvents,
    registerForEvent,
    cancelRegistration
} from "../controllers/eventController.js";

import { isAuthenticated} from "../middlewares/authMiddleware.js";
import { isAdminAuthenticated } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/", isAdminAuthenticated, createEvent);
router.delete("/:eventId", isAdminAuthenticated, deleteEvent);

router.get("/", getAllEvents);
router.post("/:eventId/register", isAuthenticated, registerForEvent);
router.delete("/:eventId/cancel", isAuthenticated, cancelRegistration);

export default router;