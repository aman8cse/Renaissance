import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());

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

export default app;