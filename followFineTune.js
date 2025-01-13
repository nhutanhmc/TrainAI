// followFineTune.js
import "dotenv/config.js";
import OpenAI from "openai";

// Job ID thu được từ bước trên
const FINE_TUNE_JOB_ID = "ftjob-ZWkhIzpewxhBPc5tVRtHJDPx";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function followFineTune() {
  try {
    const job = await openai.fineTuning.jobs.retrieve(FINE_TUNE_JOB_ID);
    console.log("Job status:", job.status);

    // Bạn có thể xem events (log chi tiết) khi job đang chạy
    const events = await openai.fineTuning.jobs.listEvents(FINE_TUNE_JOB_ID, {
      limit: 10,
    });
    console.log("Events:", events.data);

    // Hoặc liệt kê tất cả job
    // const allJobs = await openai.fineTuning.jobs.list({ limit: 5 });
    // console.log("All jobs:", allJobs);
  } catch (error) {
    console.error("Error retrieving fine-tuning job:", error);
  }
}

followFineTune();
