// trainAndUpload.js
import "dotenv/config.js";
import fs from "fs";
import OpenAI from "openai";

// Tên mô hình đã fine-tune trước đó (lần train cũ thành công).
const EXISTING_FINE_TUNED_MODEL = "ft:gpt-3.5-turbo-0125:fak::ApAsJGtK";

// Khai báo API key (đọc từ .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  try {
    // 1) Upload file data.jsonl (ở cùng thư mục)
    const uploadResp = await openai.files.create({
      file: fs.createReadStream("./data.jsonl"),
      purpose: "fine-tune",
    });
    console.log("File uploaded successfully!");
    console.log("File ID:", uploadResp.id);

    // 2) Tạo job Fine-tuning, sử dụng mô hình đã Fine-tune cũ + file mới
    const job = await openai.fineTuning.jobs.create({
      model: EXISTING_FINE_TUNED_MODEL,   // dùng mô hình cũ làm base
      training_file: uploadResp.id,       // file.id từ bước uploadResp
      // method: { type: "supervised" },
      // hyperparameters: { n_epochs: 3, ... },
    });

    console.log("Fine-tuning job created!");
    console.log("Job ID:", job.id);
    console.log("Status:", job.status);

  } catch (error) {
    console.error("Error:", error);
  }
}

main();
