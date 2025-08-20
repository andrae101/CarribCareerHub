// api/jobs.js
export default async function handler(req, res) {
  const response = await fetch("https://remotive.com/api/remote-jobs");
  const data = await response.json();

  res.status(200).json(data);
}
