import { processHealthRequest } from "../services/healthService.js";

export async function handleHealth(req, res) {
  try {
    const { id, message } = req.body;
    const response = await processHealthRequest(id, message);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
