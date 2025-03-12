import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexCenter } from "@/styles/mixins";

export const StockMoversContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StockMoversTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[4]};
`;

export const StockMoversTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StockMoversTableHeader = styled.thead`
  border-bottom: 1px solid ${theme.colors.border};
`;

export const StockMoversTableHeaderCell = styled.th`
  text-align: left;
  padding: ${theme.space[2]} ${theme.space[2]};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};

  &:last-child {
    text-align: right;
  }
`;

export const StockMoversTableBody = styled.tbody``;

export const StockMoversTableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.border};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.light};
  }

  &:last-child {
    border-bottom: none;
  }
`;

interface StockMoversTableCellProps {
  align?: "left" | "right" | "center";
}

export const StockMoversTableCell = styled.td<StockMoversTableCellProps>`
  padding: ${theme.space[3]} ${theme.space[2]};
  text-align: ${(props) => props.align || "left"};
  vertical-align: middle;
`;

export const StockSymbol = styled.div`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
`;

export const StockName = styled.div`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

interface StockChangeProps {
  positive: boolean;
}

export const StockChange = styled.div<StockChangeProps>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${(props) =>
    props.positive ? theme.colors.success : theme.colors.danger};
`;

export const LoadingIndicator = styled.div`
  ${flexCenter}
  flex: 1;
  padding: ${theme.space[8]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;

export const EmptyState = styled.div`
  ${flexCenter}
  flex: 1;
  padding: ${theme.space[8]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;
