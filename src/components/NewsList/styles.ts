import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexBetween } from "@/styles/mixins";

export const NewsListContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const NewsListTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[4]};
`;

export const NewsListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[3]};
  flex: 1;
`;

export const NewsItemWrapper = styled.a`
  padding: ${theme.space[3]};
  border-radius: ${theme.radii.md};
  text-decoration: none;
  transition: background-color 0.2s;
  border: 1px solid transparent;

  &:hover {
    background-color: ${theme.colors.dark};
    border-color: ${theme.colors.border};
  }
`;

export const NewsItemTitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[2]};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const NewsItemMeta = styled.div`
  ${flexBetween}
  font-size: ${theme.fontSizes.sm};
`;

export const NewsItemSource = styled.span`
  color: ${theme.colors.text.secondary};
  flex-shrink: 0;
`;

export const NewsItemTime = styled.span`
  color: ${theme.colors.text.light};
  margin-left: ${theme.space[2]};
`;

export const NewsItemSentiment = styled.span<{ $sentiment: number }>`
  color: ${(props) => {
    if (props.$sentiment > 0.2) return theme.colors.success;
    if (props.$sentiment < -0.2) return theme.colors.danger;
    return theme.colors.text.secondary;
  }};
  font-weight: ${theme.fontWeights.medium};
  margin-left: auto;
  padding: ${theme.space[1]} ${theme.space[2]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.fontSizes.xs};
  background-color: ${(props) => {
    if (props.$sentiment > 0.2) return "rgba(16, 185, 129, 0.2)";
    if (props.$sentiment < -0.2) return "rgba(239, 68, 68, 0.2)";
    return "rgba(107, 114, 128, 0.2)";
  }};
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.space[8]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.space[8]};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.md};
`;
