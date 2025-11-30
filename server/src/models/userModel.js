import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },

    passwordHash: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    coinsBalance: {
    type: Number,
    default: 0
    },

    role: {
        type: String,
        enum: ["user", "volunteer", "admin"],
        // user =0, volute =1, adm=2,
        default: "user"
        //default =0,
    }
    
}, {timestamps:true});

export const User = mongoose.model("User", userSchema);