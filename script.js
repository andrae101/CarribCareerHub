import { createClient } from '@supabase/supabase-js'

// Replace with your own Supabase project values
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co"
const SUPABASE_ANON_KEY = "your-anon-public-key"

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM fully loaded, fetching jobs...");

  loadJobs()
})

async function loadJobs() {
  const { data: jobs, error } = await supabase
    .from('Jobs')
    .select('*')

  if (error) {
    console.error("❌ Error fetching jobs:", error)
    return
  }

  console.log("📦 Jobs from Supabase:", jobs)

  const jobList = document.getElementById("job-list")
  if (!jobList) {
    console.warn("⚠️ No #job-list element found in HTML")
    return
  }

  jobList.innerHTML = jobs.map(job => `
    <div class="job-card">
      <h3>${job.Title}</h3>
      <p><strong>${job.Company}</strong> - ${job.Location}</p>
      <p>${job.Description}</p>
    </div>
  `).join("")
}
