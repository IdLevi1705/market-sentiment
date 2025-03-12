// src/constants/rssFeeds.ts
import { RssFeed } from "@/types/news";

export const RSS_FEEDS: RssFeed[] = [
  // Use local mock feed as the first source to ensure something works
  {
    id: "local-mock",
    name: "MarketSense Financial News",
    url: "/api/mock/rss", // This is our local mock RSS feed
    category: "business",
  },

  // Business News
  {
    id: "wsj-business",
    name: "Wall Street Journal - Business",
    url: "https://feeds.a.dj.com/rss/WSJBusiness.xml",
    category: "business",
  },
  {
    id: "cnbc-business",
    name: "CNBC - Business",
    url: "https://www.cnbc.com/id/10001147/device/rss/rss.html",
    category: "business",
  },
  {
    id: "reuters-business",
    name: "Reuters - Business",
    url: "https://www.reuters.com/business/rss/",
    category: "business",
  },

  // Politics News
  {
    id: "cnn-politics",
    name: "CNN - Politics",
    url: "http://rss.cnn.com/rss/cnn_allpolitics.rss",
    category: "politics",
  },
  {
    id: "fox-politics",
    name: "Fox News - Politics",
    url: "https://moxie.foxnews.com/google-publisher/politics.xml",
    category: "politics",
  },

  // World News
  {
    id: "bbc-world",
    name: "BBC - World",
    url: "http://feeds.bbci.co.uk/news/world/rss.xml",
    category: "world",
  },
  {
    id: "reuters-world",
    name: "Reuters - World",
    url: "https://www.reuters.com/world/rss/",
    category: "world",
  },

  // Technology News (for tech stock movements)
  {
    id: "techcrunch",
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
    category: "technology",
  },
];

export const LOCAL_RSS_FEEDS: RssFeed[] = [
  {
    id: "local-mock",
    name: "MarketSense Financial News",
    url: "/api/mock/rss",
    category: "business",
  },
  {
    id: "local-mock-politics",
    name: "MarketSense Politics News",
    url: "/api/mock/rss",
    category: "politics",
  },
  {
    id: "local-mock-world",
    name: "MarketSense World News",
    url: "/api/mock/rss",
    category: "world",
  },
  {
    id: "local-mock-tech",
    name: "MarketSense Tech News",
    url: "/api/mock/rss",
    category: "technology",
  },
];
