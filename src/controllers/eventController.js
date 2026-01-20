import { Event } from "../models/eventModel.js"
import { EventRegistration } from "../Models/eventRegModel.js";

export const createEvent = async(req, res, next) => {
    try{
        const { title, slug, eventType, description, bannerImage, startDatetime, endDatetime, location, extryFeeCoins, extraDetails } = req.body;
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

        const event = await Event.create({title, slug, eventType, description, bannerImage, startDatetime, endDatetime, location, extryFeeCoins, extraDetails });

        res.status(201).json({success: true, event});
    } catch {
        // this is not correct approch in catch 
        next(error);
       
    }
};

export const deleteEvent = async (req, res, next) => {
    try{
        const { eventId } = req.params;

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(401).json({message: "Event not found"});
        }

        await EventRegistration.deleteMany({ eventId });

        await event.deleteOne();

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
        const userId = req.user._id;
        const { eventId } = req.params;
// we can use event id in form of hash for better security 

        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).json({ message: "Event not found"});
        }

        const alreadyRegistered =  await EventRegistration.findOne({
            userId,
            eventId
        });

        if(alreadyRegistered) {
            return res.status(409).json({ message: "Already registered for this event"});
        }

        const registration = await EventRegistration.create({
            userId,
            eventId,
           
        });



        res.status(201).json({
            // add a message too 
            success: true,
            registration
        });
    } catch(err) {
        next(err);
    }
}

export const cancelRegistration = async (req, res, next) => {
    try {
        const userId = req.user._Id;
        const eventId = req.params;

        const registration = await EventRegistration.findOne({
            userId, 
            eventId
        });

        if(!registration) {
            return res.status(401).json({ message: "Registration not found"});
        }

        registration.status = "cancelled";
        await registration.save();

        res.json({ success: true, message: "Registration cancelled "});
    } catch (err) {
        next(err);
    }
};