import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// ✅ Use secrets (both URL + KEY from GitHub)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Example API: Remotive jobs
const API_URL = "https://remotive.com/api/remote-jobs";

async function importJobs() {
  try {
    console.log("🔍 Fetching jobs from API...");
    const response = await fetch(API_URL);
    const data = await response.json();

    const jobs = data.jobs.slice(0, 10); // take top 10 for test
    console.log(`📦 Fetched ${jobs.length} jobs`);

    // ✅ Bulk insert instead of one-by-one
    const formattedJobs = jobs.map(job => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      description: job.description
    }));

    console.log("🚀 Inserting jobs into Supabase...");
    const { data: inserted, error } = await supabase
      .from("jobs")
      .insert(formattedJobs);

    if (error) {
      console.error("❌ Error inserting jobs:", error);
    } else {
      console.log(`✅ Successfully inserted ${inserted.length} jobs`);
    }
  } catch (err) {
    console.error("💥 Unexpected error:", err);
  }
}

importJobs();
