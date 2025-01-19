import "dotenv/config.js";
import express from "express";
import { connectToDatabase } from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";
const app = express();
app.use(express.json());

// Kết nối database
connectToDatabase();

// Sử dụng các routes
app.use("/api/chat", chatRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/fitness", fitnessRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
