"use client";
import React, { useState, useEffect, useMemo } from "react";
import { NewsItem, NewsCategory } from "@/types/news";
import { NEWS_CATEGORIES } from "@/constants/newsCategories";
import theme from "@/styles/theme";
import {
  SentimentGraphContainer,
  SentimentGraphHeader,
  SentimentGraphTitle,
  SentimentGraphContent,
  CustomTooltipContainer,
  TooltipTime,
  TooltipValue,
  TooltipCount,
  LoadingIndicator,
  EmptyState,
  GraphsWrapper,
  GraphColumn,
  TimeRangeSelector,
  TimeRangeButton,
  CategorySelector,
  CategoryOption,
  GraphTitle,
} from "./styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Dynamically import Recharts components with { ssr: false } to prevent hydration mismatch

interface NewsSentimentGraphProps {
  news: NewsItem[];
  historicalSentiment: Array<{
    timestamp: number;
    value: number;
    newsCount: number;
    categorySentiment?: Record<string, number>;
  }>;
  loading: boolean;
  error: string | null;
}

// Time range options
type TimeRange = "24h" | "7d" | "30d" | "all";

// Sentiment data point structure
interface SentimentDataPoint {
  time: string;
  timestamp: number;
  value: number;
  newsCount: number;
  [key: string]: any; // For category sentiments
}

