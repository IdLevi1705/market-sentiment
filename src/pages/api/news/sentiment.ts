import type { NextApiRequest, NextApiResponse } from "next";
import { processBatchNewsItems } from "@/utils/newsAnalyzer";
import { NewsItem } from "@/types/news";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { newsItems } = req.body as { newsItems: NewsItem[] };

      if (!Array.isArray(newsItems)) {
        return res.status(400).json({ error: "Invalid newsItems format" });
      }

      const analyzedNews = processBatchNewsItems(newsItems);

      res.status(200).json({ analyzedNews });
    } catch (error) {
      console.error("Error analyzing news sentiment:", error);
      res.status(500).json({ error: "Failed to analyze news sentiment" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
