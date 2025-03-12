import React from "react";
import { NewsItem as NewsItemType } from "@/types/news";
import { formatRelativeTime } from "@/utils/dateFormatters";
import ErrorState from "../ErrorState/ErrorState";
import {
  NewsCardContainer,
  NewsCardTitle,
  NewsCardContent,
  NewsItem,
  NewsItemHeader,
  NewsItemTitle,
  NewsItemMeta,
  NewsItemSource,
  NewsItemTime,
  NewsItemDescription,
  NewsItemSentiment,
  LoadingIndicator,
  EmptyState,
} from "./styles";

interface NewsCardProps {
  title: string;
  news: NewsItemType[];
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  news,
  loading,
  error,
  onRetry,
}) => {
  console.log("news", news);
  return (
    <NewsCardContainer>
      <NewsCardTitle>{title}</NewsCardTitle>

      {loading ? (
        <LoadingIndicator>Loading news...</LoadingIndicator>
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : news.length === 0 ? (
        <EmptyState>No news available</EmptyState>
      ) : (
        <NewsCardContent>
          {news.map((item) => (
            <NewsItem
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <NewsItemHeader>
                <NewsItemTitle>{item.title}</NewsItemTitle>
                {item.sentiment && (
                  <NewsItemSentiment $sentiment={item.sentiment.score}>
                    {item.sentiment.score > 0 ? "+" : ""}
                    {(item.sentiment.score * 100).toFixed(0)}
                  </NewsItemSentiment>
                )}
              </NewsItemHeader>

              <NewsItemDescription>{item.description}</NewsItemDescription>

              <NewsItemMeta>
                <NewsItemSource>{item.source}</NewsItemSource>
                <NewsItemTime>
                  {formatRelativeTime(item.publishedAt)}
                </NewsItemTime>
              </NewsItemMeta>
            </NewsItem>
          ))}
        </NewsCardContent>
      )}
    </NewsCardContainer>
  );
};

export default NewsCard;
