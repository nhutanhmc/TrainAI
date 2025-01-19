import "dotenv/config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const fineTunedModel = "ft:gpt-3.5-turbo-0125:srcoach::ApVHURY4"; // Tên model fine-tuned

export async function askFineTunedModel(message) {
  try {
    const response = await openai.chat.completions.create({
      model: fineTunedModel,
      messages: [
        { role: "user", content: message }
      ],
      max_tokens: 10000,
      temperature: 0,
    });

    // Lấy nội dung trả về từ model
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling model:", error.response?.data || error.message);
    throw error;
  }
}

export async function generateHealthMessage(userData, userMessage) {
    const { name, heart_rate, age } = userData;
    
    // Tạo prompt bằng cách sử dụng message được gửi qua API
    const prompt = `Tôi tên là ${name}, tuổi ${age}, với nhịp tim hiện tại là ${heart_rate}. ${userMessage}`;
  
    try {
      const response = await openai.chat.completions.create({
        model: fineTunedModel,
        messages: [
          { role: "user", content: prompt }
        ],
        max_tokens: 3000,
        temperature: 0,
      });
  
      // Lấy câu trả lời từ AI model
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error calling AI model:", error.response?.data || error.message);
      throw error;
    }
  }
  
