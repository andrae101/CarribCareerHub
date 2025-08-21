export default async function handler(req, res) {
  const { query, location } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing required parameter: query" });
  }

  const apiKey = process.env.JSEARCH_API_KEY;

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location || "USA")}&num_pages=1`;

  try {
    const r = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const data = await r.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs", details: error.message });
  }
}
