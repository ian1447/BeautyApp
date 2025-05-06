import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import beauticianRoutes from "./routes/beauticianRoute.js";
import chatRoutes from "./routes/chatRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json()); 
app.use(cors());

app.use("/api/auth", authRoutes)
app.use("/api/beautician", beauticianRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});