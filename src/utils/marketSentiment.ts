import { NewsItem } from "@/types/news";
import { MarketIndicator, MarketSentiment } from "../types/news";
import { getMarketSentimentFromValue } from "@/constants/marketIndicators";

// Calculate market sentiment based on news
export const calculateMarketSentiment = (newsItems: NewsItem[]): number => {
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

// Get market indicator from news
export const getMarketIndicator = (newsItems: NewsItem[]): MarketIndicator => {
  const sentimentValue = calculateMarketSentiment(newsItems);
  const { sentiment } = getMarketSentimentFromValue(sentimentValue);

  return {
    value: sentimentValue,
    label: sentiment,
    timestamp: new Date().toISOString(),
  };
};
