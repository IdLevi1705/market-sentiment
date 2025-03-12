// src/services/marketDataService.ts
import axios from "axios";
import { MarketData, MarketIndex, MarketIndicator } from "@/types/news";

// Function to fetch market indices (S&P 500, NASDAQ)
export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  const response = await axios.get("/api/market/indices");
  return response.data.indices;
};

// Function to fetch historical data for a specific market index
export const fetchMarketIndexHistory = async (
  symbol: string,
  period: "day" | "week" | "month" | "year" = "month",
): Promise<MarketData[]> => {
  const response = await axios.get(
    `/api/market/history/${symbol}?period=${period}`,
  );
  return response.data.history;
};

// Function to fetch the current market sentiment indicator
export const fetchMarketSentiment = async (): Promise<MarketIndicator> => {
  try {
    // For sentiment, we'll use news analysis from our API
    const response = await axios.get("/api/market/sentiment");
    return response.data.sentiment;
  } catch (error) {
    console.error("Error fetching market sentiment:", error);
    throw error;
  }
};
