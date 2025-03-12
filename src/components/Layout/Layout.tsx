// src/components/Layout/Layout.tsx
import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { LayoutContainer, MainContent } from "./styles";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Market News Analyzer",
}) => {
  return (
    <LayoutContainer>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Analyze news and predict market trends"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <MainContent>{children}</MainContent>

      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
