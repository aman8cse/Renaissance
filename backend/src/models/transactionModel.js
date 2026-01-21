import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["registration", "reward", "refund", "admin_add", "admin_deduct"],
        required: true
    },

    remarks: {
        type: String,
        trim: true
    }

}, { timestamps: true });

export const CoinTransaction = mongoose.model("CoinTransaction", transactionSchema);