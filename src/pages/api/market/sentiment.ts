// src/pages/api/market/sentiment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MarketIndicator } from "@/types/news";
import { NewsItem } from "@/types/news";
import { getMarketSentimentFromValue } from "@/constants/marketIndicators";
import { withCache } from "@/utils/apiCache";

// Calculate market sentiment based on news
const calculateMarketSentiment = (newsItems: NewsItem[]): number => {
  if (!newsItems.length) return 0;

  // Filter for recent news (last 24 hours)
  const recentDate = new Date();
  recentDate.setHours(recentDate.getHours() - 24);

  const recentNews = newsItems.filter(
    (item) => new Date(item.publishedAt) >= recentDate,
  );

  if (!recentNews.length) return 0;

  // Weight business news more heavily
  const weightedScores = recentNews.map((item) => {
    const score = item.sentiment?.score || 0;
    const weight = item.category === "business" ? 2 : 1;
    return score * weight;
  });

  // Calculate weighted average
  const totalWeight = recentNews.reduce(
    (sum, item) => sum + (item.category === "business" ? 2 : 1),
    0,
  );

  const weightedAverage =
    weightedScores.reduce((sum, score) => sum + score, 0) / totalWeight;

  // Ensure result is between -1 and 1
  return Math.max(-1, Math.min(1, weightedAverage));
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch news to analyze
    const newsResponse = await axios.get("/api/news");
    const newsItems = newsResponse.data.news;

    if (!newsItems || !Array.isArray(newsItems) || newsItems.length === 0) {
      return res
        .status(404)
        .json({ error: "No news data available for sentiment analysis" });
    }

    // Calculate sentiment
    const sentimentValue = calculateMarketSentiment(newsItems);
    const { sentiment, color } = getMarketSentimentFromValue(sentimentValue);

    const marketSentiment: MarketIndicator = {
      value: parseFloat(sentimentValue.toFixed(2)),
      label: sentiment,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json({ sentiment: marketSentiment, color });
  } catch (error) {
    console.error("Error calculating market sentiment:", error);
    res.status(500).json({ error: "Failed to calculate market sentiment" });
  }
}

// Cache the response for 30 minutes (1800000 ms)
export default withCache(handler, 1800000);
