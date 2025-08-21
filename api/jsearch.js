export default async function handler(req, res) {
  const { query = "", location = "Jamaica" } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing required parameter: query" });
  }

  const apiKey = process.env.RAPIDAPI_KEY; // <-- uses the key you set

  try {
    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
      `${query} ${location}`
    )}&page=1&num_pages=1`;

    const r = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const data = await r.json();
    res.status(r.ok ? 200 : 500).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
  }
}
