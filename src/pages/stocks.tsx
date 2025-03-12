// src/pages/stocks.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import StockMovers from "@/components/StockMovers/StockMovers";
import { useStockMovers } from "@/hooks/useStocks";
import styled from "styled-components";

const StocksPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;

const StocksPageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const StocksPageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const StocksPageDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StocksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StocksPage: React.FC = () => {
  const { topGainers, topLosers, loading } = useStockMovers(20);

  return (
    <>
      <Head>
        <title>Stock Movers - MarketSense</title>
        <meta
          name="description"
          content="Top gaining and losing stocks of the day"
        />
      </Head>

      <Layout title="Stock Movers">
        <StocksPageContainer>
          <StocksPageHeader>
            <StocksPageTitle>Stock Movers</StocksPageTitle>
            <StocksPageDescription>
              Track top gaining and losing stocks across the market
            </StocksPageDescription>
          </StocksPageHeader>

          <StocksGrid>
            <StockMovers
              title="Top Gainers"
              stocks={topGainers}
              loading={loading}
            />

            <StockMovers
              title="Top Losers"
              stocks={topLosers}
              loading={loading}
            />
          </StocksGrid>
        </StocksPageContainer>
      </Layout>
    </>
  );
};

export default StocksPage;
