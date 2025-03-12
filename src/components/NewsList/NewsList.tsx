import React from "react";
import { NewsItem as NewsItemType } from "@/types/news";
import { formatRelativeTime } from "@/utils/dateFormatters";
import ErrorState from "../ErrorState/ErrorState";
import {
  NewsListContainer,
  NewsListTitle,
  NewsListContent,
  NewsItemWrapper,
  NewsItemTitle,
  NewsItemMeta,
  NewsItemSource,
  NewsItemTime,
  NewsItemSentiment,
  LoadingIndicator,
  EmptyState,
} from "./styles";

interface NewsListProps {
  title: string;
  news: NewsItemType[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const NewsList: React.FC<NewsListProps> = ({
  title,
  news,
  loading,
  error,
  onRetry,
}) => {
  return (
    <NewsListContainer>
      <NewsListTitle>{title}</NewsListTitle>

      {loading ? (
        <LoadingIndicator>Loading news...</LoadingIndicator>
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : news.length === 0 ? (
        <EmptyState>No news available</EmptyState>
      ) : (
        <NewsListContent>
          {news
            .sort(
              (a, b) => (b.sentiment?.score || 0) - (a.sentiment?.score || 0),
            )
            .slice(0, 5)
            .map((item) => (
              <NewsItemWrapper
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NewsItemTitle>{item.title}</NewsItemTitle>
                <NewsItemMeta>
                  <NewsItemSource>{item.source}</NewsItemSource>
                  <NewsItemTime>
                    {formatRelativeTime(item.publishedAt)}
                  </NewsItemTime>
                  {item.sentiment && (
                    <NewsItemSentiment $sentiment={item.sentiment.score}>
                      {item.sentiment.score > 0 ? "+" : ""}
                      {(item.sentiment.score * 100).toFixed(0)}
                    </NewsItemSentiment>
                  )}
                </NewsItemMeta>
              </NewsItemWrapper>
            ))}
        </NewsListContent>
      )}
    </NewsListContainer>
  );
};

export default NewsList;
