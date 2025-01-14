import "dotenv/config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Lấy từ file .env
});

async function listFiles() {
  try {
    const response = await openai.files.list();
    console.log("Uploaded Files:");
    response.data.forEach((file) => {
      console.log(`- ID: ${file.id}, Purpose: ${file.purpose}, Filename: ${file.filename}`);
    });
  } catch (error) {
    console.error("Error listing files:", error.response?.data || error.message);
  }
}

listFiles();
