// createFineTune.js
import "dotenv/config.js";
import OpenAI from "openai";

// Thay thế "file-xxx" bằng fileId mà bạn lấy được từ bước Upload
const TRAINING_FILE_ID = "file-Q54z6weq2sx89Q7Ej8Q4EJ";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createFineTune() {
  try {
    // Ví dụ SFT (Supervised Fine-Tuning) mặc định
    // Model: "gpt-3.5-turbo-0125" (theo tài liệu)
    const job = await openai.fineTuning.jobs.create({
      training_file: TRAINING_FILE_ID,
      model: "gpt-3.5-turbo-0125",
      // Bạn có thể truyền thêm "validation_file", "hyperparameters", ...
      // method: {
      //   type: "dpo",
      //   dpo: {
      //     hyperparameters: { beta: 0.1 },
      //   },
      // },
    });

    console.log("Fine-tuning job created!");
    console.log("Job ID:", job.id);
    console.log("Status:", job.status);
  } catch (error) {
    console.error("Error creating fine-tuning job:", error);
  }
}

createFineTune();
