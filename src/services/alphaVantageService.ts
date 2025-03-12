// src/services/alphaVantageService.ts
import axios from "axios";
import { MarketIndex, MarketData } from "../types/news";
import { Stock } from "../types/stock";

// The API key should be in your .env.local file
const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "";
const BASE_URL = "https://www.alphavantage.co/query";

// Function to fetch data for a specific stock symbol
export const fetchStockQuote = async (
  symbol: string,
): Promise<Stock | null> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: API_KEY,
      },
    });

    const quoteData = response.data["Global Quote"];

    if (!quoteData || Object.keys(quoteData).length === 0) {
      console.error("No quote data returned for symbol:", symbol);
      return null;
    }

    return {
      symbol: quoteData["01. symbol"],
      name: symbol, // Alpha Vantage GLOBAL_QUOTE doesn't return company name
      price: parseFloat(quoteData["05. price"]),
      change: parseFloat(quoteData["09. change"]),
      changePercent: parseFloat(
        quoteData["10. change percent"].replace("%", ""),
      ),
      volume: parseInt(quoteData["06. volume"], 10),
      marketCap: 0, // Not provided in this endpoint
    };
  } catch (error) {
    console.error(`Error fetching stock quote for ${symbol}:`, error);
    return null;
  }
};

// Function to fetch company overview (for name and market cap)
export const fetchCompanyOverview = async (
  symbol: string,
): Promise<{ name: string; marketCap: number } | null> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: "OVERVIEW",
        symbol,
        apikey: API_KEY,
      },
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      console.error("No company data returned for symbol:", symbol);
      return null;
    }

    return {
      name: response.data.Name || symbol,
      marketCap: parseInt(response.data.MarketCapitalization || "0", 10),
    };
  } catch (error) {
    console.error(`Error fetching company overview for ${symbol}:`, error);
    return null;
  }
};

// Function to fetch historical data for a market index
export const fetchMarketIndexHistory = async (
  symbol: string,
  period: "day" | "week" | "month" | "year" = "month",
): Promise<MarketData[]> => {
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

    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: timeSeriesFunction,
        symbol,
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
      console.error(`No time series data returned for ${symbol}`);
      return [];
    }

    // Convert Alpha Vantage data format to our MarketData format
    const marketData: MarketData[] = Object.entries(timeSeriesData)
      .map(([date, values]: [string, unknown]) => {
        const closePrice = parseFloat(
          (values as { [key: string]: string })["4. close"],
        );
        return {
          date,
          value: closePrice,
          // You might need to calculate change and changePercent if needed
          change: 0,
          changePercent: 0,
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate change and percent change
    for (let i = 1; i < marketData.length; i++) {
      const previousValue = marketData[i - 1].value;
      const currentValue = marketData[i].value;
      marketData[i].change = currentValue - previousValue;
      marketData[i].changePercent =
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

    return marketData.filter((item) => new Date(item.date) >= cutoffDate);
  } catch (error) {
    console.error(`Error fetching market index history for ${symbol}:`, error);
    return [];
  }
};

// Function to fetch SPX and NASDAQ indices data
export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  try {
    // Alpha Vantage doesn't have a dedicated endpoint for market indices
    // We'll use SPY for S&P 500 and QQQ for NASDAQ approximation
    const spyData = await fetchStockQuote("SPY");
    const qqqData = await fetchStockQuote("QQQ");

    const indices: MarketIndex[] = [];

    if (spyData) {
      indices.push({
        symbol: "SPX",
        name: "S&P 500",
        price: spyData.price,
        change: spyData.change,
        changePercent: spyData.changePercent,
        timestamp: new Date().toISOString(),
      });
    }

    if (qqqData) {
      indices.push({
        symbol: "IXIC",
        name: "NASDAQ Composite",
        price: qqqData.price,
        change: qqqData.change,
        changePercent: qqqData.changePercent,
        timestamp: new Date().toISOString(),
      });
    }

    return indices;
  } catch (error) {
    console.error("Error fetching market indices:", error);
    return [];
  }
};

// Function to get top gainers and losers
// Note: Alpha Vantage doesn't have a direct endpoint for this,
// so we'll need a different approach or use mock data for now
