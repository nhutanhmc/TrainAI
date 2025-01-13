// uploadFile.js
import "dotenv/config.js";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function uploadFile() {
  try {
    const response = await openai.files.create({
      file: fs.createReadStream("./data.jsonl"),
      purpose: "fine-tune",
    });

    console.log("File uploaded successfully!");
    console.log("File ID:", response.id);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

uploadFile();
