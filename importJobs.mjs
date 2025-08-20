import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// ✅ Use environment variable for your Supabase key
const supabaseUrl = "https://fpytvfhynleaivkvuedt.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example API: Remotive jobs
const API_URL = "https://remotive.com/api/remote-jobs?category=software-dev";

async function importJobs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const jobs = data.jobs.slice(0, 10); // top 10 jobs

    for (let job of jobs) {
      const { error } = await supabase.from("jobs").insert({
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location,
        description: job.description,
      });

      if (error) {
        console.error("❌ Error inserting job:", error.message);
      } else {
        console.log(`✅ Job inserted: ${job.title}`);
      }
    }
  } catch (err) {
    console.error("⚠️ Import failed:", err.message);
  }
}

importJobs();
