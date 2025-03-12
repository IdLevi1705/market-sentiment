// src/services/newsService.ts
import axios from "axios";
import Parser from "rss-parser";
import { NewsItem, RssFeed, SentimentAnalysis } from "@/types/news";
import { processBatchNewsItems } from "@/utils/newsAnalyzer";

const parser = new Parser();

// Simple and reliable RSS feeds that are more likely to work
export const LIVE_RSS_FEEDS: RssFeed[] = [
  // Business/Finance News
  {
    id: "yahoo-finance",
    name: "Yahoo Finance",
    url: "https://finance.yahoo.com/news/rssindex",
    category: "business",
  },
  {
    id: "cnbc-business",
    name: "CNBC Business",
    url: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    category: "business",
  },

  // Political News
  {
    id: "npr-politics",
    name: "NPR Politics",
    url: "https://feeds.npr.org/1014/rss.xml",
    category: "politics",
  },

  // World News
  {
    id: "npr-world",
    name: "NPR World",
    url: "https://feeds.npr.org/1004/rss.xml",
    category: "world",
  },

  // Technology News
  {
    id: "theverge",
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
    category: "technology",
  },
];

// Hardcoded fallback news items
const FALLBACK_NEWS_ITEMS: NewsItem[] = [
  {
    id: "fallback-business-1",
    title: "Markets React to Economic Data",
    description:
      "Financial markets showed mixed reactions to the latest economic indicators.",
    content: "",
    source: "MarketSense Fallback",
    url: "#",
    publishedAt: new Date().toISOString(),
    category: "business",
    sentiment: {
      score: 0.1,
      comparative: 0.1,
      positive: ["react"],
      negative: ["mixed"],
    },
  },
  {
    id: "fallback-politics-1",
    title: "Government Announces New Policy Framework",
    description:
      "A new policy framework aimed at economic growth was introduced today.",
    content: "",
    source: "MarketSense Fallback",
    url: "#",
    publishedAt: new Date().toISOString(),
    category: "politics",
    sentiment: {
      score: 0.2,
      comparative: 0.2,
      positive: ["growth"],
      negative: [],
    },
  },
  {
    id: "fallback-world-1",
    title: "Global Markets Respond to International Developments",
    description:
      "International markets are adjusting to new global economic realities.",
    content: "",
    source: "MarketSense Fallback",
    url: "#",
    publishedAt: new Date().toISOString(),
    category: "world",
    sentiment: {
      score: -0.1,
      comparative: -0.1,
      positive: [],
      negative: ["adjusting"],
    },
  },
  {
    id: "fallback-technology-1",
    title: "Tech Companies Announce Quarterly Results",
    description:
      "Major technology companies have reported their quarterly earnings.",
    content: "",
    source: "MarketSense Fallback",
    url: "#",
    publishedAt: new Date().toISOString(),
    category: "technology",
    sentiment: { score: 0, comparative: 0, positive: [], negative: [] },
  },
];

// Function to fetch RSS directly as text to avoid parsing issues
const fetchRssAsText = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MarketSense/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      // Prevent axios from trying to parse XML
      responseType: "text",
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching RSS as text from ${url}:`, error);
    throw error;
  }
};

// Function to fetch and parse an RSS feed
const fetchRssFeed = async (feed: RssFeed): Promise<NewsItem[]> => {
  try {
    console.log(`Attempting to fetch RSS feed: ${feed.name}`);

    // Try direct fetch first
    let xmlContent: string;
    try {
      xmlContent = await fetchRssAsText(feed.url);
    } catch (directFetchError) {
      console.error(`Direct fetch failed for ${feed.name}, trying proxy...`);

      // If direct fetch fails, try through our proxy
      const proxyUrl = `/api/proxy/rss?url=${encodeURIComponent(feed.url)}`;
      const proxyResponse = await axios.get(proxyUrl);
      xmlContent = proxyResponse.data;
    }

    // Parse the RSS content
    const feedContent = await parser.parseString(xmlContent);

    if (!feedContent.items || feedContent.items.length === 0) {
      console.log(`No items in feed: ${feed.name}`);
      return [];
    }

    console.log(
      `Successfully parsed ${feedContent.items.length} items from ${feed.name}`,
    );

    return feedContent.items.map((item) => ({
      id:
        item.guid ||
        `${feed.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title || "No title",
      description:
        item.contentSnippet || item.summary || "No description available",
      content: item.content || item["content:encoded"] || "",
      source: feed.name,
      url: item.link || "#",
      imageUrl: extractImageFromContent(
        item.content || item["content:encoded"] || "",
      ),
      publishedAt: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      category: feed.category,
      sentiment: undefined, // Will be added by the analyzer
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${feed.name}:`, error);
    return [];
  }
};

// Helper function to extract image URL from content
const extractImageFromContent = (content: string): string | undefined => {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : undefined;
};

// Function to fetch all RSS feeds
export const fetchAllNewsFeeds = async (): Promise<NewsItem[]> => {
  console.log("Fetching all news feeds");

  try {
    const feedPromises = LIVE_RSS_FEEDS.map((feed) => fetchRssFeed(feed));
    const allFeedItems = await Promise.all(feedPromises);

    // Flatten the array of arrays
    let allNews = allFeedItems.flat();

    console.log(`Total news items fetched: ${allNews.length}`);

    // If we couldn't fetch any news, use fallback data
    if (allNews.length === 0) {
      console.log("Using fallback news items");
      allNews = [...FALLBACK_NEWS_ITEMS];
    }

    // Sort by publish date (newest first)
    const sortedNews = allNews.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    // Process for sentiment analysis
    return processBatchNewsItems(sortedNews);
  } catch (error) {
    console.error("Error fetching all news feeds:", error);

    // Always return at least the fallback items
    return [...FALLBACK_NEWS_ITEMS];
  }
};

// Function to fetch news by category
export const fetchNewsByCategory = async (
  category: string,
): Promise<NewsItem[]> => {
  console.log(`Fetching news for category: ${category}`);

  try {
    // Get feeds matching this category
    const categoryFeeds = LIVE_RSS_FEEDS.filter(
      (feed) => feed.category === category,
    );

    if (categoryFeeds.length === 0) {
      console.warn(`No feeds found for category: ${category}`);
      // Return fallback items for this category
      return FALLBACK_NEWS_ITEMS.filter((item) => item.category === category);
    }

    // Try to fetch from each feed
    const feedPromises = categoryFeeds.map((feed) => fetchRssFeed(feed));
    const categoryFeedItems = await Promise.all(feedPromises);

    // Flatten results
    let categoryNews = categoryFeedItems.flat();

    console.log(
      `Fetched ${categoryNews.length} news items for category: ${category}`,
    );

    // If no items were fetched, use fallbacks
    if (categoryNews.length === 0) {
      console.log(`Using fallback news for category: ${category}`);
      categoryNews = FALLBACK_NEWS_ITEMS.filter(
        (item) => item.category === category,
      );
    }

    // Sort by publish date (newest first)
    const sortedNews = categoryNews.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    // Process for sentiment analysis
    return processBatchNewsItems(sortedNews);
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);

    // Return fallback items for this category
    return FALLBACK_NEWS_ITEMS.filter((item) => item.category === category);
  }
};
