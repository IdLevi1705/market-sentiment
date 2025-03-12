import React from "react";
import styled from "styled-components";
import { card, flexCenter } from "@/styles/mixins";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorContainer = styled.div`
  ${card}
  ${flexCenter}
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[6]};
  text-align: center;
  height: 100%;
  min-height: 200px;
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes["4xl"]};
  margin-bottom: ${({ theme }) => theme.space[2]};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space[4]};
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorMessage>{message}</ErrorMessage>
      {onRetry && <RetryButton onClick={onRetry}>Retry</RetryButton>}
    </ErrorContainer>
  );
};

export default ErrorState;
