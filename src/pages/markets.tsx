// src/pages/markets.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import StockChart from "@/components/StockChart/StockChart";
import MarketIndicator from "@/components/MarketIndicator/MarketIndicator";
import { useMarketData } from "@/hooks/useMarketData";
import styled from "styled-components";

const MarketsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;

const MarketsPageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const MarketsPageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const MarketsPageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MarketsPage: React.FC = () => {
  const { sentiment, spHistory, nasdaqHistory, loading } = useMarketData();

  return (
    <>
      <Head>
        <title>Market Analysis - MarketSense</title>
        <meta
          name="description"
          content="Real-time market data and sentiment analysis"
        />
      </Head>

      <Layout title="Market Analysis">
        <MarketsPageContainer>
          <MarketsPageHeader>
            <MarketsPageTitle>Market Analysis</MarketsPageTitle>
            <MarketsPageDescription>
              Track major indices and news-driven market sentiment
            </MarketsPageDescription>
          </MarketsPageHeader>

          <MarketIndicator sentiment={sentiment} loading={loading} />

          <ChartGrid>
            <StockChart title="S&P 500" data={spHistory} loading={loading} />

            <StockChart
              title="NASDAQ Composite"
              data={nasdaqHistory}
              loading={loading}
            />
          </ChartGrid>
        </MarketsPageContainer>
      </Layout>
    </>
  );
};

export default MarketsPage;
