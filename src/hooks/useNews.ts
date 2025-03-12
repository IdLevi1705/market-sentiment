// src/hooks/useNews.ts
import { useState, useEffect, useCallback } from "react";
import { NewsItem, NewsCategory } from "@/types/news";
import axios from "axios";
import { isMarketImpactingNews } from "@/utils/newsAnalyzer";

// Local fallback news in case everything else fails
const LOCAL_FALLBACK_NEWS: NewsItem[] = [
  {
    id: "local-business",
    title: "Market Analysis Available in Dashboard",
    description: "Check the dashboard for the latest market analysis and news.",
    source: "MarketSense",
    url: "/",
    publishedAt: new Date().toISOString(),
    category: "business",
    sentiment: { score: 0, comparative: 0, positive: [], negative: [] },
  },
  {
    id: "local-politics",
    title: "Political Updates",
    description: "Political news feed is currently being refreshed.",
    source: "MarketSense",
    url: "/",
    publishedAt: new Date().toISOString(),
    category: "politics",
    sentiment: { score: 0, comparative: 0, positive: [], negative: [] },
  },
  {
    id: "local-world",
    title: "Global Market Indicators",
    description:
      "Global market indicators are available in the Markets section.",
    source: "MarketSense",
    url: "/markets",
    publishedAt: new Date().toISOString(),
    category: "world",
    sentiment: { score: 0, comparative: 0, positive: [], negative: [] },
  },
  {
    id: "local-technology",
    title: "Tech Sector Updates",
    description:
      "Technology sector updates are available in the Stocks section.",
    source: "MarketSense",
    url: "/stocks",
    publishedAt: new Date().toISOString(),
    category: "technology",
    sentiment: { score: 0, comparative: 0, positive: [], negative: [] },
  },
];

export const useNews = (initialCategory?: NewsCategory) => {
  const [news, setNews] = useState<NewsItem[]>(LOCAL_FALLBACK_NEWS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory | undefined>(
    initialCategory,
  );

  // Define fetchNews as useCallback to avoid recreating it unnecessarily
  const fetchNews = useCallback(
    async (cat?: NewsCategory) => {
      try {
        setLoading(true);
        setError(null);

        console.log(`useNews is fetching news with category: ${cat || "all"}`);

        // Build the API URL based on whether a category is specified
        const url = cat
          ? `/api/news?category=${encodeURIComponent(cat)}`
          : "/api/news";

        console.log(`Making request to: ${url}`);

        // Fetch news from our API endpoint
        const response = await axios.get(url);

        // Check if we have a valid response with news array
        if (response.data && Array.isArray(response.data.news)) {
          console.log(`Received ${response.data.news.length} news items`);
          setNews(
            response.data.news.length > 0
              ? response.data.news
              : LOCAL_FALLBACK_NEWS,
          );
        }
        // Special case where API returns error field in the response
        else if (response.data && response.data.error) {
          console.error("API returned error:", response.data.error);
          throw new Error(response.data.error);
        }
        // Invalid response format
        else {
          console.error("Invalid news data format:", response.data);
          throw new Error("Invalid news data format received");
        }
      } catch (err) {
        console.error("Error in useNews hook:", err);

        // Keep the current news if we have any
        if (news.length === 0) {
          setNews(LOCAL_FALLBACK_NEWS);
        }

        // Set error message
        setError(err instanceof Error ? err.message : "Failed to fetch news");
      } finally {
        setLoading(false);
      }
    },
    [news.length],
  );

  // Effect to fetch news when component mounts or category changes
  useEffect(() => {
    fetchNews(category);

    // Set up interval to refresh news every 10 minutes
    const intervalId = setInterval(() => fetchNews(category), 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [category, fetchNews]);

  // Function to change category and refetch
  const changeCategory = useCallback(
    (newCategory?: NewsCategory) => {
      setCategory(newCategory);
      fetchNews(newCategory);
    },
    [fetchNews],
  );

  // Function to retry fetching news with current category
  const retryFetch = useCallback(() => {
    fetchNews(category);
  }, [category, fetchNews]);

  // Filter for market-impacting news
  const marketImpactingNews = news.filter(isMarketImpactingNews);

  // Filter news by category
  const getNewsByCategory = useCallback(
    (cat: NewsCategory) => {
      return news.filter((item) => item.category === cat);
    },
    [news],
  );

  return {
    news,
    marketImpactingNews,
    getNewsByCategory,
    loading,
    error,
    retryFetch,
    changeCategory,
    currentCategory: category,
  };
};
