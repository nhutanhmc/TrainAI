import express from "express";
import { handleHealth } from "../controllers/healthController.js";

const router = express.Router();
router.post("/", handleHealth);

export default router;
