// trainExistingModel.js
import "dotenv/config.js";
import OpenAI from "openai";

/**
 * Tên mô hình đã fine-tune trước đó.
 * Bạn lấy từ trường "fine_tuned_model" khi job cũ thành công.
 */
const EXISTING_FINE_TUNED_MODEL = "ft:gpt-3.5-turbo-0125:fak::ApAsJGtK";

/**
 * File ID data.jsonl mới (hoặc bổ sung) mà bạn đã upload lên:
 * (ví dụ "file-Q54z6weq2sx89Q7Ej8Q4EJ" ...)
 */
const TRAINING_FILE_ID = "file-xxx"; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function trainExistingModel() {
  try {
    const job = await openai.fineTuning.jobs.create({
      model: EXISTING_FINE_TUNED_MODEL, // Dùng mô hình fine-tune sẵn có làm base
      training_file: TRAINING_FILE_ID,
      // Bạn có thể thêm "method", "hyperparameters", ...
      // method: {
      //   type: "supervised" // hoặc "dpo"
      // },
      // hyperparameters: {
      //   n_epochs: 3,
      //   batch_size: 1,
      //   learning_rate_multiplier: 1.5
      // }
    });

    console.log("Created fine-tuning job for existing model!");
    console.log("Job ID:", job.id);
    console.log("Status:", job.status);
  } catch (error) {
    console.error("Error creating fine-tuning job on existing model:", error);
  }
}

trainExistingModel();
