
import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// 🔑 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweXR2Zmh5bmxlYWl2a3Z1ZWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzU1OTAsImV4cCI6MjA3MTI1MTU5MH0.Q7UHLIA_3_o7zCdV-IOthWOYGVVlINDXjp1uF4sdBRk
const supabaseUrl = "https://fpytvfhynleaivkvuedt.supabase.co";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"; 
const supabase = createClient(supabaseUrl, supabaseKey);

// Example API: Remotive (free job API)
const API_URL = "https://remotive.com/api/remote-jobs?category=software-dev";

async function importJobs() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const jobs = data.jobs.slice(0, 10); // get top 10 jobs only

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
