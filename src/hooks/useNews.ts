import { useState, useEffect, useCallback, useRef } from "react";
import { NewsItem, NewsCategory } from "@/types/news";
import axios from "axios";
import { isMarketImpactingNews } from "@/utils/newsAnalyzer";
import { NEWS_CATEGORIES } from "@/constants/newsCategories";

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

// For the sentiment graph, we need to track historical sentiment values
interface SentimentHistoryPoint {
  timestamp: number;
  value: number;
  newsCount: number;
  categorySentiment: Record<string, number>;
}

// Generate sample historical data going back 30 days
const generateHistoricalSentiment = (): SentimentHistoryPoint[] => {
  const result: SentimentHistoryPoint[] = [];
  const now = Date.now();

  // Go back 30 days with 4 data points per day (every 6 hours)
  for (let i = 30 * 24 * 60 * 60 * 1000; i >= 0; i -= 6 * 60 * 60 * 1000) {
    const timestamp = now - i;
    const date = new Date(timestamp);

    // Create some variation in the sentiment
    // Use sine wave with some noise for realistic sentiment oscillation
    const dayProgress = date.getHours() / 24;
    const dayOfMonth = date.getDate();

    // Base sentiment follows a sine wave pattern
    const baseSentiment = Math.sin(dayOfMonth / 5) * 0.5; // -0.5 to 0.5

    // Add some daily variation
    const daySentiment = Math.sin(dayProgress * Math.PI * 2) * 0.2; // -0.2 to 0.2

    // Add some random noise
    const noise = (Math.random() - 0.5) * 0.3; // -0.15 to 0.15

    // Combine for final sentiment
    const sentiment = Math.max(
      -0.95,
      Math.min(0.95, baseSentiment + daySentiment + noise),
    );

    // Generate category sentiments with some variation
    const categorySentiment: Record<string, number> = {};

    NEWS_CATEGORIES.forEach((category) => {
      // Each category has its own pattern with phase shift
      const categoryPhaseShift = {
        business: 0,
        politics: Math.PI / 2,
        world: Math.PI,
        technology: Math.PI * 1.5,
      };

      const phase =
        categoryPhaseShift[category.id as keyof typeof categoryPhaseShift] || 0;
      const categoryBase = Math.sin(dayOfMonth / 5 + phase) * 0.6;
      const categoryNoise = (Math.random() - 0.5) * 0.4;

      categorySentiment[category.id] = Math.max(
        -0.95,
        Math.min(0.95, categoryBase + categoryNoise),
      );
    });

    result.push({
      timestamp,
      value: parseFloat(sentiment.toFixed(2)),
      newsCount: Math.floor(Math.random() * 30) + 10, // 10-40 news items
      categorySentiment,
    });
  }

  return result;
};

// Create sample historical data once
const sampleHistoricalSentiment = generateHistoricalSentiment();

export const useNews = (initialCategory?: NewsCategory) => {
  const [news, setNews] = useState<NewsItem[]>(LOCAL_FALLBACK_NEWS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<NewsCategory | undefined>(
    initialCategory,
  );
  const [historicalSentiment, setHistoricalSentiment] = useState<
    SentimentHistoryPoint[]
  >(sampleHistoricalSentiment);

  // Use a ref to track when news updates, to avoid unnecessary history updates
  const lastUpdateRef = useRef<number>(0);

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

          const newsItems =
            response.data.news.length > 0
              ? response.data.news
              : LOCAL_FALLBACK_NEWS;

          setNews(newsItems);

          // Update sentiment history
          updateSentimentHistory(newsItems);
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

  // Calculate sentiment for each category and overall
  const updateSentimentHistory = useCallback(
    (newsItems: NewsItem[]) => {
      // Only update every 30 minutes to avoid too many data points
      const now = Date.now();
      if (
        now - lastUpdateRef.current < 30 * 60 * 1000 &&
        historicalSentiment.length > 0
      ) {
        return;
      }

      lastUpdateRef.current = now;

      // Calculate overall sentiment
      const sentiments = newsItems
        .filter((item) => item.sentiment) // Filter out items without sentiment
        .map((item) => item.sentiment?.score || 0);

      // If no sentiments, don't update
      if (sentiments.length === 0) return;

      // Calculate average sentiment
      const averageSentiment =
        sentiments.reduce((sum, score) => sum + score, 0) / sentiments.length;

      // Calculate per-category sentiment
      const categorySentiment: Record<string, number> = {};

      NEWS_CATEGORIES.forEach((category) => {
        const categoryNews = newsItems.filter(
          (item) => item.category === category.id,
        );
        const categorySentiments = categoryNews
          .filter((item) => item.sentiment)
          .map((item) => item.sentiment?.score || 0);

        if (categorySentiments.length > 0) {
          const categoryAvg =
            categorySentiments.reduce((sum, score) => sum + score, 0) /
            categorySentiments.length;
          categorySentiment[category.id] = parseFloat(categoryAvg.toFixed(2));
        } else {
          // If no news for this category, use a neutral sentiment or the last known value
          const lastKnown =
            historicalSentiment.length > 0
              ? historicalSentiment[historicalSentiment.length - 1]
                  .categorySentiment[category.id]
              : 0;

          categorySentiment[category.id] = lastKnown || 0;
        }
      });

      // Create new history entry
      const newEntry: SentimentHistoryPoint = {
        timestamp: now,
        value: parseFloat(averageSentiment.toFixed(2)),
        newsCount: newsItems.length,
        categorySentiment,
      };

      // Add to history, preserving the historical data
      setHistoricalSentiment((prev) => [...prev, newEntry]);
    },
    [historicalSentiment],
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
    historicalSentiment,
  };
};
