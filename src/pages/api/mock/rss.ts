// src/pages/api/mock/rss.ts
import type { NextApiRequest, NextApiResponse } from "next";

// Sample RSS feed content
const mockRssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>MarketSense Mock Financial News</title>
    <link>https://example.com/financial-news</link>
    <description>Latest financial news for testing</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Markets Rally as Tech Earnings Beat Expectations</title>
      <link>https://example.com/news/markets-rally</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>mock-news-1</guid>
      <description>Major indices rose sharply today as leading tech companies reported stronger than expected quarterly earnings.</description>
      <content:encoded><![CDATA[<p>Major indices rose sharply today as leading tech companies reported stronger than expected quarterly earnings. The S&P 500 gained 1.2%, while the Nasdaq jumped 1.8%.</p><p>Analysts cited positive surprises from several large tech firms as the primary driver of the rally, with most exceeding revenue and profit forecasts.</p><img src="https://example.com/images/stock-chart.jpg" alt="Stock Chart" />]]></content:encoded>
    </item>
    <item>
      <title>Federal Reserve Signals Potential Rate Cuts</title>
      <link>https://example.com/news/fed-rate-cuts</link>
      <pubDate>${new Date(Date.now() - 3600000).toUTCString()}</pubDate>
      <guid>mock-news-2</guid>
      <description>The Federal Reserve indicated it may begin reducing interest rates in the coming months if inflation continues to moderate.</description>
      <content:encoded><![CDATA[<p>The Federal Reserve indicated it may begin reducing interest rates in the coming months if inflation continues to moderate. In minutes from its latest meeting, officials noted that the economy has shown signs of cooling while inflation has gradually moved toward the central bank's 2% target.</p><p>"We're seeing the conditions that would allow us to begin normalizing policy," said one Fed official, speaking on condition of anonymity.</p>]]></content:encoded>
    </item>
    <item>
      <title>Oil Prices Drop on Supply Concerns</title>
      <link>https://example.com/news/oil-prices-drop</link>
      <pubDate>${new Date(Date.now() - 7200000).toUTCString()}</pubDate>
      <guid>mock-news-3</guid>
      <description>Crude oil prices fell more than 3% as concerns about oversupply and weak global demand continue to weigh on the market.</description>
      <content:encoded><![CDATA[<p>Crude oil prices fell more than 3% as concerns about oversupply and weak global demand continue to weigh on the market. Brent crude futures were down to $78.45 a barrel, while U.S. West Texas Intermediate crude futures dropped to $73.80.</p><p>The decline comes after several major producing countries reported higher output levels than expected, even as economic indicators from China and Europe suggest slowing industrial activity.</p>]]></content:encoded>
    </item>
    <item>
      <title>Major Bank Announces Restructuring Plan</title>
      <link>https://example.com/news/bank-restructuring</link>
      <pubDate>${new Date(Date.now() - 10800000).toUTCString()}</pubDate>
      <guid>mock-news-4</guid>
      <description>One of the nation's largest banks unveiled a comprehensive restructuring plan aimed at cutting costs and improving digital services.</description>
      <content:encoded><![CDATA[<p>One of the nation's largest banks unveiled a comprehensive restructuring plan aimed at cutting costs and improving digital services. The plan includes closing approximately 150 branches nationwide and investing $2 billion in technology upgrades over the next three years.</p><p>"Banking has fundamentally changed, and we need to adapt to meet our customers where they are—increasingly, that's in the digital space," said the bank's CEO in a statement.</p>]]></content:encoded>
    </item>
    <item>
      <title>Retail Sales Exceed Expectations in Latest Report</title>
      <link>https://example.com/news/retail-sales</link>
      <pubDate>${new Date(Date.now() - 14400000).toUTCString()}</pubDate>
      <guid>mock-news-5</guid>
      <description>Consumer spending showed surprising strength last month, with retail sales rising 0.8% compared to analyst expectations of 0.5%.</description>
      <content:encoded><![CDATA[<p>Consumer spending showed surprising strength last month, with retail sales rising 0.8% compared to analyst expectations of 0.5%. The data suggests that consumers remain resilient despite high interest rates and persistent inflation in some sectors.</p><p>Department stores and online retailers reported the strongest gains, while sales at electronics stores and restaurants saw more modest increases.</p><img src="https://example.com/images/shopping-mall.jpg" alt="Shopping Mall" />]]></content:encoded>
    </item>
  </channel>
</rss>`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(mockRssFeed);
  }, 500);
}
