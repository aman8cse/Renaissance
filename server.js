import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());



app.use(cors({
    origin: "*",
    credentials: true
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.json({status: "OK", message: "Renaissance'26 API Running"});
});

app.use((err, req, res, next) => {
    console.error("ERROR:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});



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