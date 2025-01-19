import { generateHealthMessage } from "../config/openai.js";
import User from "../models/userModel.js";

export async function processHealthRequest(id, message) {
    const user = await User.findByPk(Number(id)); // Chuyển id về kiểu số


  if (!user) {
    return { success: false, error: `Không tìm thấy người dùng với id: ${id}` };
  }

  const aiResponse = await generateHealthMessage(user, message);
  return { success: true, user, analysis: aiResponse };
}
