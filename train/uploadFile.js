import "dotenv/config.js";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function uploadFile() {
  try {
    const filePath = "./data.jsonl";

    // Kiểm tra file tồn tại
    if (!fs.existsSync(filePath)) {
      console.error("File not found:", filePath);
      return;
    }

    const response = await openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "fine-tune",
    });

    console.log("File uploaded successfully!");
    console.log("File ID:", response.id);
    console.log("File status:", response.status); // In thêm trạng thái file
  } catch (error) {
    console.error("Error uploading file:", error.response?.data || error.message);
  }
}

uploadFile();
