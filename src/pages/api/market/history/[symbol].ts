// src/pages/api/market/history/[symbol].ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { MarketData } from "@/types/news";
import { withCache } from "@/utils/apiCache";

// Use server-side environment variable for better security
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { symbol, period } = req.query;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Symbol is required" });
  }

  // Map market indices to their ETF proxies
  const symbolMap: { [key: string]: string } = {
    SPX: "SPY", // S&P 500 -> SPY ETF
    IXIC: "QQQ", // NASDAQ -> QQQ ETF
    DJI: "DIA", // Dow Jones -> DIA ETF
  };

  // Use the actual symbol or its ETF proxy
  const stockSymbol = symbolMap[symbol] || symbol;

  try {
    // Determine the appropriate time series function based on the period
    let timeSeriesFunction = "TIME_SERIES_DAILY";
    let outputSize = "compact"; // Returns the latest 100 data points

    // For intraday data, if needed
    if (period === "day") {
      timeSeriesFunction = "TIME_SERIES_INTRADAY";
      outputSize = "full";
    } else if (period === "year") {
      outputSize = "full"; // For a year, we need more data points
    }

    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: timeSeriesFunction,
        symbol: stockSymbol,
        interval: "60min", // Only used for intraday
        outputsize: outputSize,
        apikey: API_KEY,
      },
    });

    // Handle different response formats based on the time series function
    let timeSeriesData;
    if (timeSeriesFunction === "TIME_SERIES_INTRADAY") {
      timeSeriesData = response.data["Time Series (60min)"];
    } else {
      timeSeriesData = response.data["Time Series (Daily)"];
    }

    if (!timeSeriesData || Object.keys(timeSeriesData).length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified symbol" });
    }

    // Convert Alpha Vantage data format to our MarketData format
    let history: MarketData[] = Object.entries(timeSeriesData)
      .map(([date, values]: [string, unknown]) => {
        const closePrice = parseFloat(
          (values as { [key: string]: string })["4. close"],
        );
        return {
          date,
          value: closePrice,
          change: 0,
          changePercent: 0,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate change and percent change
    for (let i = 1; i < history.length; i++) {
      const previousValue = history[i - 1].value;
      const currentValue = history[i].value;
      history[i].change = currentValue - previousValue;
      history[i].changePercent =
        ((currentValue - previousValue) / previousValue) * 100;
    }

    // Filter based on period
    const now = new Date();
    const cutoffDate = new Date();

    if (period === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (period === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (period === "year") {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    } else {
      cutoffDate.setDate(now.getDate() - 1); // 1 day
    }

    history = history.filter((item) => new Date(item.date) >= cutoffDate);

    if (history.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the specified time period" });
    }

    res.status(200).json({ history });
  } catch (error) {
    console.error(`Error fetching ${symbol} historical data:`, error);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
}

// Cache the response for 15 minutes (900000 ms)
export default withCache(handler, 900000);
