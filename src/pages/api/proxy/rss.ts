// src/pages/api/proxy/rss.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { withCache } from "@/utils/apiCache";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    console.log(`Fetching RSS feed from: ${url}`);

    // Make the request from the server side to avoid CORS issues
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "Cache-Control": "no-cache",
      },
      // Important: we need to get the raw XML as a string
      transformResponse: [(data) => data], // Prevent axios from parsing XML
    });

    if (!response.data) {
      console.error(`No data returned from: ${url}`);
      return res
        .status(404)
        .json({ error: "No content received from RSS feed" });
    }

    // Set appropriate content type
    res.setHeader("Content-Type", "application/xml");

    // Return the RSS feed content
    return res.status(200).send(response.data);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);

    let errorMessage = "Failed to fetch RSS feed";
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      errorMessage = `RSS feed error: ${error.message}`;

      // If the feed server returned an error, pass that status code
      if (error.response) {
        statusCode = error.response.status;
        errorMessage += ` - Server responded with status ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response was received
        errorMessage += " - No response received from the feed server";
      }
    }

    return res.status(statusCode).json({
      error: errorMessage,
      url: url,
    });
  }
}

// Cache RSS feeds for 10 minutes (600000 ms)
export default withCache(handler, 600000);
