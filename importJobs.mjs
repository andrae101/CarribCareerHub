import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const API_URL = "https://remotive.com/api/remote-jobs";

async function importJobs() {
  try {
    console.log("🔍 Fetching jobs from API...");
    const response = await fetch(API_URL);
    const data = await response.json();

    const jobs = data.jobs.slice(0, 10); // limit for testing
    console.log("📥 Jobs fetched from API:", jobs);

    const formattedJobs = jobs.map(job => ({
      Title: job.title,
      Company: job.company_name,
      Location: job.candidate_required_location,
      Description: job.description
    }));

    console.log("🚀 Inserting jobs into Supabase...");
    const { data: inserted, error } = await supabase
      .from("Jobs")   // 👈 must match your table name exactly
      .insert(formattedJobs);

    if (error) {
      console.error("❌ Error inserting jobs:", error);
      console.log("📦 Data we tried to insert:", formattedJobs);
    } else {
      console.log(`✅ Successfully inserted ${inserted.length} jobs`);
      console.log("Inserted records:", inserted);
    }
  } catch (err) {
    console.error("⚠️ Unexpected error:", err);
  }
}

importJobs();

