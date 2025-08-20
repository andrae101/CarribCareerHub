// importJobs.mjs
import fetch from "node-fetch"; 
import { createClient } from "@supabase/supabase-js";

// 🔹 Hardcoded Supabase credentials
const SUPABASE_URL = "https://fpytvfhynleaivkvuedt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweXR2Zmh5bmxlYWl2a3Z1ZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzU1OTAsImV4cCI6MjA3MTI1MTU5MH0.Q7UHLIA_3_o7zCdV-IOthWOYGVVlINDXjp1uF4sdBRk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Example API (you can replace with your real jobs API)
const JOBS_API = "https://remotive.com/api/remote-jobs";

async function importJobs() {
  try {
    console.log("📡 Fetching jobs from API...");
    const response = await fetch(JOBS_API);
    const json = await response.json();

    const jobs = json.jobs.map(job => ({
      Title: job.title,
      Company: job.company_name,
      Location: job.candidate_required_location,
      Description: job.description,
      Url: job.url,
      DatePosted: job.publication_date
    }));

    console.log(`✅ Fetched ${jobs.length} jobs from API`);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("Jobs")
      .insert(jobs);

    if (error) {
      console.error("❌ Error inserting jobs:", error);
    } else {
      console.log("🎉 Jobs inserted into Supabase:", data);
    }
  } catch (err) {
    console.error("⚠️ Import failed:", err.message);
  }
}

importJobs();
