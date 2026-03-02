import { Event } from "../models/eventModel.js"
import { EventRegistration } from "../models/eventRegModel.js";

export const createEvent = async(req, res, next) => {
    try{
        const { title, slug, eventType, description, bannerImage, startDatetime, endDatetime, location, entryFeeCoins, extraDetails } = req.body;
        if(!title || !eventType || !description || !location) {
            return res.status(400).json({ message: "Missing required fields"});
        }

        if (new Date(endDatetime) <= new Date(startDatetime)) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        const eventExists = await Event.findOne({ title });
        if (eventExists) {
            return res.status(409).json({ message: "Event title already exists" });
        }
        const slugExists = await Event.findOne({ slug });
        if (slugExists) {
            return res.status(409).json({ message: "Slug already exists" });
        }

        const event = await Event.create({title, slug, eventType, description, bannerImage, startDatetime, endDatetime, location, entryFeeCoins, extraDetails });

        //upload data to spreadsheet
        try {
            const resp = await fetch(process.env.SHEET_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "CREATE_EVENT",
                    eventKey: event._id.toString(), // or serialNumber
                    secret: process.env.SHEET_SECRET,
                }),
            });

        } catch (e) {
            console.error("Sheet error:", e.message);
        }

        res.status(201).json({success: true, event});
    } catch (err) {
        next(err);
       
    }
};

export const deleteEvent = async (req, res, next) => {
    try{
        const { slug } = req.params;

        const deleted = await Event.deleteOne({ slug });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        await EventRegistration.deleteMany({ slug }); 

        res.json({ success: true, message: "Event deleted successfully"});
    } catch (err) {
        next(err);
    }
};

export const getAllEvents = async (req, res, next) => {
    try{
        const events = await Event.find().sort({ startDatetime: 1 });
        res.json({ success: true, events });
    } catch(err) {
        next(err);
    }
};

export const registerForEvent = async (req, res, next) => {
    try {
        const user = req.user;
        const { slug } = req.params;
//Aman : Sir, I have used slug here for simplicity and readibillity

        const event = await Event.findOne({ slug });
        if(!event) {
            return res.status(404).json({ message: "Event not found"});
        }

        const alreadyRegistered =  await EventRegistration.findOne({
            user: user._id,
            event: event._id,
        });

        if(alreadyRegistered && alreadyRegistered.status === "cancelled") {
            alreadyRegistered.status = "registered";
            await alreadyRegistered.save();
            return res.status(201).json({message: "User Re-registered for this event successfully"});
        }

        if(alreadyRegistered) {
            return res.status(409).json({ message: "Already registered for this event"});
        }

        const registration = await EventRegistration.create({
            user: user._id,
            event: event._id,
           
        });

        //upload to sheet
        try {
            const resp = await fetch(process.env.SHEET_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "REGISTER",
                    eventKey: event._id.toString(),
                    userId: user._id.toString(),
                    name: user.username,
                    email: user.email,
                    mobile: user.mobile,
                    secret: process.env.SHEET_SECRET,
                }),
            });
        } catch (e) {
            console.error("Sheet error: ", e.message);
        }

        res.status(201).json({
            message: "User registered for this event successfully",
            success: true,
            registration
        });
    } catch(err) {
        next(err);
    }
};

export const cancelRegistration = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { slug } = req.params;
        const event = await Event.findOne({ slug });

        const registration = await EventRegistration.findOne({
            user: userId, 
            event: event._id
        });

        if(!registration) {
            return res.status(404).json({ message: "Registration not found"});
        }

        registration.status = "cancelled";
        await registration.save();

        res.json({ success: true, message: "Registration cancelled "});
    } catch (err) {
        next(err);
    }
};

export const getMyEvents = async(req, res, next) => {
    try {
        const user = req.user;
        const events = await EventRegistration.find({ user: user._id });

        res.status(200).json({
            success: true,
            events
        });
        
    } catch(err) {
        next(err);
    }
}