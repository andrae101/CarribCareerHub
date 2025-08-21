export default async function handler(req, res) {
  const { what, where } = req.query;

  if (!what || !where) {
    return res.status(400).json({ error: "Missing required parameters: what and where" });
  }

  const app_id = process.env.ADZUNA_APP_ID;
  const app_key = process.env.ADZUNA_APP_KEY;

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${encodeURIComponent(what)}&where=${encodeURIComponent(where)}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
  }
}
