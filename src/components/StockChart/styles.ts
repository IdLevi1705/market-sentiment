import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexCenter, flexBetween } from "@/styles/mixins";

export const StockChartContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StockChartHeader = styled.div`
  ${flexBetween}
  margin-bottom: ${theme.space[4]};
`;

export const StockChartTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

export const StockChartTabGroup = styled.div`
  display: flex;
  gap: ${theme.space[1]};
`;

interface StockChartTabProps {
  active: boolean;
}

export const StockChartTab = styled.button<StockChartTabProps>`
  background-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.dark};
  color: ${(props) =>
    props.active ? theme.colors.white : theme.colors.text.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.space[1]} ${theme.space[3]};
  border-radius: ${theme.radii.md};
  border: 1px solid
    ${(props) => (props.active ? theme.colors.primary : theme.colors.border)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.active ? theme.colors.primary : theme.colors.border};
  }
`;

export const StockChartContent = styled.div`
  flex: 1;
  height: 300px;

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: ${theme.colors.border};
  }

  .recharts-cartesian-axis-line {
    stroke: ${theme.colors.border};
  }

  .recharts-text {
    fill: ${theme.colors.text.secondary};
  }

  .recharts-tooltip-cursor {
    stroke: ${theme.colors.primary};
  }
`;

export const CustomTooltipContainer = styled.div`
  background-color: ${theme.colors.dark};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.md};
  padding: ${theme.space[3]};
  box-shadow: ${theme.shadows.md};
`;

export const TooltipDate = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.space[1]};
`;

export const TooltipValue = styled.div`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[1]};
`;

interface TooltipChangeProps {
  positive: boolean;
}

export const TooltipChange = styled.div<TooltipChangeProps>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) =>
    props.positive ? theme.colors.success : theme.colors.danger};
`;

export const LoadingIndicator = styled.div`
  ${flexCenter}
  flex: 1;
  height: 300px;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;
