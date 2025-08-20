import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// ✅ Use secrets (set in GitHub Actions)
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

    if (!data.jobs || data.jobs.length === 0) {
      console.log("⚠️ No jobs found from API");
      return;
    }

    const jobs = data.jobs.slice(0, 10); // Take top 10 for testing
    console.log(`📦 Fetched ${jobs.length} jobs`);

    // ✅ Format jobs to match Supabase column names
    const formattedJobs = jobs.map(job => ({
      Title: job.title,
      Company: job.company_name,
      Location: job.candidate_required_location,
      Description: job.description
      // Created_at is auto-generated in Supabase
    }));

    console.log("🚀 Inserting jobs into Supabase...");
    const { data: inserted, error } = await supabase
      .from("Jobs") // ⚠️ Capital J to match your table
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
