import User from "../models/userModel.js";
import { generateHealthMessage } from "../config/openai.js";
import RunningSchedule from "../models/runningScheduleModel.js";

export async function processRunningSchedule(id, prompt) {
    console.log(`Đang truy vấn User với id: ${id}`);
  
    const user = await User.findByPk(Number(id)); // Chuyển id về kiểu số
  
    if (!user) {
      console.log(`Không tìm thấy User với id: ${id}`);
      return { success: false, error: `Không tìm thấy người dùng với id: ${id}` };
    }
  
    console.log(`Tìm thấy User:`, user);
  
    // Lấy thông tin từ user
    const { name, heart_rate, age } = user; // Lấy name từ user
  
    const aiPrompt = `
  Tôi tên là ${name}, tuổi ${age}, nhịp tim ${heart_rate}.
  Hãy tạo lịch chạy bộ trong 7 ngày dưới dạng JSON:
  [
    { "date": "YYYY-MM-DD", "distance": số_km, "duration": số_phút, "food": "thực phẩm" },
    ...
  ]
  Chỉ trả về JSON, không thêm thông tin khác.
  `;
  
    try {
      const aiResponse = await generateHealthMessage({ name, heart_rate, age }, aiPrompt);
      console.log("Phản hồi từ AI:", aiResponse);
  
      const runningSchedule = JSON.parse(aiResponse);
      console.log("Lịch chạy bộ JSON:", runningSchedule);
  
      const createdSchedules = [];
      for (let i = 0; i < runningSchedule.length; i++) {
        const day = runningSchedule[i];
        const created = await RunningSchedule.create({
          userId: id,
          date: day.date,
          distance: day.distance,
          duration: day.duration,
          food: day.food,
          dayNumber: i + 1, // Gán số thứ tự ngày
        });
        createdSchedules.push(created);
      }
  
      return { success: true, data: createdSchedules };
    } catch (error) {
      console.error("Error in processRunningSchedule:", error.message);
      throw error;
    }
  }
  