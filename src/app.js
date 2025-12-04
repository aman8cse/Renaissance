import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "https://mercat-ten.vercel.app",
//       "https://papertrading-2u5c.onrender.com",
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
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