const NewsSentimentGraph: React.FC<NewsSentimentGraphProps> = ({
  news,
  historicalSentiment,
  loading,
  error,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [selectedCategories, setSelectedCategories] = useState<
    Array<NewsCategory | "all">
  >(["all"]);
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client after hydration is complete
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the category colors
  const categoryColors: Record<string, string> = {
    business: "#3B82F6", // blue
    politics: "#EF4444", // red
    world: "#10B981", // green
    technology: "#8B5CF6", // purple
    all: "#F59E0B", // amber
  };

  // Process historical sentiment data into chart format
  const sentimentData: SentimentDataPoint[] = useMemo(() => {
    if (!historicalSentiment || historicalSentiment.length === 0) return [];

    // Filter by time range
    const now = Date.now();
    let cutoffTime = 0;

    if (timeRange === "24h") {
      cutoffTime = now - 24 * 60 * 60 * 1000;
    } else if (timeRange === "7d") {
      cutoffTime = now - 7 * 24 * 60 * 60 * 1000;
    } else if (timeRange === "30d") {
      cutoffTime = now - 30 * 24 * 60 * 60 * 1000;
    }

    const filteredData =
      timeRange === "all"
        ? [...historicalSentiment]
        : historicalSentiment.filter((item) => item.timestamp >= cutoffTime);

    // Format the data for chart display
    return filteredData.map((item) => {
      const date = new Date(item.timestamp);
      const formattedData: SentimentDataPoint = {
        time:
          timeRange === "24h"
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : date.toLocaleDateString([], { month: "short", day: "numeric" }),
        timestamp: item.timestamp,
        value: item.value,
        newsCount: item.newsCount,
      };

      // Add category sentiment data if available
      if (item.categorySentiment) {
        Object.entries(item.categorySentiment).forEach(([cat, val]) => {
          formattedData[cat] = val;
        });
      }

      return formattedData;
    });
  }, [historicalSentiment, timeRange]);

  // Calculate per-category sentiment for bar chart
  const categorySentiment = useMemo(() => {
    const result = NEWS_CATEGORIES.map((category) => {
      const categoryNews = news.filter((item) => item.category === category.id);
      const sentiments = categoryNews
        .filter((item) => item.sentiment)
        .map((item) => item.sentiment?.score || 0);

      const avgSentiment =
        sentiments.length > 0
          ? sentiments.reduce((sum, score) => sum + score, 0) /
            sentiments.length
          : 0;

      return {
        category: category.id,
        label: category.label,
        value: parseFloat(avgSentiment.toFixed(2)),
        count: categoryNews.length,
      };
    });

    // Add overall average
    const allSentiments = news
      .filter((item) => item.sentiment)
      .map((item) => item.sentiment?.score || 0);

    const overallAvg =
      allSentiments.length > 0
        ? allSentiments.reduce((sum, score) => sum + score, 0) /
          allSentiments.length
        : 0;

    result.push({
      category: "all",
      label: "Overall",
      value: parseFloat(overallAvg.toFixed(2)),
      count: news.length,
    });

    return result;
  }, [news]);

  // Custom tooltip component for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipContainer>
          <TooltipTime>{label}</TooltipTime>
          {payload.map((entry: any) => (
            <TooltipValue
              key={entry.dataKey}
              sentiment={entry.value}
              color={entry.color}
            >
              {NEWS_CATEGORIES.find((c) => c.id === entry.dataKey)?.label ||
              entry.dataKey === "value"
                ? "Overall"
                : entry.dataKey}
              : {entry.value > 0 ? "+" : ""}
              {entry.value.toFixed(2)}
            </TooltipValue>
          ))}
          <TooltipCount>
            Based on {payload[0].payload.newsCount} news items
          </TooltipCount>
        </CustomTooltipContainer>
      );
    }
    return null;
  };

  // Custom tooltip component for bar chart
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <CustomTooltipContainer>
          <TooltipTime>{data.label}</TooltipTime>
          <TooltipValue sentiment={data.value}>
            Sentiment: {data.value > 0 ? "+" : ""}
            {data.value.toFixed(2)}
          </TooltipValue>
          <TooltipCount>Based on {data.count} news items</TooltipCount>
        </CustomTooltipContainer>
      );
    }
    return null;
  };

  // Handle category selection
  const toggleCategory = (category: NewsCategory | "all") => {
    setSelectedCategories((prev) => {
      // If 'all' is selected, show only 'all'
      if (category === "all") return ["all"];

      // If a category is clicked while 'all' is selected, show only that category
      if (prev.includes("all")) return [category];

      // If the category is already selected, remove it
      if (prev.includes(category)) {
        const newCategories = prev.filter((c) => c !== category);
        // If no categories left, show 'all'
        return newCategories.length === 0 ? ["all"] : newCategories;
      }

      // Otherwise, add the category
      return [...prev, category];
    });
  };

  // Determine line colors based on sentiment values
  const getLineColor = (category: string) => {
    if (category !== "value")
      return categoryColors[category] || theme.colors.neutral;

    if (sentimentData.length === 0) return theme.colors.neutral;

    const latestValue = sentimentData[sentimentData.length - 1].value;
    if (latestValue > 0.2) return theme.colors.success;
    if (latestValue < -0.2) return theme.colors.danger;
    return theme.colors.info;
  };

  // Show latest sentiment value
  const latestSentiment =
    sentimentData.length > 0
      ? sentimentData[sentimentData.length - 1].value
      : 0;

  return (
    <SentimentGraphContainer>
      <SentimentGraphHeader>
        <SentimentGraphTitle>
          News Sentiment Analysis
          {sentimentData.length > 0 && (
            <span
              style={{
                color: getLineColor("value"),
                marginLeft: "10px",
                fontSize: "0.9em",
              }}
            >
              Current: {latestSentiment > 0 ? "+" : ""}
              {latestSentiment.toFixed(2)}
            </span>
          )}
        </SentimentGraphTitle>

        <TimeRangeSelector>
          <TimeRangeButton
            active={timeRange === "24h"}
            onClick={() => setTimeRange("24h")}
          >
            24h
          </TimeRangeButton>
          <TimeRangeButton
            active={timeRange === "7d"}
            onClick={() => setTimeRange("7d")}
          >
            7d
          </TimeRangeButton>
          <TimeRangeButton
            active={timeRange === "30d"}
            onClick={() => setTimeRange("30d")}
          >
            30d
          </TimeRangeButton>
          <TimeRangeButton
            active={timeRange === "all"}
            onClick={() => setTimeRange("all")}
          >
            All
          </TimeRangeButton>
        </TimeRangeSelector>
      </SentimentGraphHeader>

      <CategorySelector>
        <CategoryOption
          active={selectedCategories.includes("all")}
          color={categoryColors.all}
          onClick={() => toggleCategory("all")}
        >
          Overall
        </CategoryOption>
        {NEWS_CATEGORIES.map((category) => (
          <CategoryOption
            key={category.id}
            active={selectedCategories.includes(category.id as NewsCategory)}
            color={categoryColors[category.id]}
            onClick={() => toggleCategory(category.id as NewsCategory)}
          >
            {category.label}
          </CategoryOption>
        ))}
      </CategorySelector>

      {loading && sentimentData.length === 0 ? (
        <LoadingIndicator>Loading sentiment data...</LoadingIndicator>
      ) : error ? (
        <EmptyState>{error}</EmptyState>
      ) : sentimentData.length === 0 ? (
        <EmptyState>Collecting sentiment data... Please wait.</EmptyState>
      ) : !isClient ? (
        // Show a loading state until client-side rendering is complete
        <LoadingIndicator>Preparing sentiment charts...</LoadingIndicator>
      ) : (
        <GraphsWrapper>
          {/* Line chart for sentiment over time */}
          <GraphColumn>
            <GraphTitle>Sentiment Trend Over Time</GraphTitle>
            <SentimentGraphContent>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sentimentData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={theme.colors.border}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis
                    domain={[-1, 1]}
                    ticks={[-1, -0.5, 0, 0.5, 1]}
                    tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
                    tickFormatter={(value) => value.toFixed(1)}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Legend />
                  <ReferenceLine
                    y={0}
                    stroke={theme.colors.neutral}
                    strokeDasharray="3 3"
                  />

                  {/* Show the appropriate lines based on selected categories */}
                  {selectedCategories.includes("all") && (
                    <Line
                      type="monotone"
                      name="Overall"
                      dataKey="value"
                      stroke={getLineColor("value")}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: theme.colors.cardBackground,
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: getLineColor("value"),
                        strokeWidth: 0,
                      }}
                    />
                  )}

                  {NEWS_CATEGORIES.map(
                    (category) =>
                      selectedCategories.includes(
                        category.id as NewsCategory,
                      ) &&
                      sentimentData[0] &&
                      sentimentData[0][category.id] !== undefined && (
                        <Line
                          key={category.id}
                          type="monotone"
                          name={category.label}
                          dataKey={category.id}
                          stroke={categoryColors[category.id]}
                          strokeWidth={2}
                          dot={{
                            r: 3,
                            fill: theme.colors.cardBackground,
                            strokeWidth: 2,
                          }}
                          activeDot={{
                            r: 5,
                            fill: categoryColors[category.id],
                            strokeWidth: 0,
                          }}
                        />
                      ),
                  )}
                </LineChart>
              </ResponsiveContainer>
            </SentimentGraphContent>
          </GraphColumn>

          {/* Bar chart for category comparison */}
          <GraphColumn>
            <GraphTitle>Current Sentiment by Category</GraphTitle>
            <SentimentGraphContent>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categorySentiment}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 70, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                    stroke={theme.colors.border}
                  />
                  <XAxis
                    type="number"
                    domain={[-1, 1]}
                    ticks={[-1, -0.5, 0, 0.5, 1]}
                    tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="label"
                    type="category"
                    tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
                    width={70}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <ReferenceLine
                    x={0}
                    stroke={theme.colors.neutral}
                    strokeDasharray="3 3"
                  />
                  <Bar dataKey="value" minPointSize={3} barSize={20}>
                    {categorySentiment.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.value > 0.2
                            ? theme.colors.success
                            : entry.value < -0.2
                            ? theme.colors.danger
                            : categoryColors[entry.category] ||
                              theme.colors.info
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </SentimentGraphContent>
          </GraphColumn>
        </GraphsWrapper>
      )}
    </SentimentGraphContainer>
  );
};

export default NewsSentimentGraph;
