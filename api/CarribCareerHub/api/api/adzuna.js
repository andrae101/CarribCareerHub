// api/adzuna.js
// Proxies Adzuna so your API keys stay secret on the server.
// Usage (after you add env vars + redeploy):
//   /api/adzuna?what=developer&where=Jamaica&page=1&per_page=10&country=us

export default async function handler(req, res) {
  try {
    const {
      what = "",
      where = "",
      page = "1",
      per_page = "10",
      country = "us" // you can change to 'gb' or others supported by Adzuna
    } = req.query || {};

    const app_id  = process.env.ADZUNA_APP_ID;
    const app_key = process.env.ADZUNA_APP_KEY;

    if (!app_id || !app_key) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(500).json({ error: "Missing ADZUNA_APP_ID or ADZUNA_APP_KEY (set in Vercel → Project → Environment Variables)" });
    }

    const url =
      `https://api.adzuna.com/v1/api/jobs/${encodeURIComponent(country)}/search/${encodeURIComponent(page)}` +
      `?app_id=${encodeURIComponent(app_id)}` +
      `&app_key=${encodeURIComponent(app_key)}` +
      `&results_per_page=${encodeURIComponent(per_page)}` +
      `&what=${encodeURIComponent(what)}` +
      `&where=${encodeURIComponent(where)}` +
      `&content-type=application/json`;

    const r = await fetch(url);
    const data = await r.json().catch(() => ({}));

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: e.message || "Adzuna proxy failed" });
  }
}
