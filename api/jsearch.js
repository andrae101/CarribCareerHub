export default async function handler(req, res) {
  try {
    const { query = "", page = "1" } = req.query || {};
    const key = process.env.RAPIDAPI_KEY;
    if (!key) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(500).json({ error: "Missing RAPIDAPI_KEY" });
    }
    const r = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${encodeURIComponent(page)}`,
      { headers: { "X-RapidAPI-Key": key, "X-RapidAPI-Host": "jsearch.p.rapidapi.com" } }
    );
    const data = await r.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(r.ok ? 200 : 500).json(data);
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: e.message || "JSearch proxy failed" });
  }
}
