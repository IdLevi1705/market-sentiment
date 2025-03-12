// src/pages/api/stocks/losers.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { StockMover } from "@/types/stock";
import { withCache } from "@/utils/apiCache";

// Use server-side environment variable for better security
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Using the same list of stocks as in gainers.ts
const COMMON_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corporation" },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "META", name: "Meta Platforms, Inc." },
  { symbol: "TSLA", name: "Tesla, Inc." },
  { symbol: "NVDA", name: "NVIDIA Corporation" },
  { symbol: "JPM", name: "JPMorgan Chase & Co." },
  { symbol: "V", name: "Visa Inc." },
  { symbol: "WMT", name: "Walmart Inc." },
  { symbol: "PG", name: "Procter & Gamble Company" },
  { symbol: "JNJ", name: "Johnson & Johnson" },
  { symbol: "MA", name: "Mastercard Incorporated" },
  { symbol: "UNH", name: "UnitedHealth Group Incorporated" },
  { symbol: "HD", name: "The Home Depot, Inc." },
  { symbol: "BAC", name: "Bank of America Corporation" },
  { symbol: "PFE", name: "Pfizer Inc." },
  { symbol: "CSCO", name: "Cisco Systems, Inc." },
  { symbol: "VZ", name: "Verizon Communications Inc." },
  { symbol: "ADBE", name: "Adobe Inc." },
  // Add more stocks as needed
];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { limit } = req.query;
  const limitNum = limit ? parseInt(limit as string, 10) : 10;

  try {
    // Fetch data for all the stocks in our list
    const stockPromises = COMMON_STOCKS.map(async (stock) => {
      try {
        const response = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "GLOBAL_QUOTE",
            symbol: stock.symbol,
            apikey: API_KEY,
          },
        });

        const quoteData = response.data["Global Quote"];

        if (!quoteData || Object.keys(quoteData).length === 0) {
          return null;
        }

        return {
          symbol: stock.symbol,
          name: stock.name,
          price: parseFloat(quoteData["05. price"]),
          change: parseFloat(quoteData["09. change"]),
          changePercent: parseFloat(
            quoteData["10. change percent"].replace("%", ""),
          ),
          volume: parseInt(quoteData["06. volume"], 10),
          marketCap: 0, // Not available in this endpoint
          rank: 0, // Will set this after sorting
        };
      } catch (error) {
        console.error(`Error fetching data for ${stock.symbol}:`, error);
        return null;
      }
    });

    // Wait for all promises to resolve
    const stocksData = (await Promise.all(stockPromises)).filter(
      Boolean,
    ) as StockMover[];

    if (stocksData.length === 0) {
      return res.status(404).json({ error: "No stock data available" });
    }

    // Sort by percent change (ascending) to get top losers
    stocksData.sort((a, b) => a.changePercent - b.changePercent);

    // Assign ranks and take the top N based on limit
    const losers = stocksData
      .filter((stock) => stock.changePercent < 0)
      .slice(0, limitNum)
      .map((stock, index) => ({
        ...stock,
        rank: index + 1,
      }));

    if (losers.length === 0) {
      return res.status(404).json({ error: "No losing stocks found" });
    }

    res.status(200).json({ losers });
  } catch (error) {
    console.error("Error fetching top losers:", error);
    res.status(500).json({ error: "Failed to fetch top losers" });
  }
}

// Cache the response for 5 minutes (300000 ms)
export default withCache(handler, 300000);
