import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexCenter } from "@/styles/mixins";

export const MarketIndicatorContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MarketIndicatorTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[4]};
`;

export const MarketIndicatorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const GaugeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

export const Gauge = styled.svg`
  width: 100%;
  height: auto;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.3));
`;

export const GaugeNeedle = styled.path`
  transition: transform 0.5s ease-out;
`;

export const GaugeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${theme.space[2]};
`;

export const GaugeLabel = styled.span`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  text-align: center;
  flex: 1;
`;

export const SentimentDisplay = styled.div`
  ${flexCenter}
  flex-direction: column;
  padding: ${theme.space[4]};
`;

export const SentimentValue = styled.div<{ color: string }>`
  font-size: ${theme.fontSizes["3xl"]};
  font-weight: ${theme.fontWeights.bold};
  color: ${(props) => props.color || theme.colors.text.primary};
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
`;

export const SentimentLabel = styled.div<{ color: string }>`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) => props.color || theme.colors.text.primary};
  margin-top: ${theme.space[2]};
`;

export const UpdateTime = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.space[3]};
`;

export const LoadingIndicator = styled.div`
  ${flexCenter}
  padding: ${theme.space[8]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;
