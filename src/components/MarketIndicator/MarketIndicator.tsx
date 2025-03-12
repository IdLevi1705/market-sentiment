import React from "react";
import { MarketIndicator as MarketIndicatorType } from "../../types/news";
import { getMarketSentimentFromValue } from "@/constants/marketIndicators";
import { formatDateTime } from "@/utils/dateFormatters";
import {
  MarketIndicatorContainer,
  MarketIndicatorTitle,
  MarketIndicatorContent,
  GaugeContainer,
  Gauge,
  GaugeNeedle,
  GaugeLabels,
  GaugeLabel,
  SentimentDisplay,
  SentimentValue,
  SentimentLabel,
  UpdateTime,
  LoadingIndicator,
} from "./styles";

interface MarketIndicatorProps {
  sentiment: MarketIndicatorType | null;
  loading: boolean;
}

const MarketIndicator: React.FC<MarketIndicatorProps> = ({
  sentiment,
  loading,
}) => {
  // Default to neutral if no sentiment is provided
  const value = sentiment?.value || 0;
  const { sentiment: label, color } = getMarketSentimentFromValue(value);

  // Calculate needle rotation based on value (-1 to 1 maps to -90 to 90 degrees)
  const needleRotation = value * 90;

  return (
    <MarketIndicatorContainer>
      <MarketIndicatorTitle>Market Sentiment Indicator</MarketIndicatorTitle>

      {loading ? (
        <LoadingIndicator>Loading market sentiment...</LoadingIndicator>
      ) : (
        <MarketIndicatorContent>
          <GaugeContainer>
            <Gauge viewBox="0 0 200 100">
              {/* Gauge background */}
              <path
                d="M20,90 A80,80 0 0,1 180,90"
                stroke="#E5E7EB"
                strokeWidth="20"
                fill="none"
              />

              {/* Terrible zone (deep red) */}
              <path
                d="M20,90 A80,80 0 0,1 56,50"
                stroke="#DC2626"
                strokeWidth="20"
                fill="none"
              />

              {/* Bad zone (orange) */}
              <path
                d="M56,50 A80,80 0 0,1 92,34"
                stroke="#F97316"
                strokeWidth="20"
                fill="none"
              />

              {/* Neutral zone (gray) */}
              <path
                d="M92,34 A80,80 0 0,1 108,34"
                stroke="#A3A3A3"
                strokeWidth="20"
                fill="none"
              />

              {/* Good zone (light green) */}
              <path
                d="M108,34 A80,80 0 0,1 144,50"
                stroke="#22C55E"
                strokeWidth="20"
                fill="none"
              />

              {/* Great zone (deep green) */}
              <path
                d="M144,50 A80,80 0 0,1 180,90"
                stroke="#15803D"
                strokeWidth="20"
                fill="none"
              />

              {/* Needle */}
              <g transform={`rotate(${needleRotation}, 100, 90)`}>
                <GaugeNeedle d="M100,30 L105,90 L95,90 Z" fill="#1F2937" />
              </g>

              {/* Center cap */}
              <circle cx="100" cy="90" r="6" fill="#1F2937" />
            </Gauge>

            <GaugeLabels>
              <GaugeLabel>Terrible</GaugeLabel>
              <GaugeLabel>Bad</GaugeLabel>
              <GaugeLabel>Neutral</GaugeLabel>
              <GaugeLabel>Good</GaugeLabel>
              <GaugeLabel>Great</GaugeLabel>
            </GaugeLabels>
          </GaugeContainer>

          <SentimentDisplay>
            <SentimentValue color={color}>
              {(value * 100).toFixed(1)}%
            </SentimentValue>
            <SentimentLabel color={color}>{label}</SentimentLabel>
            {sentiment?.timestamp && (
              <UpdateTime>
                Updated: {formatDateTime(sentiment.timestamp)}
              </UpdateTime>
            )}
          </SentimentDisplay>
        </MarketIndicatorContent>
      )}
    </MarketIndicatorContainer>
  );
};

export default MarketIndicator;
