import styled from "styled-components";
import theme from "@/styles/theme";
import { card, flexBetween } from "@/styles/mixins";

export const NewsCardContainer = styled.div`
  ${card}
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const NewsCardTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[4]};
`;

export const NewsCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
  flex: 1;
`;

export const NewsItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[2]};
  padding: ${theme.space[3]};
  border-radius: ${theme.radii.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.dark};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
    transform: translateY(-2px);
  }
`;

export const NewsItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.space[2]};
`;

export const NewsItemTitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin: 0;
  flex: 1;
`;

export const NewsItemSentiment = styled.span<{ $sentiment: number }>`
  color: ${(props) => {
    if (props.$sentiment > 0.2) return theme.colors.success;
    if (props.$sentiment < -0.2) return theme.colors.danger;
    return theme.colors.text.secondary;
  }};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.space[1]} ${theme.space[2]};
  border-radius: ${theme.radii.full};
  font-size: ${theme.fontSizes.xs};
  white-space: nowrap;
  background-color: ${(props) => {
    if (props.$sentiment > 0.2) return "rgba(16, 185, 129, 0.2)";
    if (props.$sentiment < -0.2) return "rgba(239, 68, 68, 0.2)";
    return "rgba(107, 114, 128, 0.2)";
  }};
`;

export const NewsItemDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const NewsItemMeta = styled.div`
  ${flexBetween}
  font-size: ${theme.fontSizes.xs};
  margin-top: ${theme.space[2]};
`;

export const NewsItemSource = styled.span`
  color: ${theme.colors.text.secondary};
`;

export const NewsItemTime = styled.span`
  color: ${theme.colors.text.light};
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
