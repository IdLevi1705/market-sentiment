// src/utils/newsAnalyzer.ts
import Sentiment from "sentiment";
import { NewsItem, SentimentAnalysis } from "@/types/news";
import { marketKeywords, marketSentimentLabels } from "./constants";

// Create a custom sentiment instance
const sentiment = new Sentiment();

// Add market-specific vocabulary to improve sentiment accuracy
sentiment.registerLanguage("en", {
  ...marketSentimentLabels,
});

// Economic indicator terms with their importance for markets
const economicIndicators = {
  // Important economic terms that can affect market sentiment
  gdp: 2,
  inflation: 2,
  cpi: 2, // Consumer Price Index
  ppi: 2, // Producer Price Index
  unemployment: 2,
  jobs: 2,
  employment: 2,
  fed: 2, // Federal Reserve
  fomc: 2, // Federal Open Market Committee
  "interest rate": 2,
  "monetary policy": 2,
  "fiscal policy": 2,
  "trade deficit": 2,
  "trade surplus": 2,
  "economic growth": 2,
  "economic contraction": 2,
  housing: 1.5,
  manufacturing: 1.5,
  "retail sales": 1.5,
  "consumer confidence": 1.5,
  "business confidence": 1.5,
  "supply chain": 1.5,
  tariff: 1.5,
  deficit: 1.5,
  debt: 1.5,
  budget: 1.5,
};

// Analyze text sentiment
export const analyzeSentiment = (text: string): SentimentAnalysis => {
  // Check if text contains any economic indicator terms and adjust scoring
  let economicIndicatorMultiplier = 1;
  const lowerText = text.toLowerCase();

  Object.entries(economicIndicators).forEach(([term, importance]) => {
    if (lowerText.includes(term)) {
      // Economic indicators increase the importance of the sentiment
      economicIndicatorMultiplier *= importance as number;
    }
  });

  // Analyze the sentiment using our customized sentiment instance
  const result = sentiment.analyze(text);

  // Apply the economic indicator multiplier
  const adjustedScore = result.comparative * economicIndicatorMultiplier;

  // Ensure the score stays within -1 to 1 range
  const normalizedScore = Math.max(-1, Math.min(1, adjustedScore));

  return {
    score: normalizedScore,
    comparative: result.comparative,
    positive: result.positive,
    negative: result.negative,
  };
};

// Analyze a single news item
export const analyzeNewsItem = (newsItem: NewsItem): NewsItem => {
  // Combine title and description for analysis
  const textToAnalyze = `${newsItem.title} ${newsItem.description}`;

  // Get the sentiment analysis
  const sentimentResult = analyzeSentiment(textToAnalyze);

  // Return the news item with sentiment analysis
  return {
    ...newsItem,
    sentiment: sentimentResult,
  };
};

// Process a batch of news items
export const processBatchNewsItems = (newsItems: NewsItem[]): NewsItem[] => {
  return newsItems.map((item) => analyzeNewsItem(item));
};

// Determine if a news item is market-impacting based on sentiment and keywords
export const isMarketImpactingNews = (newsItem: NewsItem): boolean => {
  if (!newsItem) return false;

  const text = `${newsItem.title} ${newsItem.description}`.toLowerCase();

  // Check for market keywords
  const hasPositiveKeywords = marketKeywords.positive.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  const hasNegativeKeywords = marketKeywords.negative.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  const hasMetricKeywords = marketKeywords.metrics.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  const hasEventKeywords = marketKeywords.events.some((keyword) =>
    text.includes(keyword.toLowerCase()),
  );

  // Check for strong sentiment
  const hasStrongSentiment =
    newsItem.sentiment !== undefined &&
    Math.abs(newsItem.sentiment.score) > 0.25;

  // Business news with financial keywords is likely market-impacting
  const isBusinessWithKeywords =
    newsItem.category === "business" &&
    (hasPositiveKeywords || hasNegativeKeywords || hasMetricKeywords);

  // Non-business news needs to be more significant to be market-impacting
  const isSignificantNonBusiness =
    newsItem.category !== "business" &&
    hasStrongSentiment &&
    (hasPositiveKeywords || hasNegativeKeywords || hasEventKeywords);

  return (
    isBusinessWithKeywords || isSignificantNonBusiness || hasStrongSentiment
  );
};
