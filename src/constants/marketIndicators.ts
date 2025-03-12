import { MarketSentiment } from "@/types/news";

export const MARKET_SENTIMENT_THRESHOLDS: Array<{
  sentiment: MarketSentiment;
  min: number;
  max: number;
  color: string;
}> = [
  { sentiment: "Terrible", min: -1.0, max: -0.6, color: "#DC2626" },
  { sentiment: "Bad", min: -0.6, max: -0.2, color: "#F97316" },
  { sentiment: "Neutral", min: -0.2, max: 0.2, color: "#A3A3A3" },
  { sentiment: "Good", min: 0.2, max: 0.6, color: "#22C55E" },
  { sentiment: "Great", min: 0.6, max: 1.0, color: "#15803D" },
];

export const getMarketSentimentFromValue = (
  value: number,
): {
  sentiment: MarketSentiment;
  color: string;
} => {
  const sentimentData = MARKET_SENTIMENT_THRESHOLDS.find(
    (threshold) => value >= threshold.min && value <= threshold.max,
  );

  return sentimentData
    ? { sentiment: sentimentData.sentiment, color: sentimentData.color }
    : { sentiment: "Neutral", color: "#A3A3A3" };
};
