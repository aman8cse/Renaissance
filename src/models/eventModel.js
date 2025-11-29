import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    eventType: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    bannerImage: {
        type: String
    },

    startDatetime: {
        type: Date,
        required: true
    },

    endDatetime: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    entryFeeCoins: {
        type: Number,
        default: 0
    },

    extraDetails: {
        type: Object,
        default: {}
    }

}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);