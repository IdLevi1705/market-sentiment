// src/pages/api/news/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { fetchAllNewsFeeds, fetchNewsByCategory } from "@/services/newsService";
import { withCache } from "@/utils/apiCache";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { category } = req.query;

    console.log("API received category:", category);

    let newsItems;
    if (category && typeof category === "string") {
      console.log(`Fetching news for category: ${category}`);
      newsItems = await fetchNewsByCategory(category);
    } else {
      console.log("Fetching all news feeds");
      newsItems = await fetchAllNewsFeeds();
    }

    console.log(`Returning ${newsItems.length} news items`);

    res.status(200).json({ news: newsItems });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}

// Cache news for 10 minutes (600000 ms)
export default withCache(handler, 600000);
