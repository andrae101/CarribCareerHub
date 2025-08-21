// api/jsearch.js  (Vercel Serverless Function)
// Requires env var: RAPIDAPI_KEY

export default async function handler(req, res) {
  try {
    const { query = "", page = "1" } = req.query || {};
    const key = process.env.RAPIDAPI_KEY;

    if (!key) {
      return res
        .status(500)
        .json({ error: "Missing RAPIDAPI_KEY (set in Vercel → Project → Settings → Environment Variables)" });
    }
    if (!query.trim()) {
      return res.status(400).json({ error: "Missing required parameter: query" });
    }

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      query
    )}&page=${encodeURIComponent(page)}`;

    const r = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
      }
    });

    const data = await r.json().catch(() => ({}));

    // Helpful CORS header for your static site
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (!r.ok) {
      return res.status(502).json({
        error: "JSearch upstream error",
        status: r.status,
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: "JSearch proxy failed", details: String(err?.message || err) });
  }
}
