// src/pages/about.tsx
import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import styled from "styled-components";
import { card } from "@/styles/mixins";

const AboutPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutCard = styled.div`
  ${card}
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const AboutTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const AboutSection = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};

  &:last-child {
    margin-bottom: 0;
  }
`;

const AboutSectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.space[3]};
`;

const AboutText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>About MarketSense</title>
        <meta
          name="description"
          content="About the MarketSense news-driven market analysis platform"
        />
      </Head>

      <Layout title="About MarketSense">
        <AboutPageContainer>
          <AboutCard>
            <AboutTitle>About MarketSense</AboutTitle>

            <AboutSection>
              <AboutSectionTitle>Our Mission</AboutSectionTitle>
              <AboutText>
                MarketSense is a platform designed to analyze news sentiment and
                its correlation with market trends. We believe that news has a
                significant impact on market movements, and our goal is to
                provide investors with insights derived from comprehensive news
                analysis.
              </AboutText>
            </AboutSection>

            <AboutSection>
              <AboutSectionTitle>How It Works</AboutSectionTitle>
              <AboutText>
                Our system aggregates news from various high-quality sources
                across business, politics, and global categories. Using natural
                language processing and sentiment analysis, we evaluate the
                emotional tone and market relevance of each news article. This
                data is then used to calculate a market sentiment indicator that
                can help predict potential market movements.
              </AboutText>
            </AboutSection>

            <AboutSection>
              <AboutSectionTitle>Market Indicator</AboutSectionTitle>
              <AboutText>
                The Market Sentiment Indicator ranges from -1 (extreme fear) to
                1 (extreme greed). It is calculated by analyzing thousands of
                news articles daily, with greater weight given to business news
                and articles with market-relevant keywords. This indicator can
                serve as an additional data point in your investment
                decision-making process.
              </AboutText>
            </AboutSection>

            <AboutSection>
              <AboutSectionTitle>Disclaimer</AboutSectionTitle>
              <AboutText>
                MarketSense is designed for informational purposes only and
                should not be considered financial advice. Always consult with a
                qualified financial advisor before making investment decisions.
                Market trends are influenced by numerous factors beyond news
                sentiment, and past performance is not indicative of future
                results.
              </AboutText>
            </AboutSection>
          </AboutCard>
        </AboutPageContainer>
      </Layout>
    </>
  );
};

export default AboutPage;
