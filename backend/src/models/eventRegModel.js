// import mongoose from "mongoose";

// const eventRegSchema = new mongoose.Schema({

//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     eventId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Event",
//         required: true
//     },

//     coinsPaid: {
//         type: Number,
//         required: true
//     },

//     status: {
//         type: String,
//         enum: ["registered", "attended", "completed", "cancelled"],
//         default: "registered"
//     },

//     registeredAt: {
//         type: Date,
//         default: Date.now
//     }

// }, { timestamps: true });

// export const EventRegistration = mongoose.model("EventRegistration", eventRegSchema);


import mongoose from "mongoose";

const eventRegistrationSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
        index: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    status: {
        type: String,
        enum: ["registered", "attended", "completed", "cancelled"],
        default: "registered"
    },



    paymentStatus: {
        type: String,
        enum: ["free", "pending", "paid","cancelled", "refunded"],
        default: "free"
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

eventRegistrationSchema.index({ event: 1, user: 1 }, { unique: true });

export const EventRegistration = mongoose.model(
  "EventRegistration",
  eventRegistrationSchema
);
