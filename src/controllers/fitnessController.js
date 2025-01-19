import { processRunningSchedule } from "../services/fitnessService.js";

export async function createRunningSchedule(req, res) {
  try {
    const { id, prompt } = req.body;

    if (!id || !prompt) {
      return res.status(400).json({ success: false, error: "Thiếu 'id' hoặc 'prompt'!" });
    }

    const response = await processRunningSchedule(id, prompt);
    res.json(response);
  } catch (error) {
    console.error("Error in createRunningSchedule:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
