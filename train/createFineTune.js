import "dotenv/config.js";
import OpenAI from "openai";

// File ID lấy từ bước upload
const TRAINING_FILE_ID = "file-TvgRBhhEp7ZSkJJpCXqW1t"; // Thay thế bằng file ID thực tế

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createFineTune() {
  try {
    if (!TRAINING_FILE_ID) {
      console.error("Training file ID is missing.");
      return;
    }

    const job = await openai.fineTuning.jobs.create({
      training_file: TRAINING_FILE_ID,
      model: "gpt-3.5-turbo-0125", // Model được fine-tune
      // Nếu cần validation_file, thêm tại đây
      // validation_file: "file-xxx",
    });

    console.log("Fine-tuning job created!");
    console.log("Job ID:", job.id);
    console.log("Status:", job.status);
    console.log("Details:", job);
  } catch (error) {
    console.error("Error creating fine-tuning job:", error.response?.data || error.message);
  }
}

createFineTune();
