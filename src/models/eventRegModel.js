import mongoose from "mongoose";

const eventRegSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    coinsPaid: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["registered", "attended", "completed", "cancelled"],
        default: "registered"
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

export const EventRegistration = mongoose.model("EventRegistration", eventRegSchema);
