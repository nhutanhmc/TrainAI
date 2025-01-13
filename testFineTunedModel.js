import "dotenv/config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Tên model đã fine-tune
const fineTunedModel = "ft:gpt-3.5-turbo-0125:srcoach::ApCJhuE3";

async function testFineTunedModel() {
  try {
    const response = await openai.chat.completions.create({
      model: fineTunedModel,
      messages: [
        { role: "user", content: "Ai là người có nhịp tim khỏe nhất tại quận Q4" }
      ],
      max_tokens: 100,
      temperature: 0.5,
    });

    console.log("=== RESPONSE ===");
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

testFineTunedModel();
