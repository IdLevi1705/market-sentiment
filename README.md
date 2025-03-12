# MarketSense: Live Financial Data Implementation

This implementation connects MarketSense to real-time financial data from Alpha Vantage.

## Setup Instructions

1. **Get an Alpha Vantage API Key**

   - Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key) to get your free API key
   - The free tier provides 5 API requests per minute, 500 requests per day

2. **Create Environment File**

   - Create a `.env.local` file in the project root
   - Add your API key:

   ```
   ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

3. **Install Dependencies**

   ```bash
   yarn install
   ```

4. **Start Development Server**
   ```bash
   yarn dev
   ```

## How It Works

### Data Sources

- **Market Indices**: Uses ETF proxies (SPY, QQQ, DIA) to track major indices
- **Stock Data**: Fetches real-time quotes for top companies
- **Historical Charts**: Uses Alpha Vantage's time series APIs

### API Optimization

- **Caching System**: Implements smart caching to avoid hitting rate limits
- **Server-side API Calls**: All external API calls are made from Next.js API routes

### Error Handling

- **Improved Error States**: The UI now shows clear error messages when data cannot be retrieved
- **Retry Mechanism**: Users can retry failed data fetches

## Important Notes

1. **API Limitations**

   - The free tier of Alpha Vantage has strict limits (5 calls/min, 500 calls/day)
   - Once limits are reached, API calls will fail until reset

2. **Market Hours**

   - Stock data is most accurate during market hours
   - Outside market hours, you'll see closing values

3. **Data Proxy**
   - Using SPY to represent S&P 500, QQQ for NASDAQ, etc.
   - This provides more reliable and frequent updates than direct index APIs

## Additional Information

### Alpha Vantage Documentation

For more details on the Alpha Vantage API:

- [Documentation](https://www.alphavantage.co/documentation/)
- [API Parameters](https://www.alphavantage.co/documentation/#api-parameters)

### Code Structure

- `/src/pages/api/*`: API routes that proxy Alpha Vantage
- `/src/services/*`: Service layer for fetching data
- `/src/hooks/*`: React hooks for consuming data
- `/src/utils/apiCache.ts`: Caching mechanism for API calls

### Upgrading

For production use, consider:

1. Upgrading to a paid Alpha Vantage plan
2. Adding more sophisticated caching (e.g., Redis)
3. Implementing a more robust error handling system
