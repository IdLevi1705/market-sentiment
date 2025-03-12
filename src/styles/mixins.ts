import { css } from "styled-components";
import theme from "@/styles/theme";

export const card = css`
  background-color: ${theme.colors.cardBackground};
  border-radius: ${theme.radii.lg};
  box-shadow: ${theme.shadows.md};
  padding: ${theme.space[6]};
  border: 1px solid ${theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${theme.shadows.lg};
  }
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const gridLayout = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.space[4]};
`;

export const textEllipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
