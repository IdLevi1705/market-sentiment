import React from "react";
import {
  DashboardContainer,
  DashboardHeader,
  DashboardTitle,
  DashboardSubtitle,
  DashboardGrid,
  DashboardColumn,
  DashboardRow,
} from "./styles";

import MarketIndicator from "@/components/MarketIndicator/MarketIndicator";
import NewsList from "@/components/NewsList/NewsList";
import NewsCard from "@/components/NewsCard/NewsCard";
import StockChart from "@/components/StockChart/StockChart";
import StockMovers from "@/components/StockMovers/StockMovers";

import { useNews } from "@/hooks/useNews";
import { useMarketData } from "@/hooks/useMarketData";
import { useStockMovers } from "@/hooks/useStocks";

const Dashboard: React.FC = () => {
  const {
    news,
    marketImpactingNews,
    getNewsByCategory,
    loading: newsLoading,
  } = useNews();
  const {
    sentiment,
    spHistory,
    nasdaqHistory,
    loading: marketLoading,
  } = useMarketData();
  const { topGainers, topLosers, loading: stocksLoading } = useStockMovers(10);

  const businessNews = getNewsByCategory("business");
  const politicsNews = getNewsByCategory("politics");
  const worldNews = getNewsByCategory("world");

  const isLoading = newsLoading || marketLoading || stocksLoading;

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Market News Dashboard</DashboardTitle>
        <DashboardSubtitle>
          News-driven market analysis and sentiment tracking
        </DashboardSubtitle>
      </DashboardHeader>

      <DashboardGrid>
        {/* Top row */}
        <DashboardRow>
          <MarketIndicator sentiment={sentiment} loading={isLoading} />
        </DashboardRow>

        {/* Main content */}
        <DashboardRow>
          {/* Left column - News */}
          <DashboardColumn $width="30%">
            <NewsList
              title="RSS News Feeds"
              news={news.slice(0, 10)}
              loading={newsLoading}
            />

            <NewsCard
              title="Market-Impacting News"
              news={marketImpactingNews.slice(0, 5)}
              loading={newsLoading}
            />
          </DashboardColumn>

          {/* Middle column - Charts */}
          <DashboardColumn $width="40%">
            <StockChart
              title="S&P 500"
              data={spHistory}
              loading={marketLoading}
            />

            <StockChart
              title="NASDAQ Composite"
              data={nasdaqHistory}
              loading={marketLoading}
            />
          </DashboardColumn>

          {/* Right column - Stock movers and category news */}
          <DashboardColumn $width="30%">
            <StockMovers
              title="Top Gainers"
              stocks={topGainers}
              loading={stocksLoading}
            />

            <StockMovers
              title="Top Losers"
              stocks={topLosers}
              loading={stocksLoading}
            />
          </DashboardColumn>
        </DashboardRow>

        {/* Bottom row - Category news */}
        <DashboardRow>
          <DashboardColumn $width="33%">
            <NewsCard
              title="Political News"
              news={politicsNews.slice(0, 5)}
              loading={newsLoading}
            />
          </DashboardColumn>

          <DashboardColumn $width="33%">
            <NewsCard
              title="World News"
              news={worldNews.slice(0, 5)}
              loading={newsLoading}
            />
          </DashboardColumn>

          <DashboardColumn $width="33%">
            <NewsCard
              title="Business News"
              news={businessNews.slice(0, 5)}
              loading={newsLoading}
            />
          </DashboardColumn>
        </DashboardRow>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
