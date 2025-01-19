import express from "express";
import { createRunningSchedule } from "../controllers/fitnessController.js";

const router = express.Router();

// Route tạo lịch chạy bộ
router.post("/schedule", createRunningSchedule);

export default router;
