import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database is connected successfully");

    app.listen(PORT, () => {
        console.log(`Server running at PORT: ${PORT}`)
    });
})
.catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
})