import "dotenv/config.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function listFineTuningJobs() {
  try {
    const jobs = await openai.fineTuning.jobs.list();
    console.log("Fine-tuning jobs:", jobs.data);
  } catch (error) {
    console.error("Error fetching fine-tuning jobs:", error);
  }
}

listFineTuningJobs();
