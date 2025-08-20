// api/jobs.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://remotive.com/api/remote-jobs");
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
