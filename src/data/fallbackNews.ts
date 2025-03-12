// src/data/fallbackNews.ts
import { NewsItem } from "@/types/news";

// Fallback news items to use when RSS feeds can't be fetched
export const fallbackNewsItems: NewsItem[] = [
  {
    id: "fallback-1",
    title: "Fed Signals Potential Rate Cut Path After Inflation Slowdown",
    description:
      "The Federal Reserve has indicated it may consider a series of interest rate cuts if inflation continues to trend downward toward its 2% target.",
    source: "Financial Times",
    url: "#",
    publishedAt: new Date().toISOString(),
    category: "business",
    sentiment: {
      score: 0.4,
      comparative: 0.4,
      positive: ["cut", "downward"],
      negative: [],
    },
  },
  {
    id: "fallback-2",
    title: "Tech Stocks Rally on Positive Earnings and AI Development Progress",
    description:
      "Major tech companies saw their stocks surge following stronger-than-expected quarterly earnings and announcements of breakthroughs in artificial intelligence technology.",
    source: "Wall Street Journal",
    url: "#",
    publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    category: "business",
    sentiment: {
      score: 0.65,
      comparative: 0.65,
      positive: ["rally", "surge", "breakthroughs", "stronger"],
      negative: [],
    },
  },
  {
    id: "fallback-3",
    title: "Oil Prices Drop Amid Concerns Over Global Demand",
    description:
      "Crude oil prices fell sharply as investors worried about weakening global demand and increased production from major oil-producing nations.",
    source: "Bloomberg",
    url: "#",
    publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    category: "business",
    sentiment: {
      score: -0.45,
      comparative: -0.45,
      positive: [],
      negative: ["drop", "fell", "sharply", "worried", "weakening"],
    },
  },
  {
    id: "fallback-4",
    title: "Government Announces New Infrastructure Spending Package",
    description:
      "The administration unveiled a $1.2 trillion infrastructure plan focusing on transportation, broadband expansion, and clean energy initiatives.",
    source: "CNN Politics",
    url: "#",
    publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    category: "politics",
    sentiment: {
      score: 0.3,
      comparative: 0.3,
      positive: ["expansion", "clean"],
      negative: [],
    },
  },
  {
    id: "fallback-5",
    title:
      "Senate Debates New Banking Regulations Following Recent Financial Instability",
    description:
      "Lawmakers are considering stricter oversight of regional banks after recent failures raised concerns about the stability of the banking system.",
    source: "Politico",
    url: "#",
    publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    category: "politics",
    sentiment: {
      score: -0.25,
      comparative: -0.25,
      positive: [],
      negative: ["stricter", "failures", "concerns", "instability"],
    },
  },
  {
    id: "fallback-6",
    title: "Global Markets React to China`s Economic Stimulus Announcement",
    description:
      "International markets responded positively to China`s announcement of a substantial economic stimulus package aimed at boosting its slowing economy.",
    source: "Reuters",
    url: "#",
    publishedAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
    category: "world",
    sentiment: {
      score: 0.35,
      comparative: 0.35,
      positive: ["positively", "stimulus", "boosting"],
      negative: ["slowing"],
    },
  },
  {
    id: "fallback-7",
    title:
      "European Central Bank Maintains Interest Rates Despite Inflation Concerns",
    description:
      "The ECB decided to keep interest rates unchanged despite ongoing inflation pressures, citing the need to balance economic growth with price stability.",
    source: "BBC",
    url: "#",
    publishedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    category: "world",
    sentiment: {
      score: -0.1,
      comparative: -0.1,
      positive: ["balance", "stability"],
      negative: ["concerns", "pressures"],
    },
  },
  {
    id: "fallback-8",
    title: "Major Semiconductor Breakthrough Could Accelerate Computing Power",
    description:
      "Researchers announced a significant advancement in semiconductor technology that could lead to faster, more energy-efficient computing devices.",
    source: "TechCrunch",
    url: "#",
    publishedAt: new Date(Date.now() - 25200000).toISOString(), // 7 hours ago
    category: "technology",
    sentiment: {
      score: 0.7,
      comparative: 0.7,
      positive: ["breakthrough", "advancement", "faster", "efficient"],
      negative: [],
    },
  },
  {
    id: "fallback-9",
    title: "Retail Sales Exceed Expectations as Consumer Confidence Grows",
    description:
      "Latest retail sales data showed stronger than anticipated consumer spending, suggesting growing confidence in the economic outlook.",
    source: "CNBC",
    url: "#",
    publishedAt: new Date(Date.now() - 28800000).toISOString(), // 8 hours ago
    category: "business",
    sentiment: {
      score: 0.6,
      comparative: 0.6,
      positive: ["exceed", "stronger", "confidence", "growing"],
      negative: [],
    },
  },
  {
    id: "fallback-10",
    title: "Housing Market Shows Signs of Cooling as Mortgage Rates Rise",
    description:
      "The housing market is beginning to show signs of slowing down as mortgage rates continue to climb, potentially affecting home affordability.",
    source: "Financial Times",
    url: "#",
    publishedAt: new Date(Date.now() - 32400000).toISOString(), // 9 hours ago
    category: "business",
    sentiment: {
      score: -0.3,
      comparative: -0.3,
      positive: [],
      negative: ["cooling", "slowing", "rise", "climb"],
    },
  },
  {
    id: "fallback-11",
    title: "Trade Negotiations Stall Between Major Economic Powers",
    description:
      "Talks between leading global economies have reached an impasse over disagreements on tariffs, intellectual property protections, and market access.",
    source: "The Guardian",
    url: "#",
    publishedAt: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
    category: "world",
    sentiment: {
      score: -0.5,
      comparative: -0.5,
      positive: [],
      negative: ["stall", "impasse", "disagreements"],
    },
  },
  {
    id: "fallback-12",
    title: "Cryptocurrency Markets Volatile Following Regulatory Announcements",
    description:
      "Bitcoin and other digital currencies experienced significant price swings after several countries announced plans for tighter cryptocurrency regulations.",
    source: "Bloomberg",
    url: "#",
    publishedAt: new Date(Date.now() - 39600000).toISOString(), // 11 hours ago
    category: "business",
    sentiment: {
      score: -0.4,
      comparative: -0.4,
      positive: [],
      negative: ["volatile", "swings", "tighter"],
    },
  },
  {
    id: "fallback-13",
    title: "Manufacturing Activity Expands at Fastest Rate in Two Years",
    description:
      "The manufacturing sector reported its strongest performance since 2021, with increases in new orders, production, and employment.",
    source: "Wall Street Journal",
    url: "#",
    publishedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    category: "business",
    sentiment: {
      score: 0.75,
      comparative: 0.75,
      positive: ["expands", "fastest", "strongest", "increases"],
      negative: [],
    },
  },
  {
    id: "fallback-14",
    title:
      "Major Bank Announces Significant Job Cuts Amid Digital Transformation",
    description:
      "A leading global bank plans to reduce its workforce by thousands as it accelerates its shift toward digital banking services.",
    source: "Reuters",
    url: "#",
    publishedAt: new Date(Date.now() - 46800000).toISOString(), // 13 hours ago
    category: "business",
    sentiment: {
      score: -0.35,
      comparative: -0.35,
      positive: ["accelerates"],
      negative: ["cuts", "reduce"],
    },
  },
  {
    id: "fallback-15",
    title: "Small Businesses Report Optimism Despite Inflation Concerns",
    description:
      "A recent survey of small business owners showed increased optimism about future growth, even as many continue to struggle with higher input costs.",
    source: "CNBC",
    url: "#",
    publishedAt: new Date(Date.now() - 50400000).toISOString(), // 14 hours ago
    category: "business",
    sentiment: {
      score: 0.2,
      comparative: 0.2,
      positive: ["optimism", "growth"],
      negative: ["concerns", "struggle", "higher"],
    },
  },
];

// Categorize the fallback news items
export const getFallbackNewsByCategory = (category: string): NewsItem[] => {
  return fallbackNewsItems.filter((item) => item.category === category);
};

// Get market-impacting fallback news
export const getFallbackMarketImpactingNews = (): NewsItem[] => {
  return fallbackNewsItems.filter(
    (item) =>
      (item.category === "business" &&
        Math.abs(item.sentiment?.score || 0) > 0.3) ||
      (item.category !== "business" &&
        Math.abs(item.sentiment?.score || 0) > 0.5),
  );
};
