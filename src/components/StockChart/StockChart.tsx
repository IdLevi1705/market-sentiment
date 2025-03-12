import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { MarketData } from "@/types/news";
import { formatDate } from "@/utils/dateFormatters";
import theme from "@/styles/theme";
import {
  StockChartContainer,
  StockChartHeader,
  StockChartTitle,
  StockChartTabGroup,
  StockChartTab,
  StockChartContent,
  CustomTooltipContainer,
  TooltipDate,
  TooltipValue,
  TooltipChange,
  LoadingIndicator,
} from "./styles";
import ErrorState from "../ErrorState/ErrorState";

interface StockChartProps {
  title: string;
  data: MarketData[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

type Period = "week" | "month" | "year";

const StockChart: React.FC<StockChartProps> = ({
  title,
  data,
  loading,
  error,
  onRetry,
}) => {
  const [period, setPeriod] = useState<Period>("month");

  // Filter data based on selected period
  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const now = new Date();
    const cutoffDate = new Date();

    if (period === "week") {
      cutoffDate.setDate(now.getDate() - 7);
    } else if (period === "month") {
      cutoffDate.setMonth(now.getMonth() - 1);
    } else if (period === "year") {
      cutoffDate.setFullYear(now.getFullYear() - 1);
    }

    return data.filter((item) => new Date(item.date) >= cutoffDate);
  }, [data, period]);

  // Calculate min and max values for Y axis with some padding
  const minValue = React.useMemo(() => {
    if (!filteredData.length) return 0;
    const min = Math.min(...filteredData.map((item) => item.value));
    return min * 0.995; // Add 0.5% padding
  }, [filteredData]);

  const maxValue = React.useMemo(() => {
    if (!filteredData.length) return 100;
    const max = Math.max(...filteredData.map((item) => item.value));
    return max * 1.005; // Add 0.5% padding
  }, [filteredData]);

  // Calculate percentage change for the period
  const percentChange = React.useMemo(() => {
    if (!filteredData.length) return 0;
    const firstValue = filteredData[0].value;
    const lastValue = filteredData[filteredData.length - 1].value;
    return ((lastValue - firstValue) / firstValue) * 100;
  }, [filteredData]);

  // Determine chart color based on percentage change
  const chartColor =
    percentChange >= 0 ? theme.colors.success : theme.colors.danger;

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <CustomTooltipContainer>
          <TooltipDate>{formatDate(data.date)}</TooltipDate>
          <TooltipValue>{data.value.toFixed(2)}</TooltipValue>
          {data.change && data.changePercent && (
            <TooltipChange positive={data.change > 0}>
              {data.change > 0 ? "+" : ""}
              {data.change.toFixed(2)} ({data.changePercent > 0 ? "+" : ""}
              {data.changePercent.toFixed(2)}%)
            </TooltipChange>
          )}
        </CustomTooltipContainer>
      );
    }
    return null;
  };

  return (
    <StockChartContainer>
      <StockChartHeader>
        <StockChartTitle>
          {title}{" "}
          {!loading && !error && filteredData.length > 0 && (
            <span style={{ color: chartColor }}>
              {percentChange >= 0 ? "+" : ""}
              {percentChange.toFixed(2)}%
            </span>
          )}
        </StockChartTitle>

        <StockChartTabGroup>
          <StockChartTab
            active={period === "week"}
            onClick={() => setPeriod("week")}
          >
            1W
          </StockChartTab>
          <StockChartTab
            active={period === "month"}
            onClick={() => setPeriod("month")}
          >
            1M
          </StockChartTab>
          <StockChartTab
            active={period === "year"}
            onClick={() => setPeriod("year")}
          >
            1Y
          </StockChartTab>
        </StockChartTabGroup>
      </StockChartHeader>

      {loading ? (
        <LoadingIndicator>Loading chart data...</LoadingIndicator>
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : filteredData.length === 0 ? (
        <ErrorState message="No data available for the selected period" />
      ) : (
        <StockChartContent>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme.colors.border}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  const d = new Date(date);
                  if (period === "week") {
                    return d.toLocaleDateString(undefined, {
                      weekday: "short",
                    });
                  } else if (period === "month") {
                    return d.toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                    });
                  } else {
                    return d.toLocaleDateString(undefined, { month: "short" });
                  }
                }}
                minTickGap={20}
                tick={{ fill: theme.colors.text.secondary }}
                axisLine={{ stroke: theme.colors.border }}
              />
              <YAxis
                domain={[minValue, maxValue]}
                tickFormatter={(value) => value.toFixed(0)}
                width={60}
                tick={{ fill: theme.colors.text.secondary }}
                axisLine={{ stroke: theme.colors.border }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={filteredData[0]?.value}
                stroke={theme.colors.text.light}
                strokeDasharray="3 3"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                dot={false}
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  fill: chartColor,
                  stroke: theme.colors.cardBackground,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </StockChartContent>
      )}
    </StockChartContainer>
  );
};

export default StockChart;
