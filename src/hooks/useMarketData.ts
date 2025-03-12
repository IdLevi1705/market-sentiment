import { useState, useEffect } from "react";
import { MarketData, MarketIndex, MarketIndicator } from "@/types/market";
import {
  fetchMarketIndices,
  fetchMarketIndexHistory,
  fetchMarketSentiment,
} from "@/services/marketDataService";
import { getMarketIndicator } from "@/utils/marketSentiment";
import { useNews } from "./useNews";

export const useMarketData = () => {
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [spHistory, setSpHistory] = useState<MarketData[]>([]);
  const [nasdaqHistory, setNasdaqHistory] = useState<MarketData[]>([]);
  const [sentiment, setSentiment] = useState<MarketIndicator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { news } = useNews();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch current market indices
        const marketIndices = await fetchMarketIndices();
        setIndices(marketIndices);

        // Fetch historical data for S&P 500
        const spData = await fetchMarketIndexHistory("SPX", "month");
        setSpHistory(spData);

        // Fetch historical data for NASDAQ
        const nasdaqData = await fetchMarketIndexHistory("IXIC", "month");
        setNasdaqHistory(nasdaqData);

        // Calculate market sentiment from news
        if (news.length > 0) {
          const calculatedSentiment = getMarketIndicator(news);
          setSentiment(calculatedSentiment);
        } else {
          try {
            const sentimentData = await fetchMarketSentiment();
            setSentiment(sentimentData);
          } catch (sentimentError) {
            console.error(
              "Error fetching sentiment, calculating from news instead:",
              sentimentError,
            );
            // If we can't get sentiment data, at least have a neutral placeholder
            setSentiment({
              value: 0,
              label: "Neutral",
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (err) {
        setError("Failed to fetch market data");
        console.error("Error in useMarketData hook:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up interval to refresh data every minute
    const intervalId = setInterval(fetchData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [news.length]);

  return {
    indices,
    spHistory,
    nasdaqHistory,
    sentiment,
    loading,
    error,
  };
};
