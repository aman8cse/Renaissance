import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import eventRoutes from "./routes/event.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       " other hosted url "
//     ],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Allow all origins
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/events", eventRoutes);
app.use("/api/user", authRoutes);

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Renaissance 26 API Running" });
});

export { app };
