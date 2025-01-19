import { processUserMessage } from "../services/chatService.js";

export async function handleChat(req, res) {
  try {
    const { message } = req.body;
    const response = await processUserMessage(message);
    res.json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
