import React, { useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import NewsCard from "@/components/NewsCard/NewsCard";
import NewsList from "@/components/NewsList/NewsList";
import NewsSentimentGraph from "@/components/NewsSentimentGraph/NewsSentimentGraph";
import { useNews } from "@/hooks/useNews";
import { NEWS_CATEGORIES } from "@/constants/newsCategories";
import { NewsCategory } from "@/types/news";
import styled from "styled-components";

const NewsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;

const NewsPageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const NewsPageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const NewsPageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

interface CategoryTabProps {
  active: boolean;
}

const CategoryTab = styled.button<CategoryTabProps>`
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.dark};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.text.secondary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.border};
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.space[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    NewsCategory | undefined
  >(undefined);
  const {
    news,
    marketImpactingNews,
    getNewsByCategory,
    loading,
    error,
    retryFetch,
    changeCategory,
    historicalSentiment,
  } = useNews(selectedCategory);

  const handleCategoryChange = (category?: NewsCategory) => {
    setSelectedCategory(category);
    changeCategory(category);
  };

  return (
    <>
      <Head>
        <title>News Feed - MarketSense</title>
        <meta
          name="description"
          content="Latest news from various sources and categories"
        />
      </Head>

      <Layout title="News Feed">
        <NewsPageContainer>
          <NewsPageHeader>
            <NewsPageTitle>News Feed</NewsPageTitle>
            <NewsPageDescription>
              Latest news from financial, political, and global sources
            </NewsPageDescription>
          </NewsPageHeader>

          {/* Enhanced Sentiment Graph Component */}
          <NewsSentimentGraph
            news={news}
            historicalSentiment={historicalSentiment}
            loading={loading}
            error={error}
          />

          <CategoryTabs>
            <CategoryTab
              active={selectedCategory === undefined}
              onClick={() => handleCategoryChange(undefined)}
            >
              All News
            </CategoryTab>

            {NEWS_CATEGORIES.map((category) => (
              <CategoryTab
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() =>
                  handleCategoryChange(category.id as NewsCategory)
                }
              >
                {category.label}
              </CategoryTab>
            ))}
          </CategoryTabs>

          {!selectedCategory && (
            <NewsList
              title="Market-Impacting News"
              news={marketImpactingNews}
              loading={loading}
              error={error}
              onRetry={retryFetch}
            />
          )}

          {selectedCategory ? (
            <NewsCard
              title={`${
                NEWS_CATEGORIES.find((c) => c.id === selectedCategory)?.label ||
                ""
              } News`}
              news={news}
              loading={loading}
              error={error}
              onRetry={retryFetch}
            />
          ) : (
            <NewsGrid>
              {NEWS_CATEGORIES.map((category) => (
                <NewsCard
                  key={category.id}
                  title={`${category.label} News`}
                  news={getNewsByCategory(category.id as NewsCategory)}
                  loading={loading}
                  error={error}
                  onRetry={retryFetch}
                />
              ))}
            </NewsGrid>
          )}
        </NewsPageContainer>
      </Layout>
    </>
  );
};

export default NewsPage;
