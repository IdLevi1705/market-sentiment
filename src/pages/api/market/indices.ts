// src/pages/api/market/indices.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MarketIndex } from "@/types/news";
import { withCache } from "@/utils/apiCache";

// Use server-side environment variable for better security
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch data for SPY (S&P 500 ETF) as a proxy for S&P 500
    const spyResponse = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: "SPY",
        apikey: API_KEY,
      },
    });

    // Fetch data for QQQ (NASDAQ-100 ETF) as a proxy for NASDAQ
    const qqqResponse = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: "QQQ",
        apikey: API_KEY,
      },
    });

    // Fetch data for DIA (Dow Jones ETF) as a proxy for Dow Jones
    const diaResponse = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: "DIA",
        apikey: API_KEY,
      },
    });

    const indices: MarketIndex[] = [];

    // Process SPY data for S&P 500
    if (
      !spyResponse.data["Global Quote"] ||
      Object.keys(spyResponse.data["Global Quote"]).length === 0
    ) {
      throw new Error("No data returned for SPY");
    }

    const spyData = spyResponse.data["Global Quote"];
    indices.push({
      symbol: "SPX",
      name: "S&P 500",
      price: parseFloat(spyData["05. price"]),
      change: parseFloat(spyData["09. change"]),
      changePercent: parseFloat(spyData["10. change percent"].replace("%", "")),
      timestamp: new Date().toISOString(),
    });

    // Process QQQ data for NASDAQ
    if (
      !qqqResponse.data["Global Quote"] ||
      Object.keys(qqqResponse.data["Global Quote"]).length === 0
    ) {
      throw new Error("No data returned for QQQ");
    }

    const qqqData = qqqResponse.data["Global Quote"];
    indices.push({
      symbol: "IXIC",
      name: "NASDAQ Composite",
      price: parseFloat(qqqData["05. price"]),
      change: parseFloat(qqqData["09. change"]),
      changePercent: parseFloat(qqqData["10. change percent"].replace("%", "")),
      timestamp: new Date().toISOString(),
    });

    // Process DIA data for Dow Jones
    if (
      !diaResponse.data["Global Quote"] ||
      Object.keys(diaResponse.data["Global Quote"]).length === 0
    ) {
      throw new Error("No data returned for DIA");
    }

    const diaData = diaResponse.data["Global Quote"];
    indices.push({
      symbol: "DJI",
      name: "Dow Jones Industrial Average",
      price: parseFloat(diaData["05. price"]),
      change: parseFloat(diaData["09. change"]),
      changePercent: parseFloat(diaData["10. change percent"].replace("%", "")),
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ indices });
  } catch (error) {
    console.error("Error fetching market indices:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
}

// Cache the response for 5 minutes (300000 ms)
export default withCache(handler, 300000);
