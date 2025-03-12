import styled from "styled-components";
import theme from "@/styles/theme";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.space[8]};
`;

export const DashboardHeader = styled.div`
  margin-bottom: ${theme.space[6]};
`;

export const DashboardTitle = styled.h1`
  font-size: ${theme.fontSizes["3xl"]};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.space[2]};
`;

export const DashboardSubtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

export const DashboardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[6]};
`;

export const DashboardRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

export const DashboardColumn = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.space[4]};
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}) {
    width: ${(props) => props.$width || "100%"};
  }
`;
