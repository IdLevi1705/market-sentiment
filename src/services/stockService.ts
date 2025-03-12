// src/services/stockService.ts
import axios from "axios";
import { Stock, StockMover } from "@/types/stock";

// Function to fetch top gaining stocks
export const fetchTopGainers = async (
  limit: number = 10,
): Promise<StockMover[]> => {
  const response = await axios.get(`/api/stocks/gainers?limit=${limit}`);
  return response.data.gainers;
};

// Function to fetch top losing stocks
export const fetchTopLosers = async (
  limit: number = 10,
): Promise<StockMover[]> => {
  const response = await axios.get(`/api/stocks/losers?limit=${limit}`);
  return response.data.losers;
};

// Function to search for a specific stock
export const searchStock = async (query: string): Promise<Stock[]> => {
  const response = await axios.get(
    `/api/stocks/search?q=${encodeURIComponent(query)}`,
  );
  return response.data.stocks;
};
