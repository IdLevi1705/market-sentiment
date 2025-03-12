import React from "react";
import { StockMover } from "@/types/stock";
import {
  StockMoversContainer,
  StockMoversTitle,
  StockMoversTable,
  StockMoversTableHeader,
  StockMoversTableHeaderCell,
  StockMoversTableBody,
  StockMoversTableRow,
  StockMoversTableCell,
  StockSymbol,
  StockName,
  StockChange,
  LoadingIndicator,
  EmptyState,
} from "./styles";

interface StockMoversProps {
  title: string;
  stocks: StockMover[];
  loading: boolean;
}

const StockMovers: React.FC<StockMoversProps> = ({
  title,
  stocks,
  loading,
}) => {
  return (
    <StockMoversContainer>
      <StockMoversTitle>{title}</StockMoversTitle>

      {loading ? (
        <LoadingIndicator>Loading stock data...</LoadingIndicator>
      ) : stocks.length === 0 ? (
        <EmptyState>No stock data available</EmptyState>
      ) : (
        <StockMoversTable>
          <StockMoversTableHeader>
            <tr>
              <StockMoversTableHeaderCell>Symbol</StockMoversTableHeaderCell>
              <StockMoversTableHeaderCell>Price</StockMoversTableHeaderCell>
              <StockMoversTableHeaderCell>Change</StockMoversTableHeaderCell>
            </tr>
          </StockMoversTableHeader>

          <StockMoversTableBody>
            {stocks.map((stock) => (
              <StockMoversTableRow key={stock.symbol}>
                <StockMoversTableCell>
                  <StockSymbol>{stock.symbol}</StockSymbol>
                  <StockName>{stock.name}</StockName>
                </StockMoversTableCell>
                <StockMoversTableCell align="right">
                  ${stock.price.toFixed(2)}
                </StockMoversTableCell>
                <StockMoversTableCell align="right">
                  <StockChange positive={stock.changePercent > 0}>
                    {stock.changePercent > 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </StockChange>
                </StockMoversTableCell>
              </StockMoversTableRow>
            ))}
          </StockMoversTableBody>
        </StockMoversTable>
      )}
    </StockMoversContainer>
  );
};

export default StockMovers;
