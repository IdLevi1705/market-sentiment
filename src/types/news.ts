export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  source: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  category: NewsCategory;
  sentiment?: SentimentAnalysis;
}

export type NewsCategory =
  | "business"
  | "politics"
  | "world"
  | "technology"
  | "general"
  | "all";

export interface RssFeed {
  id: string;
  name: string;
  url: string;
  category: NewsCategory;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1 range
  comparative: number;
  positive: string[];
  negative: string[];
}

// src/types/market.ts
export interface MarketIndicator {
  value: number; // Range from -1 (extreme fear) to 1 (extreme greed)
  label: MarketSentiment;
  timestamp: string;
}

export type MarketSentiment = "Great" | "Good" | "Neutral" | "Bad" | "Terrible";

export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export interface MarketData {
  date: string;
  value: number;
  change?: number;
  changePercent?: number;
}
