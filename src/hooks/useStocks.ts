import { useState, useEffect } from "react";
import { StockMover } from "@/types/stock";
import { fetchTopGainers, fetchTopLosers } from "@/services/stockService";

export const useStockMovers = (limit: number = 10) => {
  const [topGainers, setTopGainers] = useState<StockMover[]>([]);
  const [topLosers, setTopLosers] = useState<StockMover[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch top gaining stocks
        const gainers = await fetchTopGainers(limit);
        setTopGainers(gainers);

        // Fetch top losing stocks
        const losers = await fetchTopLosers(limit);
        setTopLosers(losers);
      } catch (err) {
        setError("Failed to fetch stock movers");
        console.error("Error in useStockMovers hook:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up interval to refresh data every minute
    const intervalId = setInterval(fetchData, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [limit]);

  return {
    topGainers,
    topLosers,
    loading,
    error,
  };
};
