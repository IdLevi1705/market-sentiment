// src/components/NewsSentimentGraph/styles.ts
import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexCenter } from "@/styles/mixins";

export const SentimentGraphContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-bottom: ${theme.space[6]};
`;

export const SentimentGraphHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.space[4]};
  flex-wrap: wrap;
  gap: ${theme.space[4]};
`;

export const SentimentGraphTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const GraphsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[6]};

  @media (min-width: ${theme.breakpoints.lg}) {
    flex-direction: row;
  }
`;

export const GraphColumn = styled.div`
  flex: 1;
  min-width: 0; // Necessary for Flexbox to respect child's width constraints

  @media (min-width: ${theme.breakpoints.lg}) {
    max-width: 50%;
  }
`;

export const GraphTitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space[2]};
  text-align: center;
`;

export const SentimentGraphContent = styled.div`
  height: 350px;
  width: 100%;
`;

interface TimeRangeButtonProps {
  active: boolean;
}

export const TimeRangeSelector = styled.div`
  display: flex;
  gap: ${theme.space[1]};
`;

export const TimeRangeButton = styled.button<TimeRangeButtonProps>`
  padding: ${theme.space[1]} ${theme.space[3]};
  background-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.dark};
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.text.secondary};
  border: none;
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.colors.primary : theme.colors.border};
  }
`;

export const CategorySelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.space[2]};
  margin-bottom: ${theme.space[4]};
`;

interface CategoryOptionProps {
  active: boolean;
  color: string;
}

export const CategoryOption = styled.button<CategoryOptionProps>`
  padding: ${theme.space[1]} ${theme.space[3]};
  background-color: ${(props) =>
    props.active ? props.color : theme.colors.dark};
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.text.secondary};
  border: 1px solid ${(props) => props.color};
  border-radius: ${theme.radii.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? props.color : "rgba(255, 255, 255, 0.1)"};
    color: ${(props) => (props.active ? theme.colors.white : props.color)};
  }
`;

interface TooltipValueProps {
  sentiment: number;
  color?: string;
}

export const CustomTooltipContainer = styled.div`
  background-color: ${theme.colors.dark};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  padding: ${theme.space[3]};
  box-shadow: ${theme.shadows.md};
  min-width: 150px;
`;

export const TooltipTime = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space[2]};
  border-bottom: 1px solid ${theme.colors.border};
  padding-bottom: ${theme.space[1]};
`;

export const TooltipValue = styled.div<TooltipValueProps>`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) => {
    if (props.color) return props.color;
    if (props.sentiment > 0.2) return theme.colors.success;
    if (props.sentiment < -0.2) return theme.colors.danger;
    return theme.colors.text.primary;
  }};
  margin-bottom: ${theme.space[1]};
`;

export const TooltipCount = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.space[2]};
  border-top: 1px solid ${theme.colors.border};
  padding-top: ${theme.space[1]};
`;

export const LoadingIndicator = styled.div`
  ${flexCenter}
  flex: 1;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
  min-height: 350px;
`;

export const EmptyState = styled.div`
  ${flexCenter}
  flex: 1;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
  min-height: 350px;
`;
