import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import Dashboard from "@/components/Dashboard/Dashboard";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>MarketSense - News-Driven Market Analysis</title>
        <meta
          name="description"
          content="Real-time news and market sentiment analysis dashboard"
        />
      </Head>

      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default HomePage;
